import { useEffect, useState } from "react";
import "./Profile.css";
import useToken from "../../hooks/useToken";

const Profile = () => {
  const [profile, setProfile] = useState({name: '', username: '', email: ''});
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);

  const { token } = useToken();

  useEffect(() => {
    fetch("/api/projects", {
      method: "GET",
      headers: {
        Authentication: `${token}`,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        if (response?.projects) {
          setProjects(response.projects);
        } else {
          alert("Something Wrong");
        }
      })
      .catch((error) => {
        console.log(error);
      });

    fetch("/api/projects", {
      method: "GET",
      headers: {
        Authentication: `${token}`,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        if (response?.projects) {
          setProjects(response.projects);
        } else {
          alert("Something Wrong");
        }
      })
      .catch((error) => {
        console.log(error);
      });

    fetch("/api/skills", {
      method: "GET",
      headers: {
        Authentication: `${token}`,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        if (response?.skills) {
          setSkills(response.skills);
        } else {
          alert("Something Wrong");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="Profile">
      <div>
        <div>
          <img src="/src/assets/profile.svg" alt="Profile Picture" />
          <h1>{profile.name}</h1>
          <p>
            <span>#</span>
            {profile.username}
          </p>
          <p>
            <span>@</span>
            {profile.email}
          </p>
        </div>
        <div>
          <h2>Skills</h2>
          <div>
            {skills.map((skill) => {
              return <p>{skill}</p>;
            })}
            <button>+</button>
          </div>
        </div>
      </div>
      <div>
        <h1>Projects enrolled in</h1>
        <div>
          {projects.map((title) => {
            return (
              <a>
                <h3>
                  <img src="/src/assets/triangle.png" />
                  {title}
                </h3>
                <p>Click to view more information</p>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Profile;
