import React, { useState, useRef } from 'react';
import './ImageGenerator.css';
import default_image from '../Assets/default_image.svg';

const Image = () => {
  const [imageUrl, setImageUrl] = useState("/");
  const inputRef = useRef(null);

  const imageGenerator = async () => {
    if (inputRef.current.value.trim() === "") {
      return;
    }

    try {
      const response = await fetch("https://api.openai.com/v1/images/generations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer KEYYY `, // Replace with a secure method for your actual API key
        },
        body: JSON.stringify({
          prompt: inputRef.current.value,
          n: 1,
          size: "512x512",
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error response:", errorData);
        throw new Error("Failed to generate image: " + errorData.error.message);
      }

      const data = await response.json();
      setImageUrl(data.data[0].url); // Set the image URL with the generated image

    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <div className="ai-image-generator">
      <div className="header">
        AI Image <span>Generator</span>
      </div>
      <div className="img-loading">
        <div className="image">
          <img src={imageUrl === "/" ? default_image : imageUrl} alt="Generated content" />
        </div>
      </div>
      <div className="search-box">
        <input
          type="text"
          ref={inputRef}
          className="search-input"
          placeholder="Describe What You Want To See"
        />
        <div className="generate-btn" onClick={imageGenerator}>Generate</div>
      </div>
    </div>
  );
};

export default Image;
