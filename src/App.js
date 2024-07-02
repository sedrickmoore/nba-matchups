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
import characters from "./protagonists.json";
import CharacterCard from "./CharacterCard";
import { useState } from "react";

var requestOptions = {
  mode: "no-cors",
  method: "GET",
  redirect: "follow",
};

const myHeaders = new Headers();
myHeaders.append(
  "X-RapidAPI-Key",
  "95f88eebc2mshbafbf69143a8984p134fcdjsnd439ffca347a"
);

const bbRequestOptions = {
  method: "GET",
  headers: myHeaders,
  redirect: "follow",
};

function App() {
  const [myFact, setFact] = useState(
    "Press the top corner button to display a Laker here"
  );
  const [visits, setVisits] = useState("You have never visited this page.");

  function switchFact() {
    const randomNum = (min, max) => {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    let randomPlayer = randomNum(0,24)
    console.log(randomPlayer)
    fetch(
      "https://api-nba-v1.p.rapidapi.com/players?team=17&season=2023",
      bbRequestOptions
    )
      .then((response) => response.json())
      .then((result) =>
        setFact(
          result.response[randomPlayer].firstname +
            " " +
            result.response[randomPlayer].lastname
        )
      )
      .catch((error) => console.error(error));
  }
  function updateVisits() {
    fetch("http://localhost:5000/count", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.error(error));
  }
  updateVisits();
  return (
    <div className="App">
      <CssBaseline />
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{ borderBottom: "1px solid lightgray" }}
      >
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Characters Inc
          </Typography>
          <Button
            href="#"
            variant="outlined"
            sx={{
              my: 1,
              mx: 1.5,
              color: "red",
              background: "purple",
              fontWeight: "bold",
            }}
            onClick={() => {
              switchFact();
            }}
          >
            New Fact
          </Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md" sx={{ my: 4 }}>
        <Typography
          variant="h2"
          align="center"
          color="text.primary"
          sx={{ py: 2 }}
        >
          Prevalent Protagonists
        </Typography>
        <Typography
          variant="h5"
          align="center"
          color="text.secondary"
          sx={{ mx: 10 }}
          id="subtitle"
        >
          {myFact}
        </Typography>
      </Container>
      {/* End hero unit */}
      <Container maxWidth="lg">
        <Grid
          container
          spacing={5}
          justifyContent="center"
          alignItems="flex-start"
        >
          {characters.map((oneCharacter) => (
            <CharacterCard
              title={oneCharacter.title}
              images={oneCharacter.pic}
              description={oneCharacter.description}
            ></CharacterCard>
          ))}
        </Grid>
      </Container>
      <Container>
        <Typography
          variant="h5"
          align="center"
          color="text.secondary"
          sx={{ mx: 10 }}
          id="subtitle"
        >
          {visits}
        </Typography>
      </Container>
    </div>
  );
}

export default App;
