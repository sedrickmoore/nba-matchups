import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from "@mui/material/CardHeader";
import CardMedia from '@mui/material/CardMedia';
import Grid from "@mui/material/Grid";
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function CharacterCard(prop) {
  return (
    <Grid item xs={12} md={4}>
            <Card>
              <CardMedia
                component="img"
                height="350px"
                image={prop.images}
              />
              <CardHeader
                title={prop.title}
                titleTypographyProps={{ align: "center" }}
                sx={{ mt: 1 }}
              />
              <CardContent sx={{ pt: 0 }}>
                <ul>
                  {prop.description.map((descriptionBulletPoint) => (
                    <Typography component="li">
                      {descriptionBulletPoint}
                    </Typography>
                  ))}
                </ul>
              </CardContent>
              <CardActions>
                <Button
                  variant="contained"
                  sx={{ px: 6, mx: "auto", border: "solid 5px red" }}
                  onClick={() => {
                    fetchFact()
                  }}
                >
                  Fun Fact
                </Button>
              </CardActions>
            </Card>
          </Grid>
  );
}

function fetchFact() {
    var requestOptions = {
        method: "GET",
        redirect: "follow"
      };
      
      fetch("https://uselessfacts.jsph.pl/api/v2/facts/random", requestOptions)
        .then((response) => response.json())
        .then((result) => {
            alert(result.text)
        })
        .catch((error) => console.error(error));
  }