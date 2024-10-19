import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiContext from '../../context/ApiContext';
import './last.css';

const Last = () => {
  const {
    workspace,
    setWorkspace,
    arrayLastList, 
    setArrayLastList,
  } = useContext(ApiContext);

  const navigate = useNavigate();

  const handleArrayClick = (workspaceId, arrayId, arrayName) => {
    let index = workspace.findIndex(workspaces => workspaces.id === workspaceId);

    if (index !== -1) {
      const selectedWorkspace = workspace[index];
      const updatedWorkspace = [
        selectedWorkspace,
        ...workspace.filter((item, i) => i !== index)
      ];

      setWorkspace(updatedWorkspace);
      navigate('/arrays', { state: { 
        workspaceId,
        arrayId,
        arrayName } });
    }
  };

  const updateHistoryIfChanged = () => {
    const updatedArrayLastList = arrayLastList.map(item => {
      const matchingWorkspace = workspace.find(ws => ws.id === item.workspaceId);
      if (!matchingWorkspace) return item; 

      const matchingArray = matchingWorkspace.arrays.find(arr => arr.id === item.arrayId);
      if (!matchingArray) return item; 


      if (matchingWorkspace.project !== item.workspaceName || matchingArray.arrayName !== item.arrayName) {
        return {
          ...item,
          workspaceName: matchingWorkspace.project,
          arrayName: matchingArray.arrayName
        };
      }

      return item;
    });

    setArrayLastList(updatedArrayLastList);
  };

  useEffect(() => {
    updateHistoryIfChanged();
  }, [workspace]);


  const filteredLastList = arrayLastList.filter(arrayLastItem => {
    const matchingWorkspace = workspace.find(ws => ws.id === arrayLastItem.workspaceId);
    if (!matchingWorkspace) return false; 

    const matchingArray = matchingWorkspace.arrays.find(arr => arr.id === arrayLastItem.arrayId);
    return !!matchingArray; 
  });

  let lastRenderedWorkspaceId = null;

  const lastList = filteredLastList.map((array, index) => {
    const shouldRenderWorkspace = array.workspaceId !== lastRenderedWorkspaceId;
    lastRenderedWorkspaceId = array.workspaceId;

    return (
      <div key={array.arrayId} className='lastContainer'>
        {shouldRenderWorkspace && (
          <button className='workspaceLastButton'>
            {array.workspaceName}
          </button>
        )}
        <button
          className='arrayLastButton'
          onClick={() => handleArrayClick(array.workspaceId, array.arrayId, array.arrayName)}
        >
          {array.arrayName}
        </button>
      </div>
    );
  });

  return (
    <>
      {lastList}
    </>
  );
};

export default Last;
