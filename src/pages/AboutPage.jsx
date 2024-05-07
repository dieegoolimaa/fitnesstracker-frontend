import TeamMember from "../components/TeamMember.jsx";
import kivanc from "../assets/kivanc.png";
import rui from "../assets/rui.png";
import diego from "../assets/diego.png";
import style from "../styles/AboutPage.module.css";

const AboutPage = () => {
  return (
    <div className={style.aboutPage}>
      <h1 className={style.title}>About Us</h1>
      <p>
        Welcome to Fitness Tracker, your ultimate fitness companion! Track,
        analyze, and optimize your fitness journey with ease on our intuitive
        platform. Dive into our extensive exercise database to explore detailed
        descriptions and instructions on a wide range of workouts, from cardio
        to strength training. Whether you are a seasoned athlete or just
        starting your fitness journey, Fitness Tracker equips you with the tools
        to achieve your goals. Join our vibrant community, share workout tips,
        and embark on endless fitness adventures. Start building your
        personalized training program today and unleash the power of your
        potential with Fitness Tracker! 🏋️‍♂️💪
      </p>
      <h1 className={style.title}>Team Members</h1>
      <p>
        We are a team of developers who love to code. Ironhack is our bootcamp.
        We are based in Germany. We hope to see you in other projects.
      </p>

      <div className={style.teamMembers}>
        <TeamMember
          image={rui}
          name="Rui Folgado"
          role="Developer"
          github="https://github.com/Folgad0"
          linkedin="https://www.linkedin.com/in/rui-folgado/"
        />

        <TeamMember
          name="Diego Fernandes"
          role="Developer"
          github="https://github.com/dieegoolimaa"
          linkedin="https://www.linkedin.com/in/diego-fernandes-20/"
          image={diego}
        />

        <TeamMember
          name="Kivanc Keskinbora"
          role="Developer"
          github="https://github.com/kingblocks"
          linkedin="https://linkedin.com/in/kivanckeskinbora"
          image={kivanc}
        />
      </div>
    </div>
  );
};

export default AboutPage;
