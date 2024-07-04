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
import { useState, useRef, useEffect } from "react";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

var requestOptions = {
  method: "GET",
  redirect: "follow",
};

let prevNum;
const stats = [
  "Points",
  "Rebounds",
  "Assists",
  "Steals",
  "Blocks",
  "Turnovers",
];
const statsMap = {
  Points: "Points",
  Rebounds: "Rebounds",
  Assists: "Assists",
  Steals: "Steals",
  Blocks: "BlockedShots",
  Turnovers: "Turnovers",
};

function App() {
  // use state variables
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");
  const [choice, setChoice] = useState(0);
  const [chosenStat, setChosenStat] = useState("");
  const [userName, setUserName] = useState("User");
  const [userPoints, setUserPoints] = useState(0);
  const [player1ID, setPlayer1ID] = useState(0);
  const [player2ID, setPlayer2ID] = useState(0);
  const [player1Stat, setPlayer1Stat] = useState(0);
  const [player2Stat, setPlayer2Stat] = useState(0);
  const [timer, setTimer] = useState("00:00:00");
  // regular variables
  let p1;
  let p2;
  let id1;
  let id2;
  let pStat;
  const Ref = useRef(null);
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
  const submitChoice = () => {
    if (player1Stat > player2Stat) {
      if (choice == 1) {
        updateScore(10);
      } else if (choice == 2) {
        // alert("Incorrect");
        if(userPoints > 0){updateScore(-10);}
      } else if (choice == 0) {
        // alert("Incorrect");
        if(userPoints > 0){updateScore(-10);}
      }
    } else if (player1Stat < player2Stat) {
      if (choice == 1) {
        // alert("Incorrect");
        if(userPoints > 0){updateScore(-10);}
      } else if (choice == 2) {
        updateScore(10);
      } else if (choice == 0) {
        // alert("Incorrect");
        if(userPoints > 0){updateScore(-10);}
      }
    } else if (player1Stat == player2Stat) {
      if (choice == 1) {
        // alert("Incorrect");
        if(userPoints > 0){updateScore(-10);}
      } else if (choice == 2) {
        // alert("Incorrect");
        if(userPoints > 0){updateScore(-10);}
      } else if (choice == 0) {
        updateScore(10);
      }
    }
  };
  // functions
  // Switches players and grabs and sets their player ID
  function switchPlayer(callback) {
    let randomPlayer1 = randomNum(0, 465);
    let randomPlayer2 = randomNum(0, 465);
    fetch(
      "https://api.sportsdata.io/v3/nba/scores/json/PlayersActiveBasic?key=1eccc8cbb6d44ff0a7a7eb852df96606",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        p1 = result[randomPlayer1];
        p2 = result[randomPlayer2];
        id1 = p1.PlayerID;
        id2 = p2.PlayerID;
        setPlayer1(p1);
        setPlayer2(p2);
        setPlayer1ID(id1);
        // console.log(id1)
        setPlayer2ID(id2);
        let currentStat = randomNum(0, 5);
        setChosenStat(stats[currentStat]);
        switchPlayer1Stat(id1, stats[currentStat]);
        switchPlayer2Stat(id2, stats[currentStat]);
        if (callback) callback();
      })
      .catch((error) => console.error(error));
  }
  // Changes player stats
  function switchPlayer1Stat(playerID, stat) {
    fetch(
      `https://api.sportsdata.io/v3/nba/stats/json/PlayerSeasonStatsByPlayer/2024/${playerID}?key=1eccc8cbb6d44ff0a7a7eb852df96606`,
      requestOptions
    )
      .then((response) => response.json())
      .then(
        (result) => ((pStat = result[statsMap[stat]]), setPlayer1Stat(pStat))
      )
      .catch((error) => console.error(error));
  }
  function switchPlayer2Stat(playerID, stat) {
    fetch(
      `https://api.sportsdata.io/v3/nba/stats/json/PlayerSeasonStatsByPlayer/2024/${playerID}?key=1eccc8cbb6d44ff0a7a7eb852df96606`,
      requestOptions
    )
      .then((response) => response.json())
      .then(
        (result) => ((pStat = result[statsMap[stat]]), setPlayer2Stat(pStat))
      )
      .catch((error) => console.error(error));
  }
  function updateScore(n) {
 setUserPoints(userPoints + n)
  }
  // timer related functions
  const getTimeRemaining = (e) => {
    const total = Date.parse(e) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / 1000 / 60 / 60) % 24);
    return {
      total,
      hours,
      minutes,
      seconds,
    };
  };
  const startTimer = (e) => {
    let { total, hours, minutes, seconds } = getTimeRemaining(e);
    if (total >= 0) {
      // update the timer
      // check if less than 10 then we need to
      // add '0' at the beginning of the variable
      setTimer(
        (hours > 9 ? hours : "0" + hours) +
          ":" +
          (minutes > 9 ? minutes : "0" + minutes) +
          ":" +
          (seconds > 9 ? seconds : "0" + seconds)
      );
    }
  };
  const clearTimer = (e) => {
    // If you adjust it you should also need to
    // adjust the Endtime formula we are about
    // to code next
    setTimer("00:01:00");

    // If you try to remove this line the
    // updating of timer Variable will be
    // after 1000ms or 1sec
    if (Ref.current) clearInterval(Ref.current);
    const id = setInterval(() => {
      startTimer(e);
    }, 1000);
    Ref.current = id;
  };
  const getDeadTime = () => {
    let deadline = new Date();

    // This is where you need to adjust if
    // you entend to add more time
    deadline.setSeconds(deadline.getSeconds() + 60);
    return deadline;
  };
  const onClickReset = () => {
    if (timer == "00:00:00") clearTimer(getDeadTime());
  };
  useEffect(() => {
    switchPlayer();
  }, []);

  if (timer === "00:00:01") {
    window.confirm(`Your final score was ${userPoints}.`);
    window.location.reload();
  }

  // main react app return
  return (
    <div className="App" style={{ backgroundColor: "mediumpurple" }}>
      <CssBaseline />
      <Toolbar>
        {/* Name text field */}
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="outlined-basic"
            label="Enter Your Name Here"
            value={userName}
            variant="outlined"
            onChange={(event) => {
              setUserName(event.target.value);
            }}
          />
        </Box>
        <Container>
          <Typography
            variant="h4"
            align="center"
            color="text.primary"
            sx={{ py: 2, color: "purple" }}
          >
            {timer}
          </Typography>
          <Button
            href="#"
            variant="outlined"
            sx={{
              my: 5,
              mx: 5,
              marginBottom: 5,
              color: "gold",
              background: "purple",
              fontWeight: "bold",
              fontSize: 15,
            }}
            // Switches player, switches the comparitive stat, switches the players stats to compare, sumbits choice
            onClick={() => {
              onClickReset();
            }}
          >
            Start
          </Button>
        </Container>
      </Toolbar>
      <Container maxWidth="md" sx={{ my: 4 }}>
        {/* Title */}
        <Typography
          variant="h2"
          align="center"
          color="text.primary"
          sx={{ py: 2, color: "purple" }}
        >
          NBA Matchups
        </Typography>
        {/* Stat for current matchup */}
        <Typography
          variant="h5"
          align="center"
          color="text.secondary"
          sx={{ mx: 10, color: "purple" }}
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
            <FormControl>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="Same"
                name="radio-buttons-group"
                onChange={handleChange}
              >
                <FormControlLabel
                  value={1}
                  control={<Radio />}
                  label={player1.FirstName + " " + player1.LastName}
                />
                <FormControlLabel
                  value={2}
                  control={<Radio />}
                  label={player2.FirstName + " " + player2.LastName}
                />
                <FormControlLabel
                  value={0}
                  control={<Radio />}
                  label="Same"
                />
              </RadioGroup>
            </FormControl>
            <Button
              href="#"
              variant="outlined"
              sx={{
                my: 5,
                mx: 5,
                marginBottom: 5,
                color: "gold",
                background: "purple",
                fontWeight: "bold",
                fontSize: 15,
              }}
              // Switches player, switches the comparitive stat, switches the players stats to compare, sumbits choice
              onClick={() => {
                if (timer > "00:00:00") {
                  switchPlayer(submitChoice);
                }
              }}
            >
              Submit
            </Button>
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
            marginBottom: 10,
            color: "gold",
            background: "purple",
            fontWeight: "bold",
            fontSize: 15,
          }}
          // Switches player, switches the comparitive stat, switches the players stats to compare
          onClick={() => {
            if (timer > "00:00:00") {
              switchPlayer();
            }
          }}
        >
          Next
        </Button>
        <Typography
          variant="h5"
          align="center"
          color="text.secondary"
          sx={{ mx: 10, color: "purple" }}
          id="userpoints"
        >
          {userName}'s Score: {userPoints}
        </Typography>
      </Grid>
    </div>
  );
}

export default App;
