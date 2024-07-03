import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from "@mui/material/CardHeader";
import CardMedia from '@mui/material/CardMedia';
import Grid from "@mui/material/Grid";
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function PlayerCard(player) {
  return (
    <Grid item xs={12} md={4}>
            <Card sx={{background:"gold", color:"purple" }}>
              <CardHeader
              title={player.FirstName +
                " " +
                player.LastName}
                titleTypographyProps={{ align: "center" }}
                sx={{ mt: 1}}
              />
              <CardContent sx={{ pt: 0}}>
                <ul>
                   <Typography component="li">
                      {"Team: " + player.Team}
                    </Typography>
                    <Typography component="li">
                      {"Position: " + player.Position}
                    </Typography>
                    <Typography component="li">
                      {"Height (in.): " + player.Height}
                    </Typography>
                    <Typography component="li">
                      {"Weight (lbs.): " + player.Weight}
                    </Typography>
                    <Typography component="li">
                      {"Birth Year: " + player.BirthDate?.substring(0, 4)}
                    </Typography>
                </ul>
              </CardContent>
             {/*  <CardActions>
                <Button
                  variant="contained"
                  sx={{ px: 6, mx: "auto", background:"purple", color:"orchid"}}
                  // onClick={() => {
                  //   fetchFact()
                  // }}
                >
                  Choose 
                </Button>
              </CardActions> */}
            </Card>
          </Grid>
  );
}