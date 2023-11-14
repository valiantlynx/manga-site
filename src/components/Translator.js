import React from 'react';
import { Steps } from 'antd';
import Tesseract from 'tesseract.js'

import UploadFile from "./UploadFile";
import ImageItem from "./ImageItem";
import {dataURLtoFile} from "../utils";

const Step = Steps.Step;

class Translator extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      step: 0,
      images: [],
      progress: '',
    };
  }

  onImages = images => {
    console.log('images', images.files);
    const arr = [];
    let i = 0;
    let j = 0;
    this.setState({
      step: 1,
    });
    for (const key in images.files) {
      if (key.indexOf('.jpg') !== -1) {
        i++;
        const k = i;
        images.files[key].async('base64').then(content => {
          arr.push({
            name: key,
            dataUrl: `data:image/jpg;base64,${content}`,
            i: k,
          });
          j++;
          this.setState({
            progress: `${j} / ${i}`,
          });
          if (j === i) {
            this.setState({
              images: arr.sort((a, b) => a.i - b.i),
              step: 2,
              progress: '',
            });
          }
        });
      }
    }
  };

  getText = (image) => {
    var file = dataURLtoFile(image.dataUrl, image.name);
    console.log('file', file);
    Tesseract
      .recognize(file, { lang: 'jpn' })
      .progress(function  (p) { console.log('progress', p)    })
      .then(function (result) { console.log('result', result) })
  };

  render() {
    const { step, images, progress } = this.state;
    return (
      <div className="translator-container">

        <div className="steps">
          <Steps current={step}>
            {/*0*/}
            <Step title="上传文件" description="暂时只支持epub" />
            {/*1*/}
            <Step title="解析epub" description="解压+转码" />
            {/*2*/}
            <Step title="扣字" description="读取图片中文字" />
          </Steps>
        </div>

        <div className="current-step">

          <div className="upload-file">
            <UploadFile
              onImages={this.onImages}
            />
          </div>

          {progress && (
            <div className="progress">
              进度:{' '}{progress}
            </div>
          )}

          <div className="images">
            {images.map(image => (
              <ImageItem
                image={image}
                getText={this.getText}
                key={image.name}
              />
            ))}
          </div>
        </div>

      </div>
    );
  }
}

export default Translator;
