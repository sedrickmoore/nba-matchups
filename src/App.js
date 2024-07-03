import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import PlayerCard from "./PlayerCard";
import { useState } from "react";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import { blue } from "@mui/material/colors";

var requestOptions = {
  method: "GET",
  redirect: "follow",
};

let prevNum;

let stats = ["Points", "Rebounds", "Assists", "Steals", "Blocks"];

function App() {
  // use state variables
  const [player1, setPlayer1] = useState({
    FirstName: "Player",
    LastName: "1",
    Team: "",
    Position: "",
    Height: "",
    Weight: "",
    BirthDate: "",
  });
  const [player2, setPlayer2] = useState({
    FirstName: "Player",
    LastName: "2",
    Team: "",
    Position: "",
    Height: "",
    Weight: "",
    BirthDate: "",
  });
  const [choice, setChoice] = useState("");
  const [chosenStat, setChosenStat] = useState("Press 'Next' to Play!");
  // functions set in variables
  const randomNum = (min, max) => {
    let newNum = Math.floor(Math.random() * (max - min + 1)) + min;
    if (prevNum && newNum === prevNum) {
      while (newNum === prevNum) {
        newNum = Math.floor(Math.random() * (max - min + 1)) + min;
      }
    }
    prevNum = newNum;
    return newNum;
  };
  const handleChange = (event) => {
    setChoice(event.target.value);
  };
  // functions
  function switchPlayer() {
    let randomPlayer1 = randomNum(0, 465);
    let randomPlayer2 = randomNum(0, 465);
    fetch(
      "https://api.sportsdata.io/v3/nba/scores/json/PlayersActiveBasic?key=e57eb6a0c3f147a4b718b06925030d3d",
      requestOptions
    )
      .then((response) => response.json())
      .then(
        (result) => (
          setPlayer1(result[randomPlayer1]), setPlayer2(result[randomPlayer2])
        )
      )
      .catch((error) => console.error(error));
  }
  function switchStat() {
    let currentStat = randomNum(0, 4);
    setChosenStat(stats[currentStat]);
  }
  // main react app return
  return (
    <div className="App" style={{ backgroundColor: "mediumpurple" }}>
      <CssBaseline />
      <Toolbar></Toolbar>
      <Container maxWidth="md" sx={{ my: 4 }}>
        {/* Title */}
        <Typography
          variant="h2"
          align="center"
          color="text.primary"
          sx={{ py: 2, color: "purple" }}
        >NBA Matchups</Typography>
        {/* Stat for current matchup */}
        <Typography
          variant="h5"
          align="center"
          color="text.secondary"
          sx={{ mx: 10, color:"purple" }}
          id="subtitle"
        >
          {chosenStat}
        </Typography>
      </Container>
      {
        <Container maxWidth="lg">
          {/* Main content */}
          <Grid
            container
            spacing={5}
            justifyContent="center"
            alignItems="flex-start"
          >
            {/* Left NBA player */}
            {PlayerCard(player1)}
            {/* Select for player to make choice */}
            <Select
              sx={{
                my: 15,
                mx: 15
              }}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={choice}
              label="Choice"
              onChange={handleChange}
            >
              <MenuItem value={1}>{">"}</MenuItem>
              <MenuItem value={0}>{"="}</MenuItem>
              <MenuItem value={2}>{"<"}</MenuItem>
            </Select>
            {/* Right NBA player */}
            {PlayerCard(player2)}
          </Grid>
        </Container>
      }

      <Grid item xs={12} md={4}>
        {/* Next button */}
        <Button
          href="#"
          variant="outlined"
          sx={{
            my: 10,
            mx: 90,
            marginBottom: 100,
            color: "gold",
            background: "purple",
            fontWeight: "bold",
            fontSize: 15,
          }}
          onClick={() => {
            switchPlayer();
            switchStat();
          }}
        >
          Next
        </Button>
        
      </Grid>
    </div>
  );
}

export default App;
