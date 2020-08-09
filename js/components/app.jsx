import Quill from './quill.jsx';
import Intro from './intro.jsx';
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  center: {
    marginLeft: 'auto',
    marginRight: 'auto',
    textAlign: 'center',
    '& > *': {
      margin: theme.spacing(1),
    }
  },
  name: {
    textAlign: 'center',
    fontSize: '64px',
    fontWeight: 'lighter'
  },
  articleItem: {textAlign: 'center', marginBottom: '30px'}
}));

export default function App() {
  const classes = useStyles();
  
  return (
    <div style={{maxWidth: '900px', margin:'0 auto'}}>
      <h1 className={classes.name}>Flask React</h1>
      <div className={classes.articleItem}>
        <Intro />
      </div>
      <div className={classes.articleItem}>
        <Quill />
      </div>
      <h2 className={classes.center}>
        Code By Benjamin Knox
      </h2>
    </div>
  );
}
