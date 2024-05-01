//import styles from '../styles/AboutPage.module.css';

import rui from '../assets/rui.png';
import diego from '../assets/diego.png';
import kivanc from '../assets/Kivanc.png';

const TeamMember = ({ name, role, github, linkedin, imageUrl }) => (
  <div className='team-member'>
    <div className='member-info'>
      <h3>{name}</h3>
      <p>
        <strong>Role:</strong> {role}
      </p>
      <p>
        <a href={github} target='_blank' rel='noopener noreferrer'>
          GitHub
        </a>{' '}
        |{' '}
        <a href={linkedin} target='_blank' rel='noopener noreferrer'>
          LinkedIn
        </a>
      </p>
    </div>
    <div>
      <img src={imageUrl} alt='Team member photo' className={styles.memberImage} />
    </div>
  </div>
);

const AboutPage = () => {
  return (
    <div className={styles.aboutPage}>
      <h1>About Us</h1>
      <p>
      Welcome to our Fitness tracker—your ultimate fitness companion! Track, manage, and optimize your fitness journey with ease on our intuitive platform. Dive into our online exercise database to explore detailed descriptions and instructions on a wide range of workouts, from bodyweight to weighted strength training. Whether you're a seasoned athlete or just starting your fitness journey, Fitness tracker equips you with the tools to set and achieve your goals. Join our vibrant community, share workout tips, and embark on endless fitness adventures. Start building your personalized training program today and unleash the power of your potential with fitness tracker! 🏋️‍♂️💪
      </p>

      <h2>Team Members</h2>
      <p>
        We are a team of developers who love to code. Ironhack is our bootcamp. We are a small group of 3. We hope to see you in other projects.
      </p>

      <div className={styles.teamMembers}>
        <TeamMember
          name='Rui Folgado'
          role='Developer'
          github='https://github.com/Folgad0'
          linkedin='https://www.linkedin.com/in/rui-folgado/'
          imageUrl={rui}
        />

        <TeamMember
          name='Diego Fernandes'
          role='Developer'
          github='https://github.com/dieegoolimaa'
          linkedin='https://www.linkedin.com/in/diego-fernandes-20/?trk=contact-info'
          imageUrl={diego}
        />

        <TeamMember
          name='Kivanc Keskinbora'
          role='Developer'
          github='https://github.com/'
          linkedin='https://linkedin.com/in/kivanckeskinbora'
          imageUrl={kivanc}
        />
      </div>
    </div>
  );
};

export default AboutPage;