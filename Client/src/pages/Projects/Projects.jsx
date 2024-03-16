import { useEffect, useState } from "react";
import "./Projects.css";
import Modal from "react-modal";

Modal.setAppElement("#root");

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

import useToken from "../../hooks/useToken";

const Projects = () => {
  const [modalIsOpen, setIsOpen] = useState(false);

  const [projects, setProjects] = useState([]);

  const { token } = useToken();

  useEffect(() => {
    fetch("/api/enroll", {
      method: "GET",
      headers: {
        Authentication: `${token}`,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        console.log(response)
        if (response?.projects) {
          setProjects(response.projects);
        } else {
          alert("Something Wrong");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="Projects">
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={() => null}
        onRequestClose={() => setIsOpen(false)}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2>Hello</h2>
        <button onClick={() => setIsOpen(false)}>close</button>
        <div>I am a modal</div>
        <form>
          <input />
          <button>tab navigation</button>
          <button>stays</button>
          <button>inside</button>
          <button>the modal</button>
        </form>
      </Modal>
      <h1>Разгледай предложените идеи</h1>
      <p className="basic-p">
        Lorem ipsum dolor sit amet consectetur. Tempor ornare venenatis
        curabitur dui adipiscing. Facilisis id arcu posuere in eu bibendum
        tortor.Lorem ipsum dolor sit amet consectetur. Tempor ornare venenatis
        curabitur dui adipiscing. Facilisis id arcu posuere in eu bibendum
        tortor.
      </p>
      <p className="highlight-p">Или предложи своя.</p>
      <h2>Съвпадащи с вашите интересите</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "20px " }}>
        {projects.map((project) => {
            console.log(project)
          return (
            <div className="list-row" onClick={() => setIsOpen(true)}>
              <div className="left-column">
                <div className="list-div-match">
                  <p className="numbermatch">{project.percentage}%</p>
                  <p className="basic-p">match</p>
                </div>
                <div className="list-inner-divider"></div>
              </div>
              <div className="list-div-desc">
                <h3>{project.title}</h3>
                <p className="basic-p">{project.description}</p>
              </div>
              <div className="right-column">
                <div className="list-inner-divider"></div>
                <div className="list-div-skills">
                  {project.skills.map((skill) => {
                    return <div className="skillblock">{skill}</div>;
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Projects;
