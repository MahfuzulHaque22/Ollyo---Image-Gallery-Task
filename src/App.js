import React, { Component } from "react";
import "./App.css";
import Uploader from "./Components/Uploader";
import Preview from "./Components/Preview";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imagesPreviewUrls: this.getInitialImages(),
    };
  }

  getInitialImages = () => {
    // You can define your initial images here
    const initialImages = [
      { id: 1, file: "assets/image-1.webp" },
      { id: 2, file: "assets/image-2.webp" },
      { id: 3, file: "assets/image-3.webp" },
      { id: 4, file: "assets/image-4.webp" },
      { id: 5, file: "assets/image-5.webp" },
      { id: 6, file: "assets/image-6.webp" },
      { id: 7, file: "assets/image-7.webp" },
      { id: 8, file: "assets/image-8.webp" },
      { id: 9, file: "assets/image-9.webp" },
      { id: 10, file: "assets/image-10.jpeg" },
      { id: 11, file: "assets/image-11.jpeg" }
      // Add more initial images as needed
    ];

    return initialImages;
  };

  imagesPreviewUrls = (result) => {
    this.setState({
      imagesPreviewUrls: [...this.state.imagesPreviewUrls, result]
    });
  };

  deleteImage = (id) => {
    const { imagesPreviewUrls } = this.state;
    if (imagesPreviewUrls.length > 0) {
      const filterImages = imagesPreviewUrls.filter((image) => image.id !== id);
      this.setState({
        imagesPreviewUrls: filterImages
      });
    }
  };

  render() {
    const { imagesPreviewUrls } = this.state;
    // console.log(imagesPreviewUrls);
    return (
      <div>

        {imagesPreviewUrls.length > 0 ? (
          <Preview
            imagesPreviewUrls={imagesPreviewUrls}
            deleteImage={this.deleteImage}
          />
        ) : null}

        <Uploader imagesPreviewUrls={this.imagesPreviewUrls} />
      </div>
    );
  }
}

export default App;