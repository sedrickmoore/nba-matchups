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
import { TextField } from "@mui/material";

const apiKey = process.env.REACT_APP_NBA_API_KEY;

var requestOptions = {
  method: "GET",
  redirect: "follow",
};
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
  "Dallas Mavericks": ["#FFFFFF", "#002B5E"],
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

export default function App() {
  // use state variables
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");
  const [choice, setChoice] = useState(0);
  const [chosenStat, setChosenStat] = useState("");
  const [userPoints, setUserPoints] = useState(0);
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
  const [userName, setUserName] = useState("");
  const [introOpen, setIntroOpen] = useState(true);
  const [streak, setStreak] = useState(0);
  const [streakTracker, setStreakTracker] = useState("");
  const [highScore, setHighScore] = useState([
    ["Player 1", 50, 5],
    ["Player 2", 40, 4],
    ["Player 3", 30, 3],
    ["Player 4", 20, 2],
    ["Player 5", 10, 1],
  ]);
  const [longestStreak, setLongestStreak] = useState(0);
  const [inputError, setInputError] = useState(false);
  // regular variables
  const Ref = useRef(null);
  let prevNum;
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
        if (streak >= 0 && streak < 2) {
          updateScore(10);
          setStreak(streak + 1);
          if (streak > longestStreak) {
            setLongestStreak(streak);
          }
          if (streak === 0) {
            setStreakTracker("");
          } else if (streak === 1) {
            setStreakTracker("🔥");
          }
        } else if (streak >= 2 && streak < 5) {
          updateScore(20);
          setStreak(streak + 1);
          if (streak > longestStreak) {
            setLongestStreak(streak);
          }
          if (streak === 2) {
            setStreakTracker("🔥🔥");
          }
        } else {
          updateScore(30);
          setStreak(streak + 1);
          if (streak > longestStreak) {
            setLongestStreak(streak);
          }
          if (streak === 5) {
            setStreakTracker("🔥🔥🔥");
          }
        }
      } else if (choice == 2) {
        // alert("Incorrect");
        if (userPoints > 0) {
          updateScore(-10);
          setStreak(0);
          if (streak === 0) {
            setStreakTracker("🥶");
          } else {
            setStreakTracker("");
          }
        }
      } else if (choice == 0) {
        // alert("Incorrect");
        if (userPoints > 0) {
          updateScore(-10);
          setStreak(0);
          if (streak === 0) {
            setStreakTracker("🥶");
          } else {
            setStreakTracker("");
          }
        }
      }
    } else if (player1Stat < player2Stat) {
      if (choice == 1) {
        // alert("Incorrect");
        if (userPoints > 0) {
          updateScore(-10);
          setStreak(0);
          if (streak === 0) {
            setStreakTracker("🥶");
          } else {
            setStreakTracker("");
          }
        }
      } else if (choice == 2) {
        if (streak >= 0 && streak < 2) {
          updateScore(10);
          setStreak(streak + 1);
          if (streak > longestStreak) {
            setLongestStreak(streak);
          }
          if (streak === 0) {
            setStreakTracker("");
          } else if (streak === 1) {
            setStreakTracker("🔥");
          }
        } else if (streak >= 2 && streak < 5) {
          updateScore(20);
          setStreak(streak + 1);
          if (streak > longestStreak) {
            setLongestStreak(streak);
          }
          if (streak === 2) {
            setStreakTracker("🔥🔥");
          }
        } else {
          updateScore(30);
          setStreak(streak + 1);
          if (streak > longestStreak) {
            setLongestStreak(streak);
          }
          if (streak === 5) {
            setStreakTracker("🔥🔥🔥");
          }
        }
      } else if (choice == 0) {
        // alert("Incorrect");
        if (userPoints > 0) {
          updateScore(-10);
          setStreak(0);
          if (streak === 0) {
            setStreakTracker("🥶");
          } else {
            setStreakTracker("");
          }
        }
      }
    } else if (player1Stat == player2Stat) {
      if (choice == 1) {
        // alert("Incorrect");
        if (userPoints > 0) {
          updateScore(-10);
          setStreak(0);
          if (streak === 0) {
            setStreakTracker("🥶");
          } else {
            setStreakTracker("");
          }
        }
      } else if (choice == 2) {
        // alert("Incorrect");
        if (userPoints > 0) {
          updateScore(-10);
          setStreak(0);
          if (streak === 0) {
            setStreakTracker("🥶");
          } else {
            setStreakTracker("");
          }
        }
      } else if (choice == 0) {
        if (streak >= 0 && streak < 2) {
          updateScore(10);
          setStreak(streak + 1);
          if (streak > longestStreak) {
            setLongestStreak(streak);
          }
          if (streak === 0) {
            setStreakTracker("");
          } else if (streak === 1) {
            setStreakTracker("🔥");
          }
        } else if (streak >= 2 && streak < 5) {
          updateScore(20);
          setStreak(streak + 1);
          if (streak > longestStreak) {
            setLongestStreak(streak);
          }
          if (streak === 2) {
            setStreakTracker("🔥🔥");
          }
        } else {
          updateScore(30);
          setStreak(streak + 1);
          if (streak > longestStreak) {
            setLongestStreak(streak);
          }
          if (streak === 5) {
            setStreakTracker("🔥🔥🔥");
          }
        }
      }
    }
    console.log(`streak = ${streak}`);
  };
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setStreakTracker("");
    setLongestStreak(0);
  };
  const handleTeamOpen = () => setTeamOpen(true);
  const handleIntroOpen = () => {
    setIntroOpen(true);
    setUserPoints(0);
    setStreak(0);
    setStreakTracker("");
    setLongestStreak(0);
  };
  const handleIntroClose = () => setIntroOpen(false);
  const switchChange = (event) => {
    setChecked(event.target.checked);
    if (checked) {
      setSwitchLabel("Home");
      setCurrentPrimary(homePrimary);
      setCurrentSecondary(homeSecondary);
    } else {
      setSwitchLabel("Away");
      setCurrentPrimary(awayPrimary);
      setCurrentSecondary(awaySecondary);
    }
  };
  const pickTeam = (event) => {
    let primary, secondary;
    setFavTeam(event.target.value);
    setTeamOpen(false);
    setOpen(false);
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
  const handleInputChange = (event) => {
    const value = event.target.value;
    // Perform your validation logic here
    // For example, checking if the username is empty
    if (value.trim() === "" || value.length > 20) {
      setInputError(true);
    } else {
      setInputError(false);
    }
    setUserName(value);
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && userName.trim() !== "" && userName.length < 20) {
      handleTeamOpen();
      handleIntroClose();
    }
  };
  const listHighScores = (scores) => (
    <Typography
      component="div"
      className="MuiTypography-root MuiTypography-body1 css-7a4s5n-MuiTypography-root"
    >
      <h2>Top Scores</h2>
      <ol>
        {scores.map((score, index) => (
          <Typography
            key={index}
            component="li"
            className="MuiTypography-root MuiTypography-body1 css-ahj2mt-MuiTypography-root"
          >
            {score[0]}.....🏀{score[1]}.....🔥{score[2]}
          </Typography>
        ))}
      </ol>
    </Typography>
  );
  const updateLeaderboard = (name, points, streak) => {
    let updatedScores = [...highScore];

    // Check where to insert the new score
    for (let i = 0; i < updatedScores.length; i++) {
      if (points > updatedScores[i][1]) {
        updatedScores.splice(i, 0, [name, points, streak]);
        updatedScores.pop(); // Remove the last element (to keep top 5)
        break;
      }
    }

    setHighScore(updatedScores);
  };
  // functions
  // Switches players and grabs and sets their player ID
  // API call
  function switchPlayer(callback) {
    let randomPlayer1 = randomNum(0, 465);
    let randomPlayer2 = randomNum(0, 465);
    fetch(
      `https://api.sportsdata.io/v3/nba/scores/json/PlayersActiveBasic?key=${apiKey}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        const p1 = result[randomPlayer1];
        const p2 = result[randomPlayer2];
        const id1 = p1.PlayerID;
        const id2 = p2.PlayerID;
        setPlayer1(p1);
        setPlayer2(p2);
        let currentStat = randomNum(0, 5);
        setChosenStat(stats[currentStat]);
        switchPlayerStat(id1, stats[currentStat], setPlayer1Stat);
        switchPlayerStat(id2, stats[currentStat], setPlayer2Stat);
        console.log(
          `Player 1 is ${p1.FirstName} ${p1.LastName} ID = ${p1.PlayerID}`
        );
        console.log(
          `Player 2 is ${p2.FirstName} ${p2.LastName} ID = ${p2.PlayerID}`
        );
        if (callback) callback();
      })
      .catch((error) => console.error(error));
  }
  // Changes player stats
  // API call
  function switchPlayerStat(playerID, stat, setPlayerStat) {
    fetch(
      `https://api.sportsdata.io/v3/nba/stats/json/PlayerSeasonStatsByPlayer/2024/${playerID}?key=${apiKey}`,
      requestOptions
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.text(); // Get response body as text
      })
      .then((text) => {
        try {
          const result = JSON.parse(text); // Attempt to parse JSON
          if (Object.keys(result).length === 0) {
            // Handle empty object scenario
            setPlayerStat(0);
            if (setPlayerStat == setPlayer1Stat) {
              console.log(`Player 1 ${stat} = 0 (empty result)`);
            } else if (setPlayerStat == setPlayer2Stat) {
              console.log(`Player 2 ${stat} = 0 (empty result)`);
            }
          } else {
            const pStat = result[statsMap[stat]];
            if (pStat === undefined) {
              throw new Error(
                `Statistic '${stat}' not found for player ${playerID}`
              );
            }
            setPlayerStat(pStat);
            if (setPlayerStat == setPlayer1Stat) {
              console.log(`Player 1 ${stat} = ${pStat}`);
            } else if (setPlayerStat == setPlayer2Stat) {
              console.log(`Player 2 ${stat} = ${pStat}`);
            }
          }
        } catch (error) {
          // Handle JSON parsing errors or empty response
          // console.error('Error parsing JSON or empty response:', error);
          setPlayerStat(0); // Set pStat to 0 in case of parsing error
          if (setPlayerStat == setPlayer1Stat) {
            console.log(`Player 1 ${stat} = 0 (empty response)`);
          } else if (setPlayerStat == setPlayer2Stat) {
            console.log(`Player 2 ${stat} = 0 (empty response)`);
          }
        }
      })
      .catch((error) => {
        console.error("Error fetching player stats:", error);
        // Handle additional error scenarios here if needed
      });
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
      setStreak(0);
      setStreakTracker("");
    }
  };
  // use effects
  useEffect(() => {
    switchPlayer();
  }, []);
  useEffect(() => {
    if (timer === "00:01") {
      setTimeout(() => {
        handleOpen();
      }, 1000);
    }
  }, [timer]);
  useEffect(() => {
    if (timer === "00:00") {
      updateLeaderboard(userName, userPoints, longestStreak);
    }
  }, [timer]);
  // main react app return
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <CssBaseline />
        <Container
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <FormControlLabel
            control={<MaterialUISwitch sx={{ m: 1 }} />}
            sx={{ color: currentSecondary }}
            label={switchLabel}
            checked={checked}
            onChange={switchChange}
          />
          <Typography
            variant="h5"
            align="center"
            color="text.primary"
            sx={{ color: currentSecondary }}
          >
            {streakTracker}
          </Typography>
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
                {userName}'s Score: {userPoints}
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
                    if (timer > "00:00") {
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
        {/* Game Over Modal */}
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
              {listHighScores(highScore)}
            </Typography>
            <Button
              variant="outlined"
              sx={{
                my: 3,
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
              Continue
            </Button>
            <Button
              variant="outlined"
              sx={{
                my: 1,
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
              onClick={handleIntroOpen}
            >
              Change Player
            </Button>
          </Box>
        </Modal>
        {/* Team Picker Modal */}
        <Modal
          open={teamOpen}
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
        {/* Intro Modal */}
        <Modal
          open={introOpen}
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
              Welcome to NBA Matchup! <br />
              <br />
              <u>The Game</u>
              <br />
              <br />
              Each round, you must guess which of two players have the higher
              stat in the chosen category.
              <br />
              You have one minute to make as many correct guesses as you can.
              <br />
              A correct guess is 10 points, but guess wrong, and you lose 10.
              <br />
              Guess correct twice in a row, and points double.
              <br />
              Guess correct 5 times in a row, and points triple.
              <br />
              You may skip if you are not sure and want to preserve your points.
              <br />
              <br />
              <u>Keep In Mind</u>
              <br />
              <br />
              This is for the '23 -'24 season! <br />
              As a curveball, rookies are included, but do not have stats.
              <br />
              You can change your favorite team in the top right corner.
              <br />
              You can toggle light/dark backgrounds in the top left corner.
              <br />
              <br />
              To start, enter your name:
            </Typography>
            <form>
              <TextField
                id="outlined-basic"
                label="Enter Name"
                value={userName}
                variant="outlined"
                error={inputError} // Pass error state to the TextField
                helperText={inputError ? "Invalid input" : ""}
                sx={{
                  backgroundColor: currentPrimary,
                  input: { color: currentSecondary },
                }}
                onKeyDown={handleKeyDown}
                onChange={handleInputChange}
              />
            </form>
          </Box>
        </Modal>
      </div>
    </ThemeProvider>
  );
}
