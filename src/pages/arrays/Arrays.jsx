import React, { useState, useContext, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ApiContext from '../../context/ApiContext';
import { MdDeleteForever } from "react-icons/md"
import './arrays.css';


const Arrays = () => {
  const location = useLocation();
  const { workspaceId, arrayId, arrayName } = location.state || {};
  const { polish, setPolish, workspace, setWorkspace, updateWorkspace, setMessage, setMessageText, setQuestionWindow, setQuestionWindowText,questionWindowVariable, setQuestionWindowVariable, loggedIn, loggedInGuest, openArrayEditOptions, setOpenArrayEditOptions, arrayLastList, setArrayLastList,  } = useContext(ApiContext);
  const [newArrayName, setNewArrayName] = useState(arrayName);
  const [createListBool, setCreateListBool] = useState(false);
  const [editCardBool, setEditCardBool] = useState(false);
  const [editListBool, setEditListBool] = useState(false);
  const [editArrayBool, setEditArrayBool] = useState(false)
  const addListInputRef = useRef(null);
  const editCardInputRef = useRef(null);
  const editListInputRef = useRef(null);
  const editArrayInputRef = useRef(null);
  const [newListName, setNewListName] = useState('');
  const [hoveredCardId, setHoveredCardId] = useState(null);
  const [editingCardId, setEditingCardId] = useState(null);
  const [editingListId, setEditingListId] = useState(null);
  const [editingCardName, setEditingCardName] = useState('');
  const [editingListName, setEditingListName] = useState('');
  const [editingArrayName, setEditingArrayName] = useState('');
  const [editArrayButtonClicked, setEditArrayButtonClicked] = useState(false)
  const [deleteButtonClicked, setDeleteButtonClicked] = useState(false);
  const [sourceListId, setSourceListId] = useState(null);
  const [targetListId, setTargetListId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (loggedIn||loggedInGuest) {
      
    }else{
      navigate('/');
    }
  }, [loggedIn, loggedInGuest, navigate]);

  const prevWorkspaceRef = useRef();

  useEffect(() => {
    if (prevWorkspaceRef.current) {
      const prevArray = prevWorkspaceRef.current
        ?.flatMap((ws) => ws.arrays)
        .find((array) => array.id === arrayId);
  
      const currentArray = workspace
        ?.flatMap((ws) => ws.arrays)
        .find((array) => array.id === arrayId);
  
      if (JSON.stringify(prevArray) !== JSON.stringify(currentArray)) {
        orderListArrange(workspace[0]?.id, workspace[0]?.project, arrayId, arrayName);
      }
    }
  
    prevWorkspaceRef.current = workspace;
  }, [workspace, arrayId]);

  useEffect(() => {
    const currentArray = workspace
      ?.flatMap((ws) => ws.arrays)
      .find((array) => array.id === arrayId);
    if (currentArray) {
      setNewArrayName(currentArray.arrayName);
      setCreateListBool(false);
    }
  }, [workspace, arrayId]);

  useEffect(() => {
    if (createListBool && addListInputRef.current) {
      addListInputRef.current.focus();
    }
  }, [createListBool]);

  useEffect(() => {
    if (editCardBool && editCardInputRef.current) {
      editCardInputRef.current.focus();
      editCardInputRef.current.select();
    }
  }, [editCardBool]);

  useEffect(() => {
    if (editListBool && editListInputRef.current) {
      editListInputRef.current.focus();
      editListInputRef.current.select();
    }
  }, [editListBool]);

  useEffect(() => {
    if (editArrayBool && editArrayInputRef.current) {
      editArrayInputRef.current.focus();
      editArrayInputRef.current.select();
    }
  }, [editArrayBool]);

  const orderListArrange = (workspaceId, workspaceName, arrayId, arrayName) => {

    setArrayLastList((prevArrayLast) => {
      let newOrderItem = { workspaceId, workspaceName, arrayId, arrayName }; 
  
      let filteredArray = prevArrayLast.filter(item => item.arrayId !== arrayId).slice(0,10);

      return [newOrderItem, ...filteredArray];
    });
  };

  const handleAddListBlur = () => {
    if (!deleteButtonClicked) {
      createNewList();
    }
    setDeleteButtonClicked(false);
    
  };
  const handleListBlur = (listId,listName) => {
    if (!deleteButtonClicked) {
      saveListName(listId,listName);
    }
    setDeleteButtonClicked(false);
    
  };
  const handleCardBlur = (cardId, listId, cardName) => {
    if (!deleteButtonClicked) {
      saveCardName(cardId, listId, cardName);
    }
    setDeleteButtonClicked(false);
  };


  const setShowEdit = (cardId, onOff) => {
    if (onOff) {
      setHoveredCardId(cardId);
    } else {
      setHoveredCardId(null);
    }
  };

  const handleEditCard = (cardId, cardName) => {
    setEditCardBool(true)
    setEditingCardId(cardId);
    setEditingCardName(cardName);
  };

  const handleEditList = (listId, listName) => {
    setEditListBool(true);
    setEditingListId(listId);
    setEditingListName(listName); 
  };

  const handleArrayNameChange = (e) => {
    const value = e.target.value;
    if (value.length >= 0 && value.length <= 11) {
      setNewArrayName(value);
    } else {
      console.log('error');
    }
};

const handleListNameCreate = (e) => {
  setNewListName(e.target.value);
};


  const handleListNameChange = (e) => {
    setEditingListName(e.target.value);
  };

  const handleCardNameChange = (e) => {
    setEditingCardName(e.target.value);
  };

  const createNewList = () => {
    if (newListName.length > 0) {
      const listName = newListName;
      updateWorkspace('ADD_LIST', {
        workspaceId: workspace[0]?.id,
        arrayId,
        listName,
      });
      setNewListName('');
    } else {
      setMessage(true);
      setMessageText(prevState => ({
        ...prevState, 
        text: polish?"Musi mieć wiecej niż 1 znak.":"Must have at least one letter.", 
      }));
    }
  };

  const createNewCard = (currentListId) => {
    const cardName = 'New Card Name';
    updateWorkspace('ADD_CARD', {
      workspaceId: workspace[0]?.id,
      arrayId,
      listId: currentListId,
      cardName,
    });
    setNewListName('');
  };

  const saveArrayName = (e) => {
    
    if (newArrayName.length >= 1 && newArrayName.length <= 11) {
      updateWorkspace('UPDATE_ARRAY_NAME', {
        workspaceId: workspace[0]?.id,
        arrayId,
        newArrayName
      });
      ;
      setEditArrayBool(false)
    } else {
      setNewArrayName(editingArrayName)
      setEditArrayBool(false)
      setMessage(true);
      setMessageText(prevState => ({
        ...prevState, 
        text: polish?"Musi mieć wiecej niż 1 znak.":"Must have at least one letter.", 
      }));
    }
    setEditArrayButtonClicked(true)
  };

  const saveListName = (listId,listName) => { 
    if(editingListName.length>0){
      updateWorkspace('UPDATE_LIST_NAME', {
        workspaceId: workspace[0]?.id,
        arrayId,
        listId,
        listName: editingListName,
      })
      setEditListBool(false)
      setEditingListId(null);
    }else{
      setEditingListName(listName)
      setEditListBool(false)
      setMessage(true);
      setMessageText(prevState => ({
        ...prevState, 
        text: polish?"Musi mieć wiecej niż 1 znak.":"Must have at least one letter.",
      }));
      
    } 
  }

  const saveCardName = (cardId, listId, cardName) => {
    if(editingCardName.length>0){
      updateWorkspace('UPDATE_CARD_NAME', {
        workspaceId: workspace[0]?.id,
        arrayId,
        listId,
        cardId,
        cardName: editingCardName,
      });
      setEditCardBool(false)
      setEditingCardId(null);
    }else{
      setEditingCardName(cardName)
      setEditCardBool(false)
      setMessage(true);
      setMessageText(prevState => ({
        ...prevState, 
        text: polish?"Musi mieć wiecej niż 1 znak.":"Must have at least one letter.", 
      }));
      
    }
  };
  const deleteArray = () =>{
    updateWorkspace('DELETE_ARRAY',{
      workspaceId: workspace[0]?.id,
      arrayId,
      
    })
    navigate('/')
  }

  const deleteList = (listId) => {
    updateWorkspace('DELETE_LIST', {
      workspaceId: workspace[0]?.id,
      arrayId,
      listId,
      
    });
    setEditListBool(false);
    setEditingListId(null);
  };

  const deleteCard = (cardId, listId) => {

      updateWorkspace('DELETE_CARD', {
        workspaceId: workspace[0]?.id,
        arrayId,
        listId,
        cardId
      });
      setEditCardBool(false);
      setEditingCardId(null);
    
  };
  const handleEditArray = () =>{
    setEditingArrayName(newArrayName)
    setEditArrayBool(true)
  }
  const handleDelete = ( {listId, cardId, type}) => {

    setQuestionWindowText([
      polish?{ 
      mainText: "Czy chcesz skasować tą " + (type==='array'?'tabele':type==='list'?'liste':type==='card'?'karte':'') + "?", 
      option1: "Tak", 
      option2: "Nie" 
    }:{
      mainText: "Are you sure you want to delete this " + type + "?", 
      option1: "Yes", 
      option2: "No" 
  }]);

    setQuestionWindow(true);

    const handleConfirm = (decision) => {
      if (decision) {
        if(type==='array'){
          deleteArray()
        }
        else if(type==='list'){
          deleteList(listId);
        }
        else if(type==='card')
          deleteCard(cardId, listId);
      }
      setEditListBool(false)
      setEditCardBool(false)
      setQuestionWindow(false);
    };

    setQuestionWindowVariable(() => handleConfirm);
  };

  const dragCard = useRef(0)
  const draggedOverCard = useRef(0)

  const handleDragStart = (listId, cardIndex) => {
    setSourceListId(listId); 
    dragCard.current = cardIndex; 
  };
  
  const handleDragEnter = (listId, cardIndex) => {
    setTargetListId(listId);
    draggedOverCard.current = cardIndex; 
  };
  
  const handleSort = () => { 
    setWorkspace((prevWorkspaces) => {
      return prevWorkspaces.map((workspace) => {
        if (workspace.id === workspaceId) {
          return {
            ...workspace,
            arrays: workspace.arrays.map((array) => {
              if (array.id === arrayId) {
                let sourceList = null;
                let targetList = null;
  
                const updatedLists = array.lists.map((list) => {
                  if (list.id === sourceListId) {
                    sourceList = list;
                  }
                  if (list.id === targetListId) {
                    targetList = list;
                  }
                  return list;
                });
  
                if (sourceList && targetList) {
                  if (sourceListId === targetListId) {
                    const updatedCards = [...sourceList.cards];
                    const [draggedCard] = updatedCards.splice(dragCard.current, 1);
                    updatedCards.splice(draggedOverCard.current, 0, draggedCard);
                    return {
                      ...array,
                      lists: updatedLists.map((list) =>
                        list.id === sourceListId ? { ...list, cards: updatedCards } : list
                      ),
                    };
                  } else {
  
                    const sourceCards = [...sourceList.cards];
                    const targetCards = targetList.cards ? [...targetList.cards] : [];
                    const [draggedCard] = sourceCards.splice(dragCard.current, 1);
  
                    if (targetCards.length === 0) {
                      targetCards.push(draggedCard);
                    } else {

                      targetCards.splice(draggedOverCard.current, 0, draggedCard);
                    }
  
                    return {
                      ...array,
                      lists: updatedLists.map((list) => {
                        if (list.id === sourceListId) {
                          return { ...list, cards: sourceCards };
                        }
                        if (list.id === targetListId) {
                          return { ...list, cards: targetCards };
                        }
                        return list;
                      }),
                    };
                  }
                }
              }
              return array;
            }),
          };
        }
        return workspace;
      });
    });
  };
  
  const lists = workspace[0]?.arrays
    ?.filter((array) => array.id === arrayId)
    ?.flatMap((array) =>
      array.lists?.map((list) => (
        <div className="listContainer" key={list.id}

        onDragOver={(e) => {e.preventDefault()}}     
        onDragEnter={() =>(list.cards.length===0?handleDragEnter(list.id):null)}>
          
          <div className="listAndCardContainer" >
          {editListBool & editingListId === list.id ?(
            
                            <input
                            ref={editListInputRef}

                            className='listNameEditInput'
                            type="text"
                            maxLength={18}
                            value={editingListName}
                            onChange={handleListNameChange}
                            onBlur={() => handleListBlur(list.id, list.listName)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                saveListName(list.id);
                              }
                            }}
                          />

            )
          :
            (<div className='listNameContainer'

              >              
              <button className="listName">{list.listName}</button>
              <button className='editListName' onClick={() => handleEditList(list.id, list.listName)}>{polish?"Edytuj":"Edit"}</button>
            </div>
          )
            
          }
            {list.cards?.map((card,index) => (
              <div
              key={card.id}
              draggable={!editCardBool}
              onDragStart={() => handleDragStart(list.id, index)}
              onDragEnter={() => handleDragEnter(list.id, index)}
              onDragEnd={handleSort}
              onDragOver={(e) => e.preventDefault()}
              className='cardContainer'
              onMouseOver={() => setShowEdit(card.id, true)}
              onMouseOut={() => setShowEdit(card.id, false)}
              >
                {editCardBool & editingCardId === card.id ? (
                  <div>
                    <input
                      ref={editCardInputRef}
                      
                      className='cardNameEditInput'
                      type="text"
                      maxLength={30}
                      value={editingCardName}
                      onChange={handleCardNameChange}
                      onBlur={() => handleCardBlur(card.id, list.id, card.cardName)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          saveCardName(card.id, list.id, card.cardName);
                        }
                      }}
                    />

                  
                  </div>
                ) : (
                  <div>
                    <p className='cardName'>{card.cardName}</p>
                  </div>
                )}
                {hoveredCardId === card.id && (
                  !editCardBool?
                  <button className='cardNameEdit' style={{fontSize:polish?'10px':''}} onClick={() => handleEditCard(card.id, card.cardName)}>{polish?"Edytuj":"Edit"}</button>:
                  <></>

                )}
                {editCardBool & editingCardId === card.id ? 
                <div className="deleteCardContainer">
                  <MdDeleteForever
                    className='deleteCardButton'
                    onMouseDown={() => setDeleteButtonClicked(true)} 
                    onClick={() => handleDelete({listId:list.id, cardId:card.id, type:'card'} )} 
                  />
                    
                  
                </div>:
                  <></>}

              </div>
            ))}
          </div>
          <div className='bottomListContainer'>
            <button className="addCardButton" onClick={() => createNewCard(list.id)}>
            {polish?"Dodaj Karte":"Add Card"}
            </button>
            {editListBool & editingListId === list.id ? 
            <MdDeleteForever
              className='deleteCardButton'
              onMouseDown={() => setDeleteButtonClicked(true)} 
              onClick={() => handleDelete({listId:list.id, type:'list'})}
              />
              :<></>}
          </div>
        </div>
      ))
    ) || [];

  const hasLists = workspace[0]?.arrays?.some(
    (array) => array.id === arrayId && array.lists && array.lists.length > 0
  );



  return (
    <div className="arrayContent">
      <div className="upperLineContainer">
        {editArrayBool
        ?<input
            className='arrayNameInputArrays'
            ref={editArrayInputRef}
            value={newArrayName}
            onChange={handleArrayNameChange}
            onBlur={()=>saveArrayName()}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                saveArrayName();
              }
            }}
          
          >
          
          </input>
        :<p className="arrayName">{newArrayName}</p>}
          <div className='upperLineRight'>
          {openArrayEditOptions?
            <div>
              <button className='editDeleteArrayButton editArrayButton' onClick={()=>handleEditArray()} >{polish?"Edytuj":"Edit"}</button>
              <button className='editDeleteArrayButton deleteArrayButton' onClick={()=>handleDelete({type:'array'})}>{polish?"Usuń":"Delete"}</button>
            </div>
          :<></>}
          <button className="upperLineButton" onClick={()=>{setOpenArrayEditOptions(!openArrayEditOptions)}}>
            <span className="upperLineButtonInside">...</span>
          </button>
          </div>
      </div>
      <div className="middleContainer">
        {lists}
        {!createListBool ? (
          <button className="addListButton" onClick={() => setCreateListBool(!createListBool)}>
            <span className="addListSpan">{hasLists ? polish?'Dodaj Kolejna Liste':'Add Another List' : polish?'Dodaj Liste':'Add List'}</span>
          </button>
        ) : (
          <div className="addedList">
            <div className="addedListContainer">
              <input
                ref={addListInputRef}
                type="text"
                maxLength={18}
                value={newListName}
                className="addListInput"
                onChange={handleListNameCreate}
                onBlur={() => handleAddListBlur()}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    createNewList();
                  }
                }}
              />
              <div className="acceptCancelContainer">
                <button className="acceptListName" onClick={() => createNewList()}>
                  Add List
                </button>
                <button className="cancelListName" onMouseDown={() => setDeleteButtonClicked(true)} onClick={() => setCreateListBool(!createListBool)}>Cancel</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Arrays;
