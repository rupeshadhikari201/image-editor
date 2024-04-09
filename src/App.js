// Import necessary modules and styles
import React, { useState, useRef } from "react";  // Import React and functions useState, useRef from the React library
import "./App.css";  // Import styles from the App.css file

// Define filter options for the image editor
const filterOptions = [  // Define an array called filterOptions containing objects with filter id and name
  { id: "brightness", name: "Brightness" },  // First filter option: Brightness
  { id: "saturation", name: "Saturation" },  // Second filter option: Saturation
  { id: "inversion", name: "Inversion" },  // Third filter option: Inversion
  { id: "grayscale", name: "Grayscale" },  // Fourth filter option: Grayscale
  { id: "blur", name: "Blur" },  // Fifth filter option: Blur
  { id: "contrast", name: "Contrast" },  // Sixth filter option: Contrast
  { id: "hue-rotate", name: "Hue Rotate" },  // Seventh filter option: Hue Rotate
  { id: "sepia", name: "Sepia" },  // Eighth filter option: Sepia
  { id: "opacity", name: "Opacity" },  // Ninth filter option: Opacity

];

// Main React component
function App() {  // Define a React component called App
  // State variables to manage various aspects of the image editor
  const [previewImg, setPreviewImg] = useState(null);  // State variable to store the image being edited
  const [activeFilter, setActiveFilter] = useState("brightness");  // State variable to track the currently active filter
  const [sliderValue, setSliderValue] = useState(100);  // State variable to store the value of the slider for filter intensity
  const [brightness, setBrightness] = useState("100");  // State variable to store the brightness filter value
  const [saturation, setSaturation] = useState("100");  // State variable to store the saturation filter value
  const [inversion, setInversion] = useState("0");  // State variable to store the inversion filter value
  const [grayscale, setGrayscale] = useState("0");  // State variable to store the grayscale filter value
  const [blur, setBlur] = useState("0");  // State variable to store the blur filter value
  const [contrast, setContrast] = useState("100");  // State variable to store the contrast filter value
  const [hueRotate, setHueRotate] = useState("0");  // State variable to store the hue rotate filter value
  const [sepia, setSepia] = useState("0");  // State variable to store the sepia filter value
  const [opacity, setOpacity] = useState("100");  // State variable to store the opacity filter value
  const [rotate, setRotate] = useState(0);  // State variable to store the rotation angle
  const [flipHorizontal, setFlipHorizontal] = useState(1);  // State variable to track horizontal flipping
  const [flipVertical, setFlipVertical] = useState(1);  // State variable to track vertical flipping
  const [dropShadow, setDropShadow] = useState(0)

  // Refs for file input and preview image
  const fileInputRef = useRef(null);  // Reference for file input element
  const previewImgRef = useRef(null);  // Reference for preview image element

  // Function to load an image and reset filters
  const loadImage = (e) => {  // Define a function called loadImage that takes an event object as input
    const file = e.target.files[0];  // Get the selected file from the event
    if (!file) return;  // If no file is selected, exit the function
    setPreviewImg(file);  // Set the selected file as the preview image
    resetFilter();  // Call the resetFilter function to reset all filters
  };

  // Function to apply the selected filter to the preview image
  const applyFilter = () => {  // Define a function called applyFilter
    // Apply CSS filter and transformation styles to the preview image element based on filter values
    previewImgRef.current.style.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%) blur(${blur}px) contrast(${contrast}%) hue-rotate(${hueRotate}deg) sepia(${sepia}%) opacity(${opacity}%)`;
    previewImgRef.current.style.transform = `rotate(${rotate}deg) scale(${flipHorizontal}, ${flipVertical})`;
  };

  // Function to reset all filters and transformations
  const resetFilter = () => {  // Define a function called resetFilter
    // Reset all filter values and transformation settings to their default values
    setBrightness("100");
    setSaturation("100");
    setInversion("0");
    setGrayscale("0");
    setBlur("0");
    setContrast("100");
    setHueRotate("0");
    setSepia("0");
    setOpacity("100");
    setRotate(0);
    setFlipHorizontal(1);
    setFlipVertical(1);
    setActiveFilter("brightness");
    setSliderValue(100);
  };

  // Function to save the filtered image
  const saveImage = () => {  // Define a function called saveImage
    // Create a canvas element and draw the filtered image on it
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const image = new Image();
    image.onload = () => {  // When the image is loaded
      canvas.width = image.naturalWidth;
      canvas.height = image.naturalHeight;

      // Apply filters and transformations to the canvas context
      ctx.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%) blur(${blur}px) contrast(${contrast}%) hue-rotate(${hueRotate}deg) sepia(${sepia}%) opacity(${opacity}%)`;
      ctx.translate(canvas.width / 2, canvas.height / 2);
      if (rotate !== 0) {
        ctx.rotate((rotate * Math.PI) / 180);
      }
      ctx.scale(flipHorizontal, flipVertical);
      ctx.drawImage(
        image,
        -canvas.width / 2,
        -canvas.height / 2,
        canvas.width,
        canvas.height
      );

      // Create a link element to download the edited image
      const link = document.createElement("a");
      link.download = "image.jpg";
      link.href = canvas.toDataURL();
      link.click();  // Trigger a click event on the link to download the image
    };

    // Set the image source to the URL of the preview image
    image.src = URL.createObjectURL(previewImg);
  };

  // Function to handle filter option click
  const handleFilterClick = (option) => {  // Define a function called handleFilterClick that takes an option object as input
    setActiveFilter(option.id);  // Set the active filter to the clicked filter option's id

    // Update the slider value based on the selected filter
    switch (option.id) {
      case "brightness":
        setSliderValue(brightness);
        break;
      case "saturation":
        setSliderValue(saturation);
        break;
      case "inversion":
        setSliderValue(inversion);
        break;
      case "blur":
        setSliderValue(blur);
        break;
      case "contrast":
        setSliderValue(contrast);
        break;
      case "hue-rotate":
        setSliderValue(hueRotate);
        break;
      case "sepia":
        setSliderValue(sepia);
        break;
      case "opacity":
        setSliderValue(opacity);
        break;
      default:
        setSliderValue(grayscale);
    }
  };

  // Function to handle slider value change
  const handleSliderChange = (event) => {  // Define a function called handleSliderChange that takes an event object as input
    setSliderValue(event.target.value);  // Set the slider value to the value of the slider input element

    // Update the corresponding filter value based on the active filter
    switch (activeFilter) {
      case "brightness":
        setBrightness(event.target.value);
        break;
      case "saturation":
        setSaturation(event.target.value);
        break;
      case "inversion":
        setInversion(event.target.value);
        break;
      case "blur":
        setBlur(event.target.value);
        break;
      case "contrast":
        setContrast(event.target.value);
        break;
      case "hue-rotate":
        setHueRotate(event.target.value);
        break;
      case "sepia":
        setSepia(event.target.value);
        break;
      case "opacity":
        setOpacity(event.target.value);
        break;
      default:
        setGrayscale(event.target.value);
    }
  };

  // Function to handle rotation and flipping
  const handleRotate = (option) => {  // Define a function called handleRotate that takes an option string as input
    // Update rotation angle or flip settings based on the selected option
    if (option === "left") {
      setRotate(rotate - 90);
    } else if (option === "right") {
      setRotate(rotate + 90);
    } else if (option === "horizontal") {
      setFlipHorizontal(flipHorizontal === 1 ? -1 : 1);
    } else {
      setFlipVertical(flipVertical === 1 ? -1 : 1);
    }
  };

  // JSX structure for the main component
  return (
    <div className={`container ${!previewImg ? "disable" : ""}`}>
      <h2>Image Editor</h2>
      <div className="wrapper">
        <div className="editor-panel">
          <div className="filter">
            <label className="title">Filters</label>

            {/* Display filter options as buttons */}
            <div className="options">
              {filterOptions.map((option) => (
                <button
                  key={option.id}
                  id={option.id}
                  className={activeFilter === option.id ? "active" : ""}
                  onClick={() => handleFilterClick(option)}
                >
                  {option.name}

                </button>

              ))}
              <h5 style={{ paddingTop: 4, paddingBottom: 4, color: '#6c757d' }}>more features commming soon ..</h5>
            </div>

            {/* Display slider for adjusting filter intensity */}
            <div className="slider">
              <div className="filter-info">
                <p className="name">{activeFilter}</p>
                <p className="value">{`${sliderValue}%`}</p>
              </div>
              <input
                type="range"
                min="0"
                max={
                  activeFilter === "brightness" || activeFilter === "saturation"
                    ? "200"
                    : "100"
                }
                value={sliderValue}
                onChange={handleSliderChange}
              />
            </div>
          </div>

          {/* Rotate and flip options */}
          <div className="rotate">
            <label className="title">Rotate & Flip</label>
            <div className="options">
              <button id="left" onClick={() => handleRotate("left")}>
                <i className="fa-solid fa-rotate-left"></i>
              </button>
              <button id="right" onClick={() => handleRotate("right")}>
                <i className="fa-solid fa-rotate-right"></i>
              </button>
              <button
                id="horizontal"
                onClick={() => handleRotate("horizontal")}
              >
                <i className="bx bx-reflect-vertical"></i>
              </button>
              <button id="vertical" onClick={() => handleRotate("vertical")}>
                <i className="bx bx-reflect-horizontal"></i>
              </button>
            </div>
          </div>
        </div>

        {/* Display preview of the edited image */}
        <div className="preview-img">
          {previewImg ? (
            <img
              src={URL.createObjectURL(previewImg)}
              alt="preview"
              ref={previewImgRef}
              onLoad={applyFilter}
            />
          ) : (
            <img src="image-placeholder.svg" alt="preview-img" />
          )}
        </div>
      </div>

      {/* Control buttons for resetting filters, choosing image, and saving image */}
      <div className="controls">
        <button className="reset-filter" onClick={resetFilter}>
          Reset Filters
        </button>
        <div className="row">
          <input
            type="file"
            className="file-input"
            accept="image/*"
            hidden
            ref={fileInputRef}
            onChange={loadImage}
          />
          <button
            className="choose-img"
            onClick={() => fileInputRef.current.click()}
          >
            Choose Image
          </button>
          <button onClick={saveImage} className="save-img">
            Save Image
          </button>
        </div>
      </div>
    </div>
  );
}

// Export the component as the default export
export default App;
