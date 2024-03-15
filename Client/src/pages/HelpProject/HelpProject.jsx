import { useParams } from "react-router-dom";

import "./HelpProject.css";

const HelpProject = () => {
  const { projectID } = useParams();
  console.log(projectID);

  return (
    <div className="HelpProject">
      <div>
        <h3>Get started with...</h3>
        <h1>Идея за Хактуес - “айде за пица”!</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur. Tempor ornare venenatis
          curabitur dui adipiscing. Facilisis id arcu posuere in eu bibendum
          tortor.Lorem ipsum dolor sit amet consectetur. Tempor ornare venenatis
          curabitur dui adipiscing. Facilisis id arcu posuere in eu bibendum
          tortor.
        </p>
      </div>
      <div>
        <h2>
          На какво да се <span>обърне внимание</span>?
        </h2>
        <ol>
          <li>
            Lorem ipsum dolor sit amet consectetur. Tempor ornare venenatis
            curabitur dui adipiscing. Facilisis id arcu posuere in eu bibendum
            tortor.Lorem ipsum dolor sit amet consectetur. Tempor ornare
            venenatis curabitur dui adipiscing. Facilisis id arcu posuere in eu
            bibendum tortor.
          </li>
          <li>
            Lorem ipsum dolor sit amet consectetur. Tempor ornare venenatis
            curabitur dui adipiscing. Facilisis id arcu posuere in eu bibendum
            tortor.Lorem ipsum dolor sit amet consectetur. Tempor ornare
            venenatis curabitur dui adipiscing„
          </li>
          <li>
            Lorem ipsum dolor sit amet consectetur. Tempor ornare venenatis
            curabitur dui adipiscing. Facilisis id arcu posuere in eu bibendum
            tortor.Lorem ipsum dolor sit amet consectetur. Tempor ornare
            venenatis curabitur dui adipiscing. Facilisis i.
          </li>
          <li>
            Lorem ipsum dolor sit amet consectetur. Tempor ornare venenatis
            curabitur dui adipiscing. Facilisis id arcu posuere in eu bibendum
            tortor.Lorem ipsum dolor sit amet consectetur. Tempor ornare
            venenatis curabitur dui adipiscing. Facilisis id arcu posuere in eu
            bibendum tortor.
          </li>
        </ol>
      </div>
      <div>
        <h2>
          <span>Помощ при идеи</span> за...
        </h2>
        <form>
          <input type="text" />
          <button type="submit">Ask for help</button>
        </form>
        <p>
          Lorem ipsum dolor sit amet consectetur. Turpis venenatis iaculis
          imperdiet platea donec. Euismod ultricies vulputate porttitor
          porttitor dui enim. Faucibus facilisis et risus nec posuere. Pretium
          enim risus arcu suspendisse amet consequat. Bibendum curabitur diam
          nascetur volutpat imperdiet morbi pulvinar penatibus netus. Semper eu
          sit id nibh commodo et auctor. Ac sit sit tristique lectus at dolor eu
          eu consectetur. Tristique erat id mattis scelerisque.Lorem ipsum dolor
          sit amet consectetur. Turpis venenatis iaculis imperdiet platea donec.
          Euismod ultricies vulputate porttitor porttitor dui enim. Faucibus
          facilisis et risus nec posuere. Pretium enim risus arcu suspendisse
          amet consequat.
        </p>
      </div>
    </div>
  );
};

export default HelpProject;
