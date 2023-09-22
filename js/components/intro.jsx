import ReactQuill from 'react-quill';
import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import { styled } from '@mui/material/styles';
import LocalCafeIcon from '@mui/icons-material/LocalCafe';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import DeveloperModeIcon from '@mui/icons-material/DeveloperMode';

const RoundedAvatar = styled(Avatar)`
  color: #fff;
  background-color: #1BB3A6;
`;

const Center = styled('div')(({ theme }) =>`
    margin-left: auto;
    margin-right: auto;
    justify-content: center;
    display: flex;

    & > *: {
      margin: ${theme.spacing(1)};
    }
`);

export default function Intro() {
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
    <div style={{maxWidth: '900px', margin:'10px auto 0'}}>
      <Paper>
        <Grid container>
          <Grid item md={6}>
          <h1>{ page.header }</h1>
          <p>{ page.body }</p>
          <Divider variant="middle" />
          <p>{ page.tag }</p>
          <Center>
            <RoundedAvatar>
              <DeveloperModeIcon />
            </RoundedAvatar>
            <RoundedAvatar>
              <NewReleasesIcon />
            </RoundedAvatar>
            <RoundedAvatar>
              <LocalCafeIcon />
            </RoundedAvatar>
          </Center>
          </Grid>
          <Grid item md={6}>
          <div className={"gif " + gif}></div>
          </Grid>
        </Grid>
      </Paper>        
    </div>
  );
}
