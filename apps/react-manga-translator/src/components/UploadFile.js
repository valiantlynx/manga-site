import React from 'react';
import JSZip from 'jszip';

function UploadFile({ onImages }) {
  function handleFileChange(e) {
    const f = e.target.files[0];
    JSZip.loadAsync(f).then(function(zip) {
      onImages(zip);
    });
  }
  return (
    <div>
      <input type="file" onChange={handleFileChange} accept=".epub" />
    </div>
  );
}

export default UploadFile;
