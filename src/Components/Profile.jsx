import React from "react";
import profileimg from '../images/profile.jpeg'

export const Profile = () => {
  return (
    <div className="profile-area">
      <div>
      <a
        href="https://neerajiitm.netlify.app/"
        target="_blank"
        rel="noopener noreferrer"
        title="Portfolio"
      >
        <img src={profileimg} alt="profile" />
      </a>
      </div>
      
      <a
        href="https://github.com/raajeverma"
        target="_blank"
        rel="noopener noreferrer"
        title="Github Profile"
      >
        <span className="icon">
          <i class="fa-brands fa-github"></i>
        </span>
      </a>
      <a
        href="https://www.linkedin.com/in/neeraj-verma-5ba086203/"
        target="_blank"
        rel="noopener noreferrer"
        title="LinkedIn Profile"
      >
        <span className="icon">
          <i class="fa-brands fa-linkedin"></i>
        </span>
      </a>
      <a
        href="mailto: vneeraj926@gmail.com"
        target="_blank"
        rel="noopener noreferrer"
        title="vneeraj926@gmail.com"
      >
        <span className="icon">
          <i class="fa-regular fa-envelope"></i>
        </span>
      </a>
    </div>
  );
};
