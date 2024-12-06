import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import InstagramIcon from "@mui/icons-material/Instagram";
import GitHubIcon from "@mui/icons-material/GitHub";
export default function Home() {
  const [value, setValue] = useState(0);
  return (
    <main className="flex gap-10  p-5 h-screen my-24">
      <div className="flex flex-col justify-center ">
        <Box>
          <BottomNavigation
            showLabels
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
            className="flex-col h-full gap-10 rounded-xl py-10 bg-transparent border-2 border-slate-300"
          >
            <BottomNavigationAction sx={{ color: "white" }} label="IG" icon={<InstagramIcon />} />
            <BottomNavigationAction sx={{ color: "white" }} label="Likes" icon={<FavoriteIcon />} />
            <BottomNavigationAction sx={{ color: "white" }} label="Github" icon={<GitHubIcon />} />
            <BottomNavigationAction sx={{ color: "white" }} label="Nearby" icon={<LocationOnIcon />} />
            <BottomNavigationAction sx={{ color: "white" }} label="Nearby" icon={<LocationOnIcon />} />
          </BottomNavigation>
        </Box>
      </div>
      <div>
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Typography gutterBottom sx={{ color: "text.secondary", fontSize: 14 }}>
              Word of the Day
            </Typography>
            <Typography variant="h5" component="div">
              benevolent
            </Typography>
            <Typography sx={{ color: "text.secondary", mb: 1.5 }}>adjective</Typography>
            <Typography variant="body2">
              well meaning and kindly.
              <br />
              {'"a benevolent smile"'}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Learn More</Button>
          </CardActions>
        </Card>
      </div>
    </main>
  );
}
