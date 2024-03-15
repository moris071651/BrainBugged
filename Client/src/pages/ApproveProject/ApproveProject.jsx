import "./ApproveProject.css";

const ApproveProject = () => {
  return (
    <form className="ApproveProject">
      <div>
        <h3>Application for project</h3>
        <h1>Идея за Хактуес - “айде за пица”!</h1>
      </div>
      <div>
        <div>
          <textarea
            id="ProjectDesc"
            placeholder="Защо искате да участвате? С какво бихте допринесли на екипа?"
          ></textarea>
        </div>
        <div>
          <h2>Какви скилове търсите?</h2>
          <div>
            <p>App development</p>
            <p>Figma</p>
            <p>Pizza eating</p>
            <p>Webflow</p>
            <p>Figma</p>
            <button>+</button>
          </div>
          <button>Apply for project</button>
        </div>
      </div>
    </form>
  );
};

export default ApproveProject;
