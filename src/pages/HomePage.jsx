import Carousel from "../components/Carousel";
import style from "../styles/HomePage.module.css";
import image1 from "../assets/carousel/carousel1.png";
import image2 from "../assets/carousel/carousel2.png";
import image3 from "../assets/carousel/carousel3.png";
import image4 from "../assets/carousel/carousel4.png";
import image5 from "../assets/carousel/carousel5.png";
import image6 from "../assets/carousel/carousel6.png";

const images = [image1, image2, image3, image4, image5, image6];

function HomePage() {
  return (
    <div className={style.homePage}>
      <h1 className={style.title}>
        LEVEL UP YOUR LIFE
        <br />
        WITH WORKOUTS!
      </h1>
      <Carousel images={images} interval={3500} />
    </div>
  );
}

export default HomePage;
