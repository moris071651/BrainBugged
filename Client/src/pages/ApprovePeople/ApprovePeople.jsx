import { useParams } from "react-router-dom";
import useToken from "../../hooks/useToken";


import "./ApprovePeople.css";
import { useEffect, useState } from "react";

const ApprovePeople = () => {
  const { projectID } = useParams();

  const [profiles, setProfiles] = useState([]);

  const { token } = useToken();

  useEffect(() => {
    fetch("/api/applicants", {
      method: "GET",
      headers: {
        Title: projectID,
        Authentication: `${token}`,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        if (response?.applicants) {
          setProfiles([...response.applicants]);
        } else {
          alert("Already exits such name");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="ApprovePeople">
      <div>
        <h1>{projectID}</h1>
        <div>
          {profiles.map((profile) => {
            <div>
              <h2>{profile.username}</h2>
              <p>{profile.description}</p>
              <ul>
                {profile.skills.map((skill) => {
                  <li>
                    <img src="/src/assets/tick.png" alt="" />
                    {skill}
                  </li>
                })}
              </ul>
              <div>
                <button>Откажи</button>
                <button>Приеми</button>
              </div>
            </div>;
          })}
        </div>
      </div>
      <div>
        <h2>
          Време ли е за <span>следваща стъпка</span>?
        </h2>
        <p>
          Lorem ipsum dolor sit amet consectetur. Tempor ornare venenatis
          curabitur dui adipiscing. Facilisis id arcu posuere in eu bibendum
          tortor.Lorem ipsum dolor sit amet consectetur. Tempor ornare venenatis
          curabitur dui adipiscing. Facilisis id arcu posuere in eu bibendum
          tortor.
        </p>
      </div>
    </div>
  );
};

export default ApprovePeople;
