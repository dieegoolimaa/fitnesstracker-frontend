import style from "../styles/TeamMember.module.css";

const TeamMember = ({ name, role, github, linkedin, image }) => {
  return (
    <div className={style.memberInfo}>
      <div className={style.imageContainer}>
        <img className={style.memberImage} src={image} />
      </div>
      <div className={style.memberDetails}>
        <h3 className={style.memberName}>{name}</h3>
        <p>
          <strong>Role:</strong> {role}
        </p>
      </div>

      <p>
        <a href={github} target="_blank" rel="noopener noreferrer">
          GitHub
        </a>{" "}
        |{" "}
        <a href={linkedin} target="_blank" rel="noopener noreferrer">
          LinkedIn
        </a>
      </p>
    </div>
  );
};

export default TeamMember;
