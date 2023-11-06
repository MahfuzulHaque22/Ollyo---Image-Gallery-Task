import React, { Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

class Preview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      previewImages: [],
      dragId: "",
      selectedImages: new Set(),
      showDeleteButton: false, // Initially hide the button
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.imagesPreviewUrls !== state.previewImages) {
      return {
        previewImages: props.imagesPreviewUrls,
      };
    }
    return null;
  }

  deleteImage = (id) => {
    const { deleteImage } = this.props;
    deleteImage(id);
  };

  deleteSelectedImages = () => {
    const { selectedImages } = this.state;
    selectedImages.forEach((id) => {
      this.deleteImage(id);
    });
    this.setState({ selectedImages: new Set(), showDeleteButton: false });
  };

  handleOver = (ev) => {
    ev.preventDefault();
  };

  handleDrag = (ev) => {
    this.setState({
      dragId: ev.currentTarget.id,
    });
  };

  handleDrop = (ev) => {
    ev.preventDefault();
    const { previewImages } = this.state;
    const { dragId } = this.state;
    const dragImage = previewImages.find((image) => image.id == dragId);
    const dropImage = previewImages.find(
      (image) => image.id == ev.currentTarget.id
    );
    const arr = this.moveItem(dragImage.id - 1, dropImage.id - 1);

    this.setState({
      previewImages: arr,
    });
  }

  moveItem(from, to) {
    const { previewImages } = this.state;
    const f = previewImages.splice(from, 1)[0];
    previewImages.splice(to, 0, f);
    return previewImages;
  }

  toggleImageSelection = (id) => {
    this.setState((prevState) => {
      const selectedImages = new Set(prevState.selectedImages);

      if (selectedImages.has(id)) {
        selectedImages.delete(id);
      } else {
        selectedImages.add(id);
      }

      const showDeleteButton = selectedImages.size > 0;
      return { selectedImages, showDeleteButton };
    });
  };

  renderPreview() {
    const { previewImages, selectedImages } = this.state;
    if (previewImages.length > 0) {
      previewImages.map((items, index) => {
        items.id = index + 1;
      });
    }
    return (
      <Fragment>
        {previewImages.length > 0 &&
          previewImages.map((element, index) => {
            return (
              <div className="im" key={index}>
                <div
                  className={`gallery ${selectedImages.has(element.id) ? "selected" : ""}`}
                  id={element.id}
                  draggable
                  onDragOver={(e) => this.handleOver(e)}
                  onDragStart={(e) => this.handleDrag(e)}
                  onDrop={(e) => this.handleDrop(e)}
                >
                  <div className="desc">
                    <img
                      src={element.file}
                      alt={element.name}
                      width="600"
                      height="400"
                    />
                    <div className="image-order">
                      <input
                        type="checkbox"
                        checked={selectedImages.has(element.id)}
                        onChange={() => this.toggleImageSelection(element.id)}
                      />
                      <FontAwesomeIcon
                        className="delete-icon"
                        onClick={() => this.deleteImage(element.id)}
                        icon={faTrash}
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </Fragment>
    );
  }

  render() {
    const { showDeleteButton } = this.state;
    return (
      <div className="wrapper">
        {showDeleteButton && (
          <button
            className="delete-selected"
            onClick={this.deleteSelectedImages}
          >
            Delete Selected
          </button>
        )}
        {this.renderPreview()}
      </div>
    );
  }
}

export default Preview;
