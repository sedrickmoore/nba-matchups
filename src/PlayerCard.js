import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

export default function PlayerCard(player) {
  return (
    <Grid item xs={12} md={4}>
      <Card
        sx={{
          backgroundColor: "rgba(255, 255, 255, 0.5)",
          backdropFilter: "blur(8px)",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          borderRadius: 100,
          p: 2,
          color: "black",
          width: 350,
          justifyContent: "center",
        }}
      >
        <CardHeader
          title={player.FirstName + " " + player.LastName}
          titleTypographyProps={{ align: "center" }}
          // sx={{ mt: 1 }}
        />
        <CardContent >
          <ul
            style={{ listStyleType: "none", padding: 0, textAlign: "center" }}
          >
            <li>
              <Typography>{"Team: " + player.Team}</Typography>
            </li>
            <li>
              <Typography>{"Position: " + player.Position}</Typography>
            </li>
            <li>
              <Typography>{"Height (in.): " + player.Height}</Typography>
            </li>
            <li>
              <Typography>{"Weight (lbs.): " + player.Weight}</Typography>
            </li>
            <li>
              <Typography>
                {"Birth Year: " +
                  (player.BirthDate ? player.BirthDate.substring(0, 4) : "")}
              </Typography>
            </li>
          </ul>
        </CardContent>
      </Card>
    </Grid>
  );
}
