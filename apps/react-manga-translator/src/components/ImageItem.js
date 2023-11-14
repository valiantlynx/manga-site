import React from 'react';

function ImageItem({ image, getText, result }) {
  return (
    <div className="images-item">
      <div className="image-name">
        {image.name}({image.i})
      </div>
      <div className="image-content">
        <img src={image.dataUrl} className="image" />
      </div>
      <div className="image-result">
        <button onClick={() => getText(image)}>取字</button>
        {result}
      </div>
    </div>
  );
}

export default ImageItem;
