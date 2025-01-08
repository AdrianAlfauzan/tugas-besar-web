import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Skeleton from "@/utils/skeleton";
import Alert from "@mui/material/Alert";
import { motion } from "framer-motion";
import { pilihDosen } from "@/lib/firebase/service"; // Assuming the service file is at /services/pilihDosen.ts

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const PilihDosenPembimbing = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedDosen, setSelectedDosen] = useState<any | null>(null);
  const [position, setPosition] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [dosenData, setDosenData] = useState<any[]>([]); // State untuk menyimpan data dosen dari API
  const itemsPerPage = 5;

  const handleClickOpenDialog = (dosen: any) => {
    setSelectedDosen(dosen);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedDosen(null);
  };

  const handleChange = (event: SelectChangeEvent) => {
    setPosition(event.target.value as string);
  };

  useEffect(() => {
    // Ambil data dosen yang dipilih dari sessionStorage
    const storedDosen = sessionStorage.getItem("selectedDosen");
    if (storedDosen) {
      setSelectedDosen(JSON.parse(storedDosen));
    }

    // Ambil data dosen dari API
    const fetchData = async () => {
      try {
        const response = await fetch("/api/ApiGetDosen");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        console.log("Fetched data:", data); // Debugging untuk cek struktur data
        setDosenData(data.dataGetDosen || []); // Pastikan hanya menyimpan array dataGetDosen
      } catch (error) {
        console.error("Error fetching data:", error);
        setDosenData([]); // Set ke array kosong jika terjadi error
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentDosenData = Array.isArray(dosenData) ? dosenData.slice(indexOfFirstItem, indexOfLastItem) : [];

  const totalPages = Math.ceil(dosenData.length / itemsPerPage);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleSubmitDosen = async () => {
    if (selectedDosen) {
      try {
        const nidnDosen = selectedDosen.nidn;

        if (!nidnDosen) {
          alert("NIDN Dosen tidak ditemukan.");
          return;
        }

        // Simpan data dosen yang dipilih ke sessionStorage
        sessionStorage.setItem("selectedDosen", JSON.stringify(selectedDosen));

        // Call the service function with the callback
        await pilihDosen(nidnDosen, (response) => {
          if (response?.status) {
            setOpenDialog(false);
            alert(`Dosen Pembimbing ${selectedDosen.fullname} telah dipilih!`);
          } else {
            alert(`Gagal memilih dosen: ${response?.message}`);
          }
        });
      } catch (error) {
        console.error("Error submitting dosen:", error);
      }
    }
  };

  return (
    <motion.main className="flex gap-10 my-24 p-5" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
      {isLoading ? (
        <Skeleton />
      ) : (
        <motion.div className="p-4 w-full bg-white rounded-lg shadow-md" initial={{ scale: 0.9 }} animate={{ scale: 1 }} transition={{ duration: 0.5 }}>
          <div className="bg-gray-100 rounded-md mb-4 w-full flex">
            <div className="w-full max-w-[33.33%] text-center flex items-center justify-center">
              <Alert variant="filled" severity="info" sx={{ width: "90%" }}>
                Pilih dosen pembimbing yang sesuai dengan mata kuliah anda!
              </Alert>
            </div>
            <div className="w-full max-w-[33.33%] flex justify-center">
              <Toolbar>
                <Search>
                  <SearchIconWrapper>
                    <SearchIcon />
                  </SearchIconWrapper>
                  <StyledInputBase placeholder="Search…" inputProps={{ "aria-label": "search" }} />
                </Search>
              </Toolbar>
            </div>
            <div className="w-full max-w-[33.33%] p-4 rounded">
              <Box sx={{ minWidth: 180 }}>
                <FormControl fullWidth size="small">
                  <InputLabel id="select-position">Dosen Pengajar</InputLabel>
                  <Select labelId="select-position" id="select-position" value={position} label="Jabatan Dosen" onChange={handleChange}>
                    <MenuItem value="AIG">AIG</MenuItem>
                    <MenuItem value="DSE">DSE</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </div>
          </div>

          {/* Menampilkan dosen yang dipilih jika ada */}
          {selectedDosen ? (
            <div className="bg-gray-50 rounded-md shadow-sm p-4 mb-4">
              <h3 className="font-medium text-gray-800 text-center">Dosen Pembimbing yang Dipilih:</h3>
              <div className="text-gray-800 text-center">
                <p>NIDN: {selectedDosen.nidn}</p>
                <p>Nama Dosen: {selectedDosen.fullname}</p>
                <p>Dosen Pengajar: {selectedDosen.dosenPengajar}</p>
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 rounded-md shadow-sm overflow-hidden">
              <div className="w-full p-2 text-center flex items-center justify-center border-b-2 border-gray-300">
                <div className="w-full max-w-[33.33%] text-center flex items-center justify-center text-gray-600 font-medium">NIDN</div>
                <div className="w-full max-w-[33.33%] text-center flex items-center justify-center text-gray-600 font-medium">Nama Dosen</div>
                <div className="w-full max-w-[33.33%] text-center flex items-center justify-center text-gray-600 font-medium">Dosen Pengajar</div>
                <div className="w-full max-w-[33.33%] text-center flex items-center justify-center text-gray-600 font-medium">Action</div>
              </div>

              {currentDosenData.length === 0 ? (
                <p className="text-gray-500 text-center">Tidak ada data dosen yang tersedia</p>
              ) : (
                currentDosenData.map((dosen) => (
                  <motion.div
                    key={dosen.id}
                    className="p-2 w-full text-center flex items-center justify-center hover:bg-gray-200 transition-all"
                    whileHover={{ scale: 1.05 }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="w-full max-w-[33.33%] text-center flex items-center justify-center text-gray-800">{dosen.nidn}</div>
                    <div className="w-full max-w-[33.33%] text-center flex items-center justify-center text-gray-800">{dosen.fullname}</div>
                    <div className="w-full max-w-[33.33%] text-center flex items-center justify-center text-gray-800">{dosen.dosenPengajar}</div>
                    <div className="w-full max-w-[33.33%] text-center flex items-center justify-center">
                      <Button className="p-1" variant="contained" color="primary" onClick={() => handleClickOpenDialog(dosen)}>
                        Memilih
                      </Button>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          )}

          {/* Pagination Controls */}
          <div className="flex justify-center mt-4">
            <Button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
              Prev
            </Button>
            <span className="mx-4">{`Page ${currentPage} of ${totalPages}`}</span>
            <Button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
              Next
            </Button>
          </div>

          <Dialog open={openDialog} keepMounted onClose={handleCloseDialog} aria-describedby="alert-dialog-slide-description">
            <DialogTitle>{"Apakah Anda sudah yakin?"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-slide-description">Data yang telah dipilih akan di proses menjadi dosen pembimbing</DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog}>Batal</Button>
              <Button onClick={handleSubmitDosen}>Lanjutkan</Button>
            </DialogActions>
          </Dialog>
        </motion.div>
      )}
    </motion.main>
  );
};

export default PilihDosenPembimbing;
