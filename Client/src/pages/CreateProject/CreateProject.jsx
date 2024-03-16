import { useState } from "react";

import useToken from "../../hooks/useToken";

import "./CreateProject.css";

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

const CreateProject = () => {
  const [projectName, setProjectName] = useState("");

  const [projectDesc, setProjectDesc] = useState("");
  const [helpDesc, setHelpDesc] = useState("");

  const { token } = useToken();

  const [modalIsOpen, setIsOpen] = useState(false);

  const [newSkill, setNewSkill] = useState("");
  const [skills, setSkills] = useState([]);

  const sendData = (e) => {
    e.preventDefault();

    fetch("/api/projects", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authentication: `${token}`,
      },
      body: JSON.stringify({
        title: projectName,
        skills: skills,
      }),
    })
      .then((response) => {
        return response.json()
      })
      .then((response) => {
        console.log(response?.created)
        if (response?.created == true) {
          location.href = '/approve/' + projectName
        }
        else {
          alert('Already exits such name')
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={() => null}
        onRequestClose={() => {
          setIsOpen(false);
          if (newSkill !== "") {
            setSkills([...skills, newSkill]);
            setNewSkill("");
          }
        }}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div onClick={() => {
          setIsOpen(false);
          if (newSkill !== "") {
            setSkills([...skills, newSkill]);
            setNewSkill("");
          }}}>
        </div>
        <input
          value={newSkill}
          onChange={(e) => {
            setNewSkill(e.target.value);
          }}
          type="text"
        />
        <p>Category</p>
      </Modal>
      <form className="CreateProject" onSubmit={sendData}>
        <h1>Creating a project</h1>
        <input
          className="inputfocus"
          type="text"
          value={projectName}
          onChange={(e) => {
            setProjectName(e.target.value);
          }}
          placeholder="Project Name"
        />
        <div>
          <div>
            <textarea
              id="ProjectDesc"
              value={projectDesc}
              onChange={(e) => {
                setProjectDesc(e.target.value);
              }}
              placeholder="Project Description"
              className="inputfocus"
            ></textarea>
            <textarea
              id="HelpDesc"
              value={helpDesc}
              onChange={(e) => {
                setHelpDesc(e.target.value);
              }}
              placeholder="Team Description"
              className="inputfocus"
            ></textarea>
          </div>
          <div>
            <h2>What skills are you searching for?</h2>
            <div className="SkillSet">
              {skills.map((skill) => {
                return <p>{skill}</p>;
              })}
              <div onClick={() => setIsOpen(true)} className="pointer">
                +
              </div>
            </div>
            <div className="ButtonHighlight">
              <button type="submit">Create project</button>
            </div>
          </div>
        </div>
      </form>
    </>
    );
};

export default CreateProject;
