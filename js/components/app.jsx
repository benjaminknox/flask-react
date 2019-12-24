import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import LocalCafeIcon from '@material-ui/icons/LocalCafe';
import NewReleasesIcon from '@material-ui/icons/NewReleases';
import DeveloperModeIcon from '@material-ui/icons/DeveloperMode';


const useStyles = makeStyles(theme => ({
  rounded: {
    color: '#fff',
    backgroundColor: '#1BB3A6',
  },
  center: {
    marginLeft: 'auto',
    marginRight: 'auto',
    justifyContent: 'center',
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    }
  }
}));

export default function App() {
  const classes = useStyles();
  const [page, setPage] = useState([]);
  const [gif, setGif] = useState("loading");

  if(page.length == 0) {
    fetch(`/api/v1/basic`)
      .then(result => {
        return result.json();
      })
      .then(response => {
        setPage(response);
        setGif("lines-of-code");
      });
  }
  return (
    <div style={{maxWidth: '900px', margin:'0 auto'}}>
      <Paper style={{textAlign: 'center'}}>
        <Grid container>
          <Grid item md={6}>
          <h1>{ page.header }</h1>
          <p>{ page.body }</p>
          <Divider variant="middle" />
          <p>{ page.tag }</p>
          <div className={classes.center}>
            <Avatar className={classes.rounded}>
              <DeveloperModeIcon />
            </Avatar>
            <Avatar className={classes.rounded}>
              <NewReleasesIcon />
            </Avatar>
            <Avatar className={classes.rounded}>
              <LocalCafeIcon />
            </Avatar>
          </div>
          </Grid>
          <Grid item md={6}>
          <div className={"gif " + gif}></div>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
