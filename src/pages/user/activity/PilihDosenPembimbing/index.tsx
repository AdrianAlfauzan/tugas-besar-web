import React, { useEffect, useState, forwardRef } from "react";
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
import Slide from "@mui/material/Slide";
import Skeleton from "@/utils/skeleton";
import Alert from "@mui/material/Alert";
import { motion } from "framer-motion";

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

const Transition = forwardRef(function Transition(props: React.ComponentProps<typeof Slide>, ref) {
  const { children, ...rest } = props;
  return (
    <Slide direction="up" ref={ref} {...rest}>
      {children}
    </Slide>
  );
});

const PilihDosenPembimbing = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedDosen, setSelectedDosen] = useState<any | null>(null);
  const [position, setPosition] = React.useState("");
  const [currentPage, setCurrentPage] = useState(1);
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

  const dosenData = [
    { id: 1, nidn: "1234545", name: "Adrian Kurniawan", dosenPengajar: "DSE" },
    { id: 2, nidn: "097823", name: "Adrian Musa Alfauzan", dosenPengajar: "AIG" },
    { id: 3, nidn: "2250081020", name: "Adrian Alfauzan", dosenPengajar: "DSE" },
    { id: 4, nidn: "2250081021", name: "Sarah Rahmawati", dosenPengajar: "AIG" },
    { id: 5, nidn: "2250081022", name: "Ahmad Darmawan", dosenPengajar: "DSE" },
    { id: 6, nidn: "2250081023", name: "Fiona Sari", dosenPengajar: "AIG" },
    { id: 7, nidn: "2250081024", name: "Budi Santoso", dosenPengajar: "DSE" },
    { id: 8, nidn: "2250081025", name: "Lina Permatasari", dosenPengajar: "AIG" },
    { id: 9, nidn: "2250081026", name: "Dian Wijaya", dosenPengajar: "DSE" },
    { id: 10, nidn: "2250081027", name: "Rina Pratiwi", dosenPengajar: "AIG" },
    { id: 11, nidn: "2250081028", name: "Eko Yulianto", dosenPengajar: "DSE" },
    { id: 12, nidn: "2250081029", name: "Rani Anugrah", dosenPengajar: "AIG" },
    { id: 13, nidn: "2250081030", name: "Toni Hidayat", dosenPengajar: "DSE" },
    { id: 14, nidn: "2250081031", name: "Siti Nurhaliza", dosenPengajar: "AIG" },
    { id: 15, nidn: "2250081032", name: "Kurniawan Setiawan", dosenPengajar: "DSE" },
  ];

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 50);
  }, []);

  const handleDeleteDosen = () => {
    console.log("Deleting Dosen:", selectedDosen);
    setOpenDialog(false);
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentDosenData = dosenData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(dosenData.length / itemsPerPage);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
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

          <div className="bg-gray-50 rounded-md shadow-sm overflow-hidden">
            <div className="w-full p-2 text-center flex items-center justify-center border-b-2 border-gray-300">
              <div className="w-full max-w-[33.33%] text-center flex items-center justify-center text-gray-600 font-medium">NIDN</div>
              <div className="w-full max-w-[33.33%] text-center flex items-center justify-center text-gray-600 font-medium">Nama Dosen</div>
              <div className="w-full max-w-[33.33%] text-center flex items-center justify-center text-gray-600 font-medium">Dosen Pengajar</div>
              <div className="w-full max-w-[33.33%] text-center flex items-center justify-center text-gray-600 font-medium">Action</div>
            </div>

            {currentDosenData.map((dosen) => (
              <motion.div
                key={dosen.id}
                className="p-2 w-full text-center flex items-center justify-center hover:bg-gray-200 transition-all"
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-full max-w-[33.33%] text-center flex items-center justify-center text-gray-800">{dosen.nidn}</div>
                <div className="w-full max-w-[33.33%] text-center flex items-center justify-center text-gray-800">{dosen.name}</div>
                <div className="w-full max-w-[33.33%] text-center flex items-center justify-center text-gray-800">{dosen.dosenPengajar}</div>
                <div className="w-full max-w-[33.33%] text-center flex items-center justify-center">
                  <Button className="p-1" variant="contained" color="primary" onClick={() => handleClickOpenDialog(dosen)}>
                    Memilih
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>

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

          <Dialog open={openDialog} TransitionComponent={Transition} keepMounted onClose={handleCloseDialog} aria-describedby="alert-dialog-slide-description">
            <DialogTitle>{"Apakah Anda sudah yakin?"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-slide-description">Data yang telah dipilih akan di proses menjadi dosen pembimbing</DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog}>Tidak Setuju</Button>
              <Button variant="contained" onClick={handleDeleteDosen}>
                Setuju
              </Button>
            </DialogActions>
          </Dialog>
        </motion.div>
      )}
    </motion.main>
  );
};

export default PilihDosenPembimbing;
