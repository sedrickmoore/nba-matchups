import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from "@mui/material/CardHeader";
import Grid from "@mui/material/Grid";
import Typography from '@mui/material/Typography';

export default function PlayerCard(player) {
  return (
    <Grid item xs={12} md={4}>
            <Card sx={{background:"gold", color:"purple", width:350, justifyContent:"center"}}>
              <CardHeader
              title={player.FirstName +
                " " +
                player.LastName}
                titleTypographyProps={{ align: "center" }}
                sx={{ mt: 1}}
              />
              <CardContent sx={{ pt: 10}}>
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
            </Card>
          </Grid>
  );
}