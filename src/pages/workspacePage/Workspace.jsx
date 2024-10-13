import { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import ApiContext from "../../context/ApiContext";
import "./workspace.css";

const Workspace = () => {
  const {
    workspace,
    setWorkspace,
    polish,
    message,
    setMessage,
    messageText,
    setMessageText,
    setQuestionWindow,
    setQuestionWindowText,
    setQuestionWindowVariable,
    loggedInName,
    loggedIn, 
    loggedInGuest, 
    setOpenArrayEditOptions,
    setSidebar,
  } = useContext(ApiContext);


  const [workspaceStatus, setWorkspaceStatus] = useState("open");
  const [editWorkspace, setEditWorkspace] = useState(false)
  const [projectName, setProjectName] = useState("");
  const [projectType, setProjectType] = useState("select");
  const [writeDescription, setWriteDescription] = useState("");
  const [projectNameOk, setProjectNameOk] = useState(false);
  const [projectTypeOk, setProjectTypeOk] = useState(false);
  const [workspaceCreated, setWorkspaceCreated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (workspaceCreated && workspace.length > 0) {
      setSidebar(true);
      setWorkspaceCreated(false);
    }
  }, [workspace, workspaceCreated, setSidebar]);

  const isProjectNameDuplicate = (workspace, projectName, currentWorkspaceId) => {
    return workspace.some((workspace) => 
      workspace.project === projectName && workspace.id !== currentWorkspaceId
    );
  };

  const handleSelectChange = (e) => {
    const value = e.target.value
    setProjectType(value);
  };

  const handleNameOk = (e) => {
    const value = e.target.value
    setProjectName(value);
  };
  

  const handleClick = (e) => {
    e.preventDefault();
    const currentWorkspaceId = editWorkspace ? workspace[0].id : undefined;
    const isProjectNameValid = 
      projectName.length >= 1 &&
      projectName.length <= 16 &&
      !projectName.includes(" ")&&
      !isProjectNameDuplicate(workspace, projectName, currentWorkspaceId); 

    const isProjectTypeValid = projectType !== "select";

    if (     
      isProjectNameValid && isProjectTypeValid
    ) {
      if(editWorkspace){
        const updatedWorkspace = workspace.map((workspaces) =>
          workspaces.id === currentWorkspaceId
            ? { ...workspaces, project: projectName, type: projectType, description: writeDescription }
            : workspaces
        );
        setWorkspace(updatedWorkspace);
        setWorkspaceStatus("created");
        setProjectNameOk(false);
        setProjectTypeOk(false);
        setProjectName("");
        setProjectType("select");
        setWriteDescription("");
        
      }else if(!editWorkspace){
      const newWorkspace = {
        owner: loggedInName,
        id: Date.now(),
        project: projectName,
        type: projectType,
        description: writeDescription,
        order: workspace.length + 1,
        arrays: [{ arrayName: polish?"Tablica 1":"Array 1", id: Date.now(),order:1 }],
      };
      const updatedWorkspace = [
        newWorkspace,
        ...workspace.filter((item) => item.project !== projectName),
      ];

      setWorkspace(updatedWorkspace);
      setWorkspaceCreated(true)
      setWorkspaceStatus("created");
      setProjectNameOk(false);
      setProjectTypeOk(false);
      setProjectName("");
      setProjectType("select");
      setWriteDescription("");
      navigate('/')
    }} else {
      
      if(!isProjectNameValid){
        setMessage(true);
        if(projectName.length < 1)
        setMessageText(prevState => ({
          ...prevState, 
          text: polish?"Musi mieć wiecej niż 1 znak.":"Must have at least one letter.", 
        }))
        else if(projectName.length >= 16)
          setMessageText(prevState => ({
            ...prevState, 
            text: polish?"Nazwa musi mieć mniej niż 17 znaków.":"Name must be less than 17 characters.", 
          }))
        else if(projectName.includes(" "))
          setMessageText(prevState => ({
            ...prevState, 
            text: polish?"Nazwa nie może zawierać spacji.":"The name cannot contain spaces.", 
          }))
        else if(isProjectNameDuplicate(workspace, projectName, currentWorkspaceId))
          setMessageText(prevState => ({
            ...prevState, 
            text: polish?"Nazwy Workspace nie moga sie powtarzać.":"Workspace names cannot be repeated.", 
          }))
      }else if(!isProjectTypeValid){
        setMessage(true);
        setMessageText(prevState => ({
          ...prevState, 
          text: polish?"Nieprawidłowy Typ.":"Invalid Type.", 
        }))
      }else if(isProjectNameDuplicate(workspace, projectName)){
        setMessage(true);
        setMessageText(prevState => ({
          ...prevState, 
          text: polish?"Nazwa już Istnieje.":"Name already exists.", 
        }))
      }
    }
  };

  const deleteWorkspace = () => {
    setQuestionWindowText([
      polish?{ 
      mainText: "Czy chcesz skasować ten workspace ?", 
      option1: "Tak", 
      option2: "Nie" 
    }:{
      mainText: "Are you sure you want to delete this workspace ?", 
      option1: "Yes", 
      option2: "No" 
  }]);
    setQuestionWindow(true);

    const handleConfirm = (decision) => {
      if (decision) {
    const currentWorkspaceId = workspace[0]?.id;
    
    const updatedWorkspace = workspace.filter((workspaces) => workspaces.id !== currentWorkspaceId);
  
    setWorkspace(updatedWorkspace);
        
    setEditWorkspace(false);
    setProjectName("");
    setProjectType("select");
    setWriteDescription("");
    setWorkspaceStatus("open");
    navigate('/')
      }
      setQuestionWindow(false); 
    };
    setQuestionWindowVariable(() => handleConfirm);
  };

  const activateWorkspace = (index) => {
    
      const selectedWorkspace = workspace[index];
      if (selectedWorkspace && selectedWorkspace.arrays.length > 0) {
        const firstArray = selectedWorkspace.arrays[0];
          
      navigate('/arrays', {
        state: {
          workspaceId: selectedWorkspace.id,
          arrayId: firstArray.id,
          arrayName: firstArray.arrayName,
        },
      }

    )}else{
      navigate('/')
    }

    const updatedWorkspace = [
      selectedWorkspace,
      ...workspace.filter((item, i) => i !== index),
    ];
    setWorkspace(updatedWorkspace);
    setOpenArrayEditOptions(false)
  };


  const workspaceList = workspace
    .filter((workspaces) => workspaces.owner === loggedInName)
    .map((workspaces, i) => (
      <button
        className="workspaceBtn"
        key={i}
        onClick={() => activateWorkspace(i)}
        style={{
          backgroundColor: i === 0 ? "#fce2b1" : "white",
          marginBottom: i === 0 ? "20px" : "7px",
          border: i === 0 ? "2px solid black" : "1px solid black",
          fontWeight: i===0 ? "bold" : "normal"
        }}
      >
         
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
        {workspace[0]?.project?
                <button
                className="createWorkspaceBtn"
                onClick={() => {setEditWorkspace(true);setWorkspaceStatus("write");setProjectName(workspace[0].project);setProjectType(workspace[0].type);setWriteDescription(workspace[0].description)}}
              >
                {polish?'EDYTUJ OBSZAR ROBOCZY':'EDIT WORKSPACE'}
              </button>:
              <button
                className="createWorkspaceBtn"
                onClick={() => setWorkspaceStatus("write")}
              >
                {polish?'UTWÓRZ OBSZAR ROBOCZY':'CREATE WORKSPACE'}
                
              </button>}
        {workspace[0]?.project?<p className="selectedWorkspaceSign">{polish?'Wybrano':'Selected'}</p>:<></>}
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
            {editWorkspace? polish?'Edytuj Przestrzeń Roboczą':'Edit Workspace' : polish?'Stworz Przestrzeń Roboczą':'Create Workspace'}
          </h4>
          <button
            className="createCancelBtn"
            onClick={() => setWorkspaceStatus("open")}
          >
            X
          </button>
        </div>

        <form className="workspaceForm" onSubmit={handleClick}>
          <label htmlFor="projectNameWrite">{polish?'Nazwa Przestrzeni Roboczej':'Workspace Name'}</label>

          <input
            className="projectNameWrite"   
            value={projectName}                   
            onChange={handleNameOk}
            type="text"
            required
          />

          <label htmlFor="projectTypeWrite">{polish?'Typ Przestrzeni Roboczej':'Workspace Type'}</label>
          <select
            name="select"
            className="projectTypeWrite"
            value={projectType}
            onChange={handleSelectChange}
            required
          >
            <option value="select"></option>
            <option value="learning">{polish?'Edukacja':'Learning'}</option>
            <option value="itEngineering">{polish?'Inżynieria IT':'IT Engineering'}</option>
            <option value="marketing">{polish?'Marketing':'Marketing'}</option>
            <option value="buisness">{polish?'Firma':'Buisness'}</option>
            <option value="Other">{polish?'Inne':'Other'}</option>
          </select>

          <label htmlFor="projectDescriptionWrite">{polish?'Opis (opcjonalne)':'Description (optional)'}</label>
          <textarea
            className="projectDescriptionWrite"
            value={writeDescription}
            onChange={(e) => setWriteDescription(e.target.value)}
            type="text"
          />
          <div className="createWorkspaceContainer">
            <button className="createWorkspaceWrite" type="submit">
              {editWorkspace? polish?'Zapisz':'Save' : polish?'Utwórz':'Create'}
            </button>
            {editWorkspace?
            <button type="button" className="createWorkspaceDelete" onClick={()=>deleteWorkspace()}>{polish?'Usuń Obszar Roboczy':'Delete Workspace'}</button>:
            <></>}
          </div>
        </form>
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
        <h3 className="workspaceCreatedText">{editWorkspace? polish?'Zapisano Obszar Roboczy':'Workspace Saved' : polish?'Stworzono Obszar Roboczy':'Workspace Created'}</h3>
      </div>
    </div>
  );
};

export default Workspace;


