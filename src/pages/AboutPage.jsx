import styles from '../styles/AboutPage.module.css';

import rui from '../assets/rui.png';
import diego from '../assets/diego.png';
import kivanc from '../assets/kivanc.png';

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
        Welcome to Poketeam—your ultimate Pokémon companion! Discover, compare, and create your
        dream team with ease on our intuitive platform. Dive into our extensive database to explore
        detailed stats on all Pokémon, from classics to legendaries. Whether you're a seasoned
        trainer or just starting your journey, Poketeam equips you with the tools to craft your
        perfect lineup. Join our vibrant community, share strategies, and embark on endless
        adventures. Start building your ultimate team today and unleash the power of your favorite
        Pokémon with Poketeam!
      </p>

      <h2>Team Members</h2>
      <p>
        We are a team of developers who love to code. Ironhack is our bootcamp. We are based in
        Germany. We hope to see you in other projects.
      </p>

      <div className={styles.teamMembers}>
        <TeamMember
          name='Rui Folgado'
          role='Developer'
          github='https://github.com/'
          linkedin='https://www.linkedin.com/in/rui-folgado/'
          imageUrl={rui}
        />

        <TeamMember
          name='Diego Lima'
          role='Developer'
          github='https://github.com/kingblocks'
          linkedin='https://linkedin.com/in/diegolima'
          imageUrl={diego}
        />

        <TeamMember
          name='Kivanc Keskinbora'
          role='Developer'
          github='https://github.com/kingblocks'
          linkedin='https://linkedin.com/in/kivanckeskinbora'
          imageUrl={kivanc}
        />
      </div>
    </div>
  );
};

export default AboutPage;