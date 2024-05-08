import { useState, useEffect } from "react";
import style from "../styles/Carousel.module.css";

const Carousel = ({ images, interval = 3000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [intervalId, setIntervalId] = useState(null);

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % images.length;
    setCurrentIndex(nextIndex);
  };

  useEffect(() => {
    const newIntervalId = setInterval(() => {
      handleNext();
    }, interval);
    setIntervalId(newIntervalId);

    return () => clearInterval(intervalId);
  }, [interval, currentIndex]);

  return (
    <div className={style.carousel}>
      <img src={images[currentIndex]} alt="Carousel Image" />
    </div>
  );
};

export default Carousel;
