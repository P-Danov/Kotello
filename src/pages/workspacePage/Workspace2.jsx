import { useContext, useState } from "react";
import ApiContext from "../../context/ApiContext";
import "./workspace.css";

const Workspace = () => {
  const { workspace, setWorkspace } = useContext(ApiContext);
  const { loggedInName, setLoggedInName } = useContext(ApiContext);
  const [workspaceStatus, setWorkspaceStatus] = useState("open");
  const [projectName, setProjectName] = useState("");
  const [projectType, setProjectType] = useState("select");
  const [writeDescription, setWriteDescription] = useState("");
  const [projectNameOk, setProjectNameOk] = useState(false);
  const [projectTypeOk, setProjectTypeOk] = useState(false);

  const isProjectNameDuplicate = (users, usernameToCheck) => {
    console.log(users.some((user) => user.project === usernameToCheck));
    return users.some((user) => user.project === usernameToCheck);
  };

  const handleSelectChange = (e) => {
    setProjectType(e.target.value);
    let value = e.target.value;
    console.log(value);
    if (value != "select") {
      console.log("on");
      setProjectTypeOk(true);
    } else {
      console.log("off");
      setProjectTypeOk(false);
    }
  };

  const handleNameOk = (e) => {
    setProjectName(e.target.value);
    let value = e.target.value;
    console.log(value);
    console.log(projectNameOk, projectTypeOk);
    if (value.length >= 1 && value.length <= 16 && !value.includes(" ")) {
      setProjectNameOk(true);
    } else {
      setProjectNameOk(false);
    }
  };

  const handleClick = (e) => {
    e.preventDefault();

    console.log(projectNameOk, projectTypeOk, projectType);
    if (
      projectNameOk &&
      projectTypeOk &&
      !isProjectNameDuplicate(workspace, projectName)
    ) {
      setProjectName(e.target.value);

      const newWorkspace = {
        owner: loggedInName,
        project: projectName,
        type: projectType,
        description: writeDescription,
      };
      setWorkspace((prevWorkspace) => [...prevWorkspace, newWorkspace]);
      setWorkspaceStatus("created");
      console.log(workspace);
      setProjectNameOk("false");
      setProjectTypeOk("false");
      setProjectName("");
      setProjectType("select");
      setWriteDescription("");
      document.querySelector(".workspaceForm").reset();
    } else {
      console.log("not valid");
    }
  };

  const workspaceList = workspace
    .filter((workspaces) => workspaces.owner === loggedInName)
    .map((workspaces, i) => (
      <button className="workspaceBtn" key={i}>
        {workspaces.project}
      </button>
    ));

  return (
    <div className="createWorkspace">
      <div
        className="workspaceRead"
        style={
          workspaceStatus === "open" ? { display: "flex" } : { display: "none" }
        }
      >
        <button
          className="createWorkspaceBtn"
          onClick={() => setWorkspaceStatus("write")}
        >
          CREATE WORKSPACE
        </button>

        {workspaceList}
      </div>

      <div
        className="workspaceWrite"
        style={
          workspaceStatus === "write"
            ? { display: "block" }
            : { display: "none" }
        }
      >
        <div className="containerWrite">
          <h4 style={{ margin: "4px 0px 20px 0px" }}>
            Stworz Przestrzeń Roboczą
          </h4>
          <button
            className="createCancelBtn"
            onClick={() => setWorkspaceStatus("open")}
          >
            X
          </button>
        </div>

        <form className="workspaceForm" onSubmit={handleClick}>
          <label htmlFor="projectNameWrite">Nazwa Przestrzeni Roboczej</label>
          <input
            className="projectNameWrite"
            value={projectName}
            onChange={handleNameOk}
            type="text"
            required
          />

          <label htmlFor="projectTypeWrite">Typ Przestrzeni Roboczej</label>
          <select
            name="select"
            className="projectTypeWrite"
            onChange={handleSelectChange}
            required
          >
            <option value="select"></option>
            <option value="learning">Edukacja</option>
            <option value="itEngineering">Inżynieria IT</option>
            <option value="marketing">Marketing</option>
            <option value="buisness">Firma</option>
            <option value="Other">Inne</option>
          </select>

          <label htmlFor="projectDescriptionWrite">Opis (opcjonalne)</label>
          <textarea className="projectDescriptionWrite" type="text" />
        </form>

        <div className="createWorkspaceContainer">
          <button className="createWorkspaceWrite" onClick={handleClick}>
            Create
          </button>
        </div>
      </div>

      <div
        className="workspaceWrite"
        style={
          workspaceStatus === "created"
            ? { display: "flex" }
            : { display: "none" }
        }
      >
        <button
          className="createCancelBtn"
          onClick={() => setWorkspaceStatus("open")}
        >
          X
        </button>
        <h3 className="workspaceCreatedText">Workspace Created</h3>
      </div>
    </div>
  );
};
