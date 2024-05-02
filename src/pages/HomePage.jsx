import React, { useEffect, useRef, useState } from "react";
import YouTube from "react-youtube";
import "../styles/HomePage.css";

function HomePage() {
  return (
    <div className="home-page">
      <iframe
        width="100%"
        height="628"
        src="https://www.youtube.com/embed/82ErtoI8uy8?autoplay=1&mute=1&loop=1"
        frameborder="0"
        allow="autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
    </div>
  );
}

export default HomePage;
