import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid2";
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
import { TransitionProps } from "@mui/material/transitions";
import Skeleton from "@/utils/skeleton";
import Alert from "@mui/material/Alert";

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

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const PilihDosenPembimbing = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedDosen, setSelectedDosen] = useState<any | null>(null);

  const handleClickOpenDialog = (dosen: any) => {
    setSelectedDosen(dosen);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedDosen(null);
  };

  const [position, setPosition] = React.useState("");
  const handleChange = (event: SelectChangeEvent) => {
    setPosition(event.target.value as string);
  };

  const dosenData = [
    { id: 1, nidn: "1234545", name: "Adrian Kurniawan", dosenPengajar: "DSE" },
    { id: 2, nidn: "097823", name: "Adrian Musa Alfauzan", dosenPengajar: "AIG" },
    { id: 3, nidn: "2250081020", name: "Adrian Alfauzan", dosenPengajar: "DSE" },
    { id: 4, nidn: "2250081020", name: "Adrian Alfauzan", dosenPengajar: "DSE" },
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

  return (
    <main className="flex gap-10 my-24 p-5">
      {isLoading ? (
        <Skeleton />
      ) : (
        <div className="p-4 w-full bg-white rounded-lg">
          <Grid container spacing={1} className="bg-slate-500 rounded-md mb-4 max-w-full">
            <Grid size={4} className="rounded  max-w-full text-center flex items-center justify-center">
              <Alert variant="outlined" severity="info" sx={{ width: "90%" }}>
                Pilih dosen pembimbing yang sesuai dengan mata kuliah anda!
              </Alert>
            </Grid>
            <Grid size={4} className="rounded flex justify-center ">
              <Toolbar>
                <Search>
                  <SearchIconWrapper>
                    <SearchIcon />
                  </SearchIconWrapper>
                  <StyledInputBase placeholder="Search…" inputProps={{ "aria-label": "search" }} />
                </Search>
              </Toolbar>
            </Grid>
            <Grid size={4} className="p-4 rounded max-w-full">
              <Box sx={{ minWidth: 180 }}>
                <FormControl size="small" fullWidth>
                  <InputLabel id="select-position">Dosen Pengajar</InputLabel>
                  <Select labelId="select-position" id="select-position" value={position} label="Jabatan Dosen" onChange={handleChange}>
                    <MenuItem value="AIG">AIG</MenuItem>
                    <MenuItem value="DSE">DSE</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Grid>
          </Grid>
          <Grid container spacing={1} className="bg-slate-500 rounded-md">
            <Grid size={12} className="p-2 max-w-full text-center flex items-center justify-center border-b-2 border-white">
              <Grid size={4} className="rounded max-w-full text-center flex items-center justify-center">
                NIDN
              </Grid>
              <Grid size={4} className="border-l-2 border-white max-w-full text-center flex items-center justify-center">
                Nama Dosen
              </Grid>
              <Grid size={4} className="border-l-2 border-white max-w-full text-center flex items-center justify-center">
                Dosen Pengajar
              </Grid>
              <Grid size={4} className="border-l-2 border-white max-w-full text-center flex items-center justify-center">
                Action
              </Grid>
            </Grid>
            {dosenData.map((dosen) => (
              <Grid key={dosen.id} size={12} className="p-2 max-w-full text-center flex items-center justify-center">
                <Grid size={4} className="max-w-full text-center flex items-center justify-center">
                  {dosen.nidn}
                </Grid>
                <Grid size={4} className="border-l-2 border-white max-w-full text-center flex items-center justify-center">
                  {dosen.name}
                </Grid>
                <Grid size={4} className="border-l-2 border-white max-w-full text-center flex items-center justify-center">
                  {dosen.dosenPengajar}
                </Grid>
                <Grid size={4} className="border-l-2 border-white max-w-full text-center flex items-center justify-center">
                  <Button className="p-1 " size="small" variant="contained" color="success" onClick={() => handleClickOpenDialog(dosen)}>
                    Memilih
                  </Button>
                </Grid>
              </Grid>
            ))}
          </Grid>

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
        </div>
      )}
    </main>
  );
};

export default PilihDosenPembimbing;
