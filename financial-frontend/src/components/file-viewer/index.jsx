import React, { Component } from 'react';

import FileViewer from 'react-file-viewer';
import { CustomErrorComponent } from 'custom-error';



const FileViewerScreen = ({file,type}) => {
  const onError = (e) => {
    console.log(e, 'error in file-viewer');
  }
  return (
    <FileViewer
      fileType={type}
      filePath={file}
      errorComponent={CustomErrorComponent}
      onError={onError} />
  );



}

export default FileViewerScreen