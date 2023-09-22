import ReactQuill from 'react-quill';
import React, { useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

const QuillWrapper = styled(Grid)`
  padding: 10px;
  box-sizing: border-box;
`;

const Editor = styled('div')`
    height: '300px';

    & p {
      font-size: '12pt';
      margin-top: '6px';
    }
`;

let editor = React.createRef();
let changeTimeout;

let handleChange = () => {
  if(changeTimeout) {
    clearTimeout(changeTimeout);
  }
  
  changeTimeout = setTimeout(function() {
    fetch(`/api/v1/save-editor`, {
      method: 'POST',
      body: JSON.stringify({editorContent: editor.current.getEditorContents()}),
      headers: { 'Content-Type': 'application/json'}
    });
    clearTimeout(changeTimeout);
  }, 300);
}

export default function Quill() {
  const [content, setContent] = useState([]);
  const [page, setPage] = useState([]);
  
  if(content.length == 0) {
    fetch(`/api/v1/editor-content`)
      .then(result => {
        return result.json();
      })
      .then(response => {
        setContent(response.editorHTML);
        setPage(response);
      });
  }
  
  const toolbarOptions = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      ['blockquote', 'code-block'],
    
      [{ 'header': 1 }, { 'header': 2 }],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'script': 'sub'}, { 'script': 'super' }],
      [{ 'indent': '-1'}, { 'indent': '+1' }],
      [{ 'direction': 'rtl' }],
    
      [{ 'size': ['small', false, 'large', 'huge'] }],
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    
      [{ 'color': [] }, { 'background': [] }],
      [{ 'font': [] }],
      [{ 'align': [] }],
    
      ['clean']
    ]
  };
  
  return (
    <div style={{maxWidth: '900px', margin:'10px auto 0'}}>
      <Paper style={{textAlign: 'center'}}>
        <QuillWrapper container>
          <Grid item md={4}>
            <h2>{ page.header }</h2>
            <p dangerouslySetInnerHTML={{ __html: page.body }}></p>
            <div className={"gif write"}></div>
          </Grid>
          <Grid item md={8}>
            <ReactQuill ref={editor}
                        value={content}
                        modules={toolbarOptions}
                        onKeyUp={handleChange}
                        theme="snow">
              <Editor></Editor>
            </ReactQuill>
          </Grid>
        </QuillWrapper>
      </Paper>
    </div>
  );
}
