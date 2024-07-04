import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import PlayerCard from "./PlayerCard";
import { useState, useRef, useEffect } from "react";
import Box from "@mui/material/Box";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Modal from "@mui/material/Modal";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import { styled } from '@mui/material/styles';

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
const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  '& .MuiSwitch-switchBase': {
    margin: 1,
    padding: 0,
    transform: 'translateX(6px)',
    '&.Mui-checked': {
      color: '#fff',
      transform: 'translateX(22px)',
      '& .MuiSwitch-thumb:before': {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          '#fff',
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
      },
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#001e3c',
    width: 32,
    height: 32,
    '&::before': {
      content: "''",
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        '#fff',
      )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
    },
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
    borderRadius: 20 / 2,
  },
}));
const nbaTeams = [
  "Atlanta Hawks",
  "Boston Celtics",
  "Brooklyn Nets",
  "Charlotte Hornets",
  "Chicago Bulls",
  "Cleveland Cavaliers",
  "Dallas Mavericks",
  "Denver Nuggets",
  "Detroit Pistons",
  "Golden State Warriors",
  "Houston Rockets",
  "Indiana Pacers",
  "LA Clippers",
  "Los Angeles Lakers",
  "Memphis Grizzlies",
  "Miami Heat",
  "Milwaukee Bucks",
  "Minnesota Timberwolves",
  "New Orleans Pelicans",
  "New York Knicks",
  "Oklahoma City Thunder",
  "Orlando Magic",
  "Philadelphia 76ers",
  "Phoenix Suns",
  "Portland Trail Blazers",
  "Sacramento Kings",
  "San Antonio Spurs",
  "Toronto Raptors",
  "Utah Jazz",
  "Washington Wizards"
];
const nbaHomeColors = {
  "Los Angeles Lakers": ["#FDB927", "#552583"]
}
const nbaAwayColors = {
  "Los Angeles Lakers": ["#552583", "#FDB927"]
}

