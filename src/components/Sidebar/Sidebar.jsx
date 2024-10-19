import React, { useState, useContext, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './sidebar.css';
import ApiContext from '../../context/ApiContext';
import { PiArrowFatLinesLeft, PiArrowFatLinesRight } from 'react-icons/pi';

const Sidebar = () => {
  const {
    workspace,
    setWorkspace,
    polish,
    loggedIn,
    loggedInGuest,
    sidebar,
    setSidebar,
    message,
    setMessage,
    messageText,
    setMessageText,
    loggedInName,
    updateWorkspace,
    sortedArrays,
    setSortedArrays,
    setOpenArrayEditOptions,
    arrayLastList, 
    setArrayLastList,
  } = useContext(ApiContext);
  const [editingArrayId, setEditingArrayId] = useState(null);
  const [newArrayName, setNewArrayName] = useState('');
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const sidebarButtonRef = useRef(null);
  const [descriptionOn,setDescriptionOn] = useState(false)

  useEffect(() => {
    if (editingArrayId !== null) {
      inputRef.current.focus();
    }
  }, [editingArrayId]);

  const handleEditClick = (arrayId, arrayName) => {
    setEditingArrayId(arrayId);
    setNewArrayName(arrayName);
  };

  const handleArrayNameChange = (e) => {
    const value = e.target.value;
    if (value.length >= 0 && value.length <= 11) {
      setNewArrayName(value);
    } else {
      console.log('error');
    }
  };

  const handleArrayNameSave = (e) => {
    if (newArrayName.length >= 1 && newArrayName.length <= 11) {
      updateWorkspace('UPDATE_ARRAY_NAME', {
        workspaceId: workspace[0].id,
        arrayId: editingArrayId,
        newArrayName
      });
      setEditingArrayId(null);
    } else {
      setEditingArrayId(null);
      setMessage(true);
      setMessageText(prevState => ({
        ...prevState, 
        text: polish?"Musi mieć wiecej niż 1 znak.":"Must have at least one letter.", 
      }));

    }
  };

  const handleEnter = (e) => {
    if (e.key === 'Enter') {
      handleArrayNameSave(e);
    }
  };

  const orderListArrange = (workspaceId, workspaceName, arrayId, arrayName) => {
    setArrayLastList((prevArrayLast) => {
      let newOrderItem = { workspaceId, workspaceName, arrayId, arrayName }; 
      let filteredArray = prevArrayLast.filter(item => item.arrayId !== arrayId).slice(0,10);

      return [newOrderItem, ...filteredArray];
    });
  };

  const arrayList = workspace[0]?.arrays
  .sort((a, b) => a.id - b.id) 
  .map((array, i) => (
    <div
      key={i}
      className='workspaceArrayContainer'
      style={sidebar ? { opacity: 1 } : { opacity: 0 }}
    >
      {editingArrayId === array.id ? (
        <div>
          <input
            ref={inputRef}
            type='text'
            value={newArrayName}
            onChange={handleArrayNameChange}
            onKeyDown={handleEnter}
            onBlur={handleArrayNameSave}
            className='arrayNameInput'
          />
        </div>
      ) : (
        <>
          <button
            className='workspaceArray'
            onClick={() =>
              {navigate('/arrays', {
                state: {
                  workspaceId: workspace[0].id,
                  arrayId: array.id,
                  arrayName: array.arrayName,
                },
              })
              ;
              orderListArrange(workspace[0].id, workspace[0].project, array.id, array.arrayName)
              setOpenArrayEditOptions(false)
            }}
          >
            {array.arrayName}
          </button>
          <button
            className='arrayEditName'
            style={sidebar ? {} : { display: 'none' }}
            onClick={() => {handleEditClick(array.id, array.arrayName);
              
            }}
            onMouseDown={() =>
              {navigate('/arrays', {
                state: {
                  workspaceId: workspace[0].id,
                  arrayId: array.id,
                  arrayName: array.arrayName,
                },
              })
              ;
              setOpenArrayEditOptions(false)
            }}
          >
            Edit
          </button>
        </>
      )}
    </div>
  ));

  const createNewWorkspaceArray = () => {
    const baseName = polish?'Tablica ':'Array ';
    const generateUniqueArrayName = () => {
      let newArrayNumber = 1;
      let newArrayName = `${baseName}${newArrayNumber}`;
  
      while (workspace[0].arrays.some(array => array.arrayName === newArrayName)) {
        newArrayNumber++;
        newArrayName = `${baseName}${newArrayNumber}`;
      }
      
      return newArrayName;
    };
  
    const newArrayName = generateUniqueArrayName();
    const newArray = { arrayName: newArrayName, id: Date.now(),order:(workspace[0].arrays.length+1) };
  
    setWorkspace((prevWorkspaces) => {
      const updatedWorkspace = { ...prevWorkspaces[0] };
      updatedWorkspace.arrays = [...updatedWorkspace.arrays, newArray];
      return [updatedWorkspace, ...prevWorkspaces.slice(1)];
    });
  };

  const sidebarOn = () => {
    if ((loggedIn && firstWorkspace) || (loggedInGuest && firstWorkspace)) {
      setSidebar(!sidebar);
      setDescriptionOn(false)
      sidebarButtonRef.current.style.color = 'white';
    }
  };

  const firstWorkspace = workspace[0];

  return (
    <div className="sidebarContainer">
      <div className={sidebar && firstWorkspace ? "sidebarActive" : "sidebar"}>
        {firstWorkspace && (
          <div className="activeWorkspace"
          >
            <div className="activeWorkspaceContainer">
            <button
              className="activeWorkspaceButton"
              
              style={sidebar ? { opacity: 1 } : { opacity: 0 }}
            >
              {workspace[0].project}
              
            </button>
              <button className="workspaceInfoButton"
                      onClick={()=>{setDescriptionOn(!descriptionOn)}}
              >i</button>
            <div className={descriptionOn?"workspaceDescriptionContainerLine":""}>
              <div className={descriptionOn?"workspaceDescriptionContainerActive":"workspaceDescriptionContainer"}>
                {descriptionOn?<p>{workspace[0].description==''?polish?"Brak Opisu.":"No Description.":workspace[0].description}</p>:<></>}
              </div>
            </div>
            </div>
            <div className="arrayTextContainer">
              <p
                className="arrayText"
                style={sidebar ? { opacity: 1 } : { opacity: 0 }}
              >
                {polish?'Tablice':'Arrays'}
              </p>
              <button
                className="addArray"
                onClick={()=>createNewWorkspaceArray()}
                style={sidebar ? { opacity: 1 } : { opacity: 0 }}
              >
                +
              </button>
            </div>
            <div className="arrayListContainer">{arrayList}</div>
          </div>
        )}
      </div>
      <div
        className={sidebar && firstWorkspace ? "sidebarButtonActive" : "sidebarButton"}
        ref={sidebarButtonRef}
        onClick={sidebarOn}
      >
        {sidebar && firstWorkspace? (
          <PiArrowFatLinesLeft  className="icon" color={loggedIn && firstWorkspace || loggedInGuest && firstWorkspace?'white':'grey'} />
        ) : (
          <PiArrowFatLinesRight className="icon" color={loggedIn && firstWorkspace || loggedInGuest && firstWorkspace?'white':'grey'} />
        )}
      </div>
    </div>
  );
};

export default Sidebar;
