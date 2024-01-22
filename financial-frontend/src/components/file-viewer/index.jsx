import React, { Component } from 'react';

import FileViewer from 'react-file-viewer';
import { CustomErrorComponent } from 'custom-error';
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";


const FileViewerScreen = ({ file, type }) => {
  const onError = (e) => {
    console.log(e, 'error in file-viewer');
  }
  const docs = [
    {
      uri: file,
      fileType: type,
      fileName: ''
    }, // Remote file

  ];
  return (
    // <FileViewer
    //   fileType={type}
    //   filePath={file}
    //   errorComponent={CustomErrorComponent}
    //   onError={onError} />
    <DocViewer
      prefetchMethod='GET'
      documents={docs}
      pluginRenderers={DocViewerRenderers}
      config={{
        header: {
          disableHeader: true,
          disableFileName: true,
          retainURLParams: true,
        },
        pdfVerticalScrollByDefault: true,
      }}

    />
  );



}

export default FileViewerScreen