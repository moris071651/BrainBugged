import "./CreateProject.css";

const CreateProject = () => {
  return (
    <form className="CreateProject">
      <h1>Creating a project</h1>
      <input type="text" placeholder="Име на проект"/>
      <div>
        <div>
          <textarea
            id="ProjectDesc"
            placeholder="Описание на проекта"
          ></textarea>
          <textarea
            id="HelpDesc"
            placeholder="Описание на екипа и/или какви хора бихте искали да видите в него"
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
          <button>Create project</button>
        </div>
      </div>
    </form>
  );
};

export default CreateProject;
