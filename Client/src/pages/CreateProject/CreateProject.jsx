import { useState } from "react";

import useToken from "../../hooks/useToken";

import "./CreateProject.css";

import Modal from 'react-modal';

Modal.setAppElement('#root');
const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

const CreateProject = () => {
  const [projectName, setProjectName] = useState("");

  const [projectDesc, setProjectDesc] = useState("");
  const [helpDesc, setHelpDesc] = useState("");

  const { token } = useToken();

  const [modalIsOpen, setIsOpen] = useState(false);


  const sendData = (e) => {
    e.preventDefault();

    fetch("/api/projects", {
      method: "POST",
      headers: {
        'Content-Type': "application/json",
        'Authentication': `${token}`,
      },
      body: JSON.stringify({
        title: projectName,
        skills: ["Hello", "Getter", "Setter"],
      }),
    })
      .then((response) => {
        console.log(response);
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
    <form className="CreateProject" onSubmit={sendData}>
      <h1>Creating a project</h1>
      <input
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
          ></textarea>
          <textarea
            id="HelpDesc"
            value={helpDesc}
            onChange={(e) => {
              setHelpDesc(e.target.value);
            }}
            placeholder="Team Description"
          ></textarea>
        </div>
        <div>
          <h2>Skills Needed</h2>
          <div>
            <p>App development</p>
            <p>Figma</p>
            <p>Pizza eating</p>
            <p>Webflow</p>
            <p>Figma</p>
            <div onClick={() => setIsOpen(true)}>+</div>
          </div>
          <button type="submit">Create project</button>
        </div>
      </div>
    </form>
    </>
  );
};

export default CreateProject;