function App() {
  // use state variables
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");
  const [choice, setChoice] = useState(0);
  const [chosenStat, setChosenStat] = useState("");
  const [userPoints, setUserPoints] = useState(0);
  const [player1ID, setPlayer1ID] = useState(0);
  const [player2ID, setPlayer2ID] = useState(0);
  const [player1Stat, setPlayer1Stat] = useState(0);
  const [player2Stat, setPlayer2Stat] = useState(0);
  const [timer, setTimer] = useState("00:00");
  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState(false);
  const [switchLabel, setSwitchLabel] = useState("Home")
  const [teamOpen, setTeamOpen] = useState(false);
  const [favTeam, setFavTeam] = useState("")
  const [homePrimary, setHomePrimary] = useState("gold")
  const [homeSecondary, setHomeSecondary] = useState("mediumpurple")
  const [awayPrimary, setAwayPrimary] = useState("mediumpurple")
  const [awaySecondary, setAwaySecondary] = useState("gold")

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
        if (userPoints > 0) {
          updateScore(-10);
        }
      } else if (choice == 0) {
        // alert("Incorrect");
        if (userPoints > 0) {
          updateScore(-10);
        }
      }
    } else if (player1Stat < player2Stat) {
      if (choice == 1) {
        // alert("Incorrect");
        if (userPoints > 0) {
          updateScore(-10);
        }
      } else if (choice == 2) {
        updateScore(10);
      } else if (choice == 0) {
        // alert("Incorrect");
        if (userPoints > 0) {
          updateScore(-10);
        }
      }
    } else if (player1Stat == player2Stat) {
      if (choice == 1) {
        // alert("Incorrect");
        if (userPoints > 0) {
          updateScore(-10);
        }
      } else if (choice == 2) {
        // alert("Incorrect");
        if (userPoints > 0) {
          updateScore(-10);
        }
      } else if (choice == 0) {
        updateScore(10);
      }
    }
  };
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleTeamOpen = () => setTeamOpen(true);
  const handleTeamClose = () => setTeamOpen(false);
  const switchChange = (event) => {
    setChecked(event.target.checked);
    if(checked){
      setSwitchLabel("Home")
      console.log(favTeam)
    } else {
      setSwitchLabel("Away")
      console.log(favTeam)
    }
  };
  const pickTeam = (event) => {
    setFavTeam(event.target.value)
    setTeamOpen(false)
    changeColors(event.target.value)
  }
  const theme = createTheme({
    palette: {
      background: {
        default: {homePrimary},
      },
    },
  });
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
    setUserPoints(userPoints + n);
  }
  function ListTeams(props) {
    const teams = props.teams;
  
    return (
      <div>
        {teams.map((team, index) => (
          <Button key={index} value={team} variant="contained" color="primary" style={{ margin: '5px' }} onClick={pickTeam}>
            {team}
          </Button>
        ))}
      </div>
    );
  };
  function changeColors(team){
    setHomePrimary(nbaHomeColors[team][0])
    setHomeSecondary(nbaHomeColors[team][1])
    setAwayPrimary(nbaAwayColors[team][0])
    setAwaySecondary(nbaAwayColors[team][1])
  }
  // timer related functions
  const getTimeRemaining = (e) => {
    const total = Date.parse(e) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    // const hours = Math.floor((total / 1000 / 60 / 60) % 24);
    return {
      total,
      // hours,
      minutes,
      seconds,
    };
  };
  const startTimer = (e) => {
    let { total, minutes, seconds } = getTimeRemaining(e);
    if (total >= 0) {
      // update the timer
      // check if less than 10 then we need to
      // add '0' at the beginning of the variable
      setTimer(
        // (hours > 9 ? hours : "0" + hours) +
        //   ":" +
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
    setTimer("01:00");

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
    if (timer == "00:00") {
      clearTimer(getDeadTime())
      setUserPoints(0)
    };
  };
  useEffect(() => {
    switchPlayer();
  }, []);

  useEffect(()=> {
    if (timer === "00:01") {
      setTimeout(() => {
        handleOpen();
      }, 1000); 
    }
  },[timer])
  useEffect(()=>{
    handleTeamOpen();
  },[])
  // main react app return
  return (
    <ThemeProvider theme={theme}>
    <div className="App">
      <CssBaseline />
      <FormControlLabel
        control={<MaterialUISwitch sx={{ m: 1 }} />}
        label={switchLabel}
        checked={checked}
        onChange={switchChange}
      />
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <Box>
          <Stack justifyContent={"center"}>
            <Typography
              variant="h4"
              align="center"
              color="text.primary"
              sx={{ py: 2, color: {homeSecondary} }}
            >
              {timer}
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="text.secondary"
              sx={{ mx: 10, color: {homeSecondary} }}
              id="userpoints"
            >
              Score: {userPoints}
            </Typography>
            <Button
              href="#"
              variant="outlined"
              align="center"
              sx={{
                my: 5,
                mx: 5,
                marginBottom: 5,
                color: {homePrimary},
                background: {homeSecondary},
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
          </Stack>
        </Box>
      </Toolbar>
      <Container maxWidth="md" sx={{ my: 4 }}>
        {/* Title */}
        <Typography
          variant="h2"
          align="center"
          color="text.primary"
          sx={{ py: 2, color: {homeSecondary} }}
        >
          NBA Matchups
        </Typography>
        {/* Stat for current matchup */}
        <Typography
          variant="h5"
          align="center"
          color="text.secondary"
          sx={{ mx: 10, color: {homeSecondary} }}
          id="subtitle"
        >
          {chosenStat}
        </Typography>
      </Container>
      {
        <Container maxWidth="lg">
          {/* Main content */}

          <Stack
            direction="row"
            spacing={7}
            divider={<Divider orientation="vertical" flexItem />}
            justifyContent={"center"}
          >
            {/* Left NBA player */}
            {PlayerCard(player1)}
            {/* Select for player to make choice */}
            <Stack justifyContent={"center"} spacing={2}>
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
                  color: {homePrimary},
                  background: {homeSecondary},
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
              {/* Skip button */}
              <Button
                href="#"
                variant="outlined"
                sx={{
                  my: 5,
                  mx: 5,
                  color: {homePrimary},
                  background: {homeSecondary},
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
                Skip
              </Button>
            </Stack>
            {/* Right NBA player */}
            {PlayerCard(player2)}
          </Stack>
        </Container>
      }
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: {homeSecondary},
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2" sx={{textAlign:"center" }}>
            Game Over
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2, textAlign:"center" }}>
          Your final score was {userPoints}.
          </Typography>
        </Box>
      </Modal>
      <Modal
        open={teamOpen}
        // onClose={handleTeamClose}
        aria-labelledby="nba-team-picker"
        aria-describedby="team-picker"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 1000,
            bgcolor: {homeSecondary},
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
            textAlign:"center" 
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2" sx={{textAlign:"center" }}>
            Pick Your Favorite Team
          </Typography>
          <ListTeams teams={nbaTeams} />
        </Box>
      </Modal>
    </div>
    </ThemeProvider>
  );
}

export default App;
