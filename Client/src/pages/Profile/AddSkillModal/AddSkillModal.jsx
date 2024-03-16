import { useEffect, useState } from 'react';
import CreatableSelect from 'react-select/creatable';
import Modal from 'react-modal';
import "./AddSkillModal.css";
import useToken from '../../../hooks/useToken';

Modal.setAppElement('#root');

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        height: "550px",
        width: "500px",
    },
};

const AddSkillModal = ({ onClose, onSave }) => {
    const [existingSkills, setExistingSkills] = useState([]);

    const { token } = useToken();
    const [skill, setSkill] = useState("");

    const [skills, setSkills] = useState([]);

    useEffect(() => {
        fetch("/api/all_skills", {
            method: "GET",
            headers: {
              Authentication: `${token}`,
            },
          })
            .then((response) => {
              return response.json();
            })
            .then((response) => {
                if(response.skills) {
                    setExistingSkills(response.skills.map((s => ({ value: s, label: s}))))
                }
            //   if (response?.projects) {
            //     setProjects(response.projects);
            //   } else {
            //     alert("Something Wrong");
            //   }
            })
            .catch((error) => {
              console.log(error);
            });
    }, []);

    return (
        <div className='add-skill-modal'>
            <Modal
                isOpen={true}
                onAfterOpen={() => null}
                onRequestClose={() => onClose()}
                style={customStyles}
                contentLabel="Add skill"
            >
                <h2>Add new skill</h2>
                <div>
                    <CreatableSelect 
                        closeMenuOnSelect={false}
                        onChange={(newS) => setSkills(newS.map(s => s.value))}
                        isMulti
                        options={existingSkills} />
                </div>
                <div className='save-new-skills-modal-footer'>
                    <button className="purple-button-but" onClick={() => { onSave(skills); onClose(); }}>Save</button>
                    <button className="purple-button-but"  onClick={() => onClose()}>Cancel</button>
                </div>

            </Modal>
        </div>
    );
};

export default AddSkillModal;