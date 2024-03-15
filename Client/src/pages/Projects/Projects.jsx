import { useState } from "react";
import "./Projects.css";
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

const Projects = () => {
    const [modalIsOpen, setIsOpen] = useState(false);

    return (
        <>
            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={() => null}
                onRequestClose={() => setIsOpen(false)}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <div class="module-popup-div">
                <div onClick={() => setIsOpen(false)} class="module-cross"><img src="/src/assets/cross.svg" alt="" width={"20px"}/></div>
                <h2>Идея за Хактуес - “айде за пица”!</h2>
                <div class="module-popup-left">
                    <p>Lorem ipsum dolor sit amet consectetur. Amet sed quis eget risus fermentum maecenas aliquet. Id curabitur est amet amet posuere porta dolor. Eget vel suspendisse consectetur rhoncus tortor consequat. Interdum mi pretium mauris placerat turpis id sed malesuada non. Sit eget lorem magnis.</p>
                    <p>Lorem ipsum dolor sit amet consectetur. Leo molestie platea nec sit suspendisse euismod. Mi rhoncus nibh venenatis morbi quisque dolor iaculis ultrices. Massa massa id diam. Leo molestie platea nec sit suspendisse euismod. Mi rhoncus nibh ve.</p>
                    <h3>Hobbies</h3>
                    <div class="hobbies-list-div">
                        <div class="skillblock haveit">Skill allala</div>
                        <div class="skillblock">Skill allala</div>
                        <div class="skillblock">Skill allala</div>
                        <div class="skillblock">Skill allala</div>
                        <div class="skillblock haveit">Skill</div>
                    </div>
                </div>    
                <div class="module-popup-right">
                    <img src="/src/assets/person.svg" className="imageperson" alt=""/>
                    <h3>About team</h3>
                    <p>Lorem ipsum dolor sit amet consectetur. Leo molestie platea nec sit suspendisse euismod. Mi rhoncus nibh venenatis.tur. Leo molestie platea nec sit suspendisse euismod. Mi rhoncus nibh venenatis.tur. Leo molestie platea nec sit suspendisse euismod.</p>
                    <div class="purple-button-div">
                        <button class="purple-button-but">Apply for project</button>
                    </div>
                </div>
            </div>

            </Modal>
            <div className="Projects">
            <img src="/src/assets/ball.svg" alt="" className="imgball"/>
            <h1>Разгледай предложените идеи</h1>
            <p className="basic-p">The projects below are suggested to you based on your hobbies and past projects you have participated in. Soon you will be able to search for a project by name, but for now this feature is under development.</p>
            <p className="highlight-p Inter">Or suggest your idea.</p>
            <h2>According to your skills</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "20px " }}>

                <div className="list-row" onClick={() => setIsOpen(true)}>
                    <div className="left-column">
                        <div className="list-div-match">
                            <p className="numbermatch">95%</p>
                            <p className="basic-p">match</p>
                        </div>
                        <div className="list-inner-divider"></div>
                    </div>
                    <div className="list-div-desc">
                        <h3>Идея за Хактуес - “айде за пица”!</h3>
                        <p className="basic-p">Lorem ipsum dolor sit ame wqr klqwj poqwj fopej roq wjrpo jqwp qwj opqw pojqwpj pqowj
                            t consectetur...</p>
                    </div>
                    <div className="right-column">
                        <div className="list-inner-divider"></div>
                        <div className="list-div-skills">
                            <div className="skillblock haveit">Skill allala</div>
                            <div className="skillblock">Skill allala</div>
                            <div className="skillblock">Skill allala</div>
                            <div className="skillblock">Skill allala</div>
                            <div className="skillblock haveit">Skill</div>
                            <div className="skillblock">Skill allala</div>
                            <div className="skillblock">Skill allala</div>
                            <div className="skillblock">Skill allala</div>

                        </div>
                    </div>

                </div>

                <div className="list-row">
                    <div className="left-column">
                        <div className="list-div-match">
                            <p className="numbermatch">95%</p>
                            <p className="basic-p">match</p>
                        </div>
                        <div className="list-inner-divider"></div>
                    </div>
                    <div className="list-div-desc">
                        <h3>Идея за Хактуес - “айде за пица”!</h3>
                        <p className="basic-p">Lorem ip qwr wq rw rqwrqw rrqwr wq  dolor sit ame wqr klqwj poqwj fopej roq wjrpo jqwp qwj opqw pojqwpj pqowj
                            t consectetur...</p>
                    </div>
                    <div className="right-column">
                        <div className="list-inner-divider"></div>
                        <div className="list-div-skills"></div>
                    </div>

                </div>
            </div>
            </div>
        </>
    );
};

export default Projects;