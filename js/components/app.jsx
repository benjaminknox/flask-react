import Quill from './quill.jsx';
import Intro from './intro.jsx';
import React, { useState } from 'react';
import { styled } from '@mui/material/styles';

const Center = styled('h2')(({ theme }) =>`
    margin-left: auto;
    margin-right: auto;
    text-align: center;

    & > * {
      margin: ${theme.spacing(1)};
    }
`);

const Name = styled('h1')`
  text-align: center;
  font-size: 64px;
  font-weight: lighter;
`;

const ArticleItem = styled('div')`
  text-align: center;
  margin-bottom: 30px;
`;

export default function App() {
  return (
    <div style={{maxWidth: '900px', margin:'0 auto'}}>
      <Name>Flask React</Name>
      <ArticleItem>
        <Intro />
      </ArticleItem>
      <ArticleItem>
        <Quill />
      </ArticleItem>
      <Center>
        Code By Benjamin Knox
      </Center>
    </div>
  );
}
