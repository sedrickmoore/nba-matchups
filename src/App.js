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
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Switch from "@mui/material/Switch";
import { styled } from "@mui/material/styles";

var requestOptions = {
  method: "GET",
  redirect: "follow",
};
let prevNum;
let highScore = 0;
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

const nbaColors = {
  "Atlanta Hawks": ["#FDB927", "#C8102E"],
  "Boston Celtics": ["#BA9653", "#007A33"],
  "Brooklyn Nets": ["#FFFFFF", "#000000"],
  "Charlotte Hornets": ["#00788C", "#1D1160"],
  "Chicago Bulls": ["#CE1141", "#000000"],
  "Cleveland Cavaliers": ["#860038", "#041E42"],
  "Dallas Mavericks": ["#00538C", "#002B5E"],
  "Denver Nuggets": ["#FEC524", "#0E2240"],
  "Detroit Pistons": ["#C8102E", "#1D42BA"],
  "Golden State Warriors": ["#FFC72C", "#1D428A"],
  "Houston Rockets": ["#C4CED4", "#CE1141"],
  "Indiana Pacers": ["#FDBB30", "#002D62"],
  "LA Clippers": ["#C8102E", "#1D428A"],
  "Los Angeles Lakers": ["#FDB927", "#552583"],
  "Memphis Grizzlies": ["#5D76A9", "#12173F"],
  "Miami Heat": ["#F9A01B", "#98002E"],
  "Milwaukee Bucks": ["#EEE1C6", "#00471B"],
  "Minnesota Timberwolves": ["#236192", "#0C2340"],
  "New Orleans Pelicans": ["#C8102E", "#0C2340"],
  "New York Knicks": ["#F58426", "#006BB6"],
  "Oklahoma City Thunder": ["#EF3B24", "#007AC1"],
  "Orlando Magic": ["#C4CED4", "#0077C0"],
  "Philadelphia 76ers": ["#ED174C", "#006BB6"],
  "Phoenix Suns": ["#E56020", "#1D1160"],
  "Portland Trail Blazers": ["#E03A3E", "#000000"],
  "Sacramento Kings": ["#63727A", "#5A2D81"],
  "San Antonio Spurs": ["#C4CED4", "#000000"],
  "Toronto Raptors": ["#B4975A", "#000000"],
  "Utah Jazz": ["#6CAEDF", "#3E2680"],
  "Washington Wizards": ["#E31837", "#002B5C"],
};

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
  const [switchLabel, setSwitchLabel] = useState("Home");
  const [teamOpen, setTeamOpen] = useState(false);
  const [favTeam, setFavTeam] = useState("Pick New Team");
  const [homePrimary, setHomePrimary] = useState("white");
  const [homeSecondary, setHomeSecondary] = useState("black");
  const [awayPrimary, setAwayPrimary] = useState("black");
  const [awaySecondary, setAwaySecondary] = useState("white");
  const [currentPrimary, setCurrentPrimary] = useState(homePrimary);
  const [currentSecondary, setCurrentSecondary] = useState(homeSecondary);

  // regular variables
  let p1;
  let p2;
  let id1;
  let id2;
  let pStat;
  const Ref = useRef(null);
  // arrow functions
  const MaterialUISwitch = styled(Switch)(({ theme }) => ({
    width: 62,
    height: 34,
    padding: 7,
    "& .MuiSwitch-switchBase": {
      margin: 1,
      padding: 0,
      transform: "translateX(6px)",
      "&.Mui-checked": {
        color: "#fff",
        transform: "translateX(22px)",
        "& .MuiSwitch-thumb:before": {
          backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
            "#fff"
          )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
        },
        "& + .MuiSwitch-track": {
          opacity: 1,
          backgroundColor:
            theme.palette.mode === "dark" ? currentPrimary : currentSecondary,
        },
      },
    },
    "& .MuiSwitch-thumb": {
      backgroundColor:
        theme.palette.mode === "dark" ? currentPrimary : currentSecondary,
      width: 32,
      height: 32,
      "&::before": {
        content: "''",
        position: "absolute",
        width: "100%",
        height: "100%",
        left: 0,
        top: 0,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          "#fff"
        )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
      },
    },
    "& .MuiSwitch-track": {
      opacity: 1,
      backgroundColor:
        theme.palette.mode === "dark" ? currentPrimary : currentSecondary,
      borderRadius: 20 / 2,
    },
  }));
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
    if (checked) {
      setSwitchLabel("Home");
      console.log("Home");
      setCurrentPrimary(homePrimary);
      setCurrentSecondary(homeSecondary);
    } else {
      setSwitchLabel("Away");
      console.log("Away");
      setCurrentPrimary(awayPrimary);
      setCurrentSecondary(awaySecondary);
    }
  };
  const pickTeam = (event) => {
    let primary, secondary;
    setFavTeam(event.target.value);
    setTeamOpen(false);
    setOpen(false);
    console.log(checked);
    if (!checked) {
      setChecked(false);
      setSwitchLabel("Home");
      primary = 0;
      secondary = 1;
    } else {
      setChecked(true);
      setSwitchLabel("Away");
      primary = 1;
      secondary = 0;
    }
    changeColors(event.target.value, primary, secondary);
  };
  const theme = createTheme({
    palette: {
      background: {
        default: currentPrimary,
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
          <Button
            key={index}
            value={team}
            variant="contained"
            color="primary"
            sx={{
              margin: "5px",
              background: nbaColors[team][1],
              color: nbaColors[team][0],
              "&:hover": {
                backgroundColor: nbaColors[team][0],
                color: nbaColors[team][1],
              },
            }}
            onClick={pickTeam}
          >
            {team}
          </Button>
        ))}
      </div>
    );
  }
  function changeColors(team, primary = 0, secondary = 1) {
    setHomePrimary(nbaColors[team][0]);
    setHomeSecondary(nbaColors[team][1]);
    setAwayPrimary(nbaColors[team][1]);
    setAwaySecondary(nbaColors[team][0]);
    setCurrentPrimary(nbaColors[team][primary]);
    setCurrentSecondary(nbaColors[team][secondary]);
  }
  // timer related functions
  const getTimeRemaining = (e) => {
    const total = Date.parse(e) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    return {
      total,
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
      clearTimer(getDeadTime());
      setUserPoints(0);
    }
  };
  useEffect(() => {
    switchPlayer();
  }, []);

  useEffect(() => {
    if (timer === "00:01") {
      setTimeout(() => {
        handleOpen();
      }, 1000);
      if(userPoints > highScore){
        highScore = userPoints
      } 
    }
  }, [timer]);
  useEffect(() => {
    handleTeamOpen();
  }, []);
  // main react app return
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <CssBaseline />
        <Container
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}>
        <FormControlLabel
          control={<MaterialUISwitch sx={{ m: 1 }} />}
          sx={{ color: currentSecondary}}
          label={switchLabel}
          checked={checked}
          onChange={switchChange}
        />
        <Button
          variant="contained"
          color="primary"
          sx={{
            margin: "5px",
            background: currentSecondary,
            color: currentPrimary,
            "&:hover": {
              backgroundColor: "transparent",
              color: currentSecondary,
            },
          }}
          onClick={handleTeamOpen}
        >
          {favTeam}
        </Button>
        </Container>
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
                sx={{ py: 2, color: currentSecondary }}
              >
                {timer}
              </Typography>
              <Typography
                variant="h5"
                align="center"
                color="text.secondary"
                sx={{ mx: 10, color: currentSecondary }}
                id="userpoints"
              >
                Score: {userPoints}
              </Typography>
              <Button
                variant="outlined"
                align="center"
                sx={{
                  my: 5,
                  mx: 5,
                  marginBottom: 5,
                  color: currentPrimary,
                  background: currentSecondary,
                  "&:hover": {
                    backgroundColor: "transparent",
                    color: currentSecondary,
                  },
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
            variant="h5"
            align="center"
            color="text.primary"
            sx={{ py: 2, color: currentSecondary }}
          >
            NBA Matchups
          </Typography>
          {/* Stat for current matchup */}
          <Typography
            variant="h2"
            align="center"
            color="text.secondary"
            sx={{ mx: 10, color: currentSecondary }}
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
                    sx={{ color: currentSecondary }}
                    onChange={handleChange}
                  >
                    <FormControlLabel
                      value={1}
                      control={
                        <Radio
                          sx={{
                            color: currentSecondary,
                            "&.Mui-checked": {
                              color: currentSecondary,
                            },
                          }}
                        />
                      }
                      label={player1.FirstName + " " + player1.LastName}
                    />
                    <FormControlLabel
                      value={2}
                      control={
                        <Radio
                          sx={{
                            color: currentSecondary,
                            "&.Mui-checked": {
                              color: currentSecondary,
                            },
                          }}
                        />
                      }
                      label={player2.FirstName + " " + player2.LastName}
                    />
                    <FormControlLabel
                      value={0}
                      control={
                        <Radio
                          sx={{
                            color: currentSecondary,
                            "&.Mui-checked": {
                              color: currentSecondary,
                            },
                          }}
                        />
                      }
                      label="Same"
                    />
                  </RadioGroup>
                </FormControl>
                <Button
                  variant="outlined"
                  sx={{
                    my: 5,
                    mx: 5,
                    marginBottom: 5,
                    color: currentPrimary,
                    background: currentSecondary,
                    "&:hover": {
                      backgroundColor: "transparent",
                      color: currentSecondary,
                    },
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
                  variant="outlined"
                  sx={{
                    my: 5,
                    mx: 5,
                    color: currentPrimary,
                    background: currentSecondary,
                    "&:hover": {
                      backgroundColor: "transparent",
                      color: currentSecondary,
                    },
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
              bgcolor: currentSecondary,
              border: "2px solid #000",
              boxShadow: 24,
              p: 4,
              textAlign: "center",
            }}
          >
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              sx={{ textAlign: "center", color: currentPrimary }}
            >
              Game Over
            </Typography>
            <Typography
              id="modal-modal-description"
              sx={{ mt: 2, textAlign: "center", color: currentPrimary }}
            >
              The high score is {highScore}.
            </Typography>
            <Button
              variant="outlined"
              sx={{
                my: 5,
                mx: 5,
                color: currentSecondary,
                background: currentPrimary,
                "&:hover": {
                  backgroundColor: "transparent",
                  color: currentPrimary,
                },
                fontWeight: "bold",
                fontSize: 15,
              }}
              onClick={handleClose}
            >
              Play Again
            </Button>
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
              bgcolor: currentSecondary,
              border: "2px solid #000",
              boxShadow: 24,
              p: 4,
              textAlign: "center",
            }}
          >
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              sx={{ textAlign: "center", color: currentPrimary, p: 3 }}
            >
              Pick Your Favorite Team
            </Typography>
            <ListTeams teams={Object.keys(nbaColors)} />
          </Box>
        </Modal>
      </div>
    </ThemeProvider>
  );
}

export default App;
