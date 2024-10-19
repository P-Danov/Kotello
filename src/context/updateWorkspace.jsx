export const updateWorkspace = (action, payload, prevWorkspaces) => {
    return prevWorkspaces.map((workspace) => {
      if (workspace.id === payload.workspaceId) {
        switch (action) {
          case 'SORT_ARRAYS':
            const sortedArrays = [workspace.arrays.find(array => array.id === payload.arrayId)]
              .concat(workspace.arrays.filter(array => array.id !== payload.arrayId));
            return { ...workspace, arrays: sortedArrays };
          case 'DELETE_ARRAY':
            const updatedArraysForDelete = workspace.arrays.filter((array) => 
              array.id !== payload.arrayId
            );
            return { ...workspace, arrays: updatedArraysForDelete };
  
          case 'UPDATE_ARRAY_NAME':
            const updatedArraysForName = workspace.arrays.map((array) => {
              if (array.id === payload.arrayId) {
                return { ...array, arrayName: payload.newArrayName };
              }
              return array;
            });
            return { ...workspace, arrays: updatedArraysForName };
  
          case 'ADD_LIST':
            const updatedArraysForAddList = workspace.arrays.map((array) => {
              if (array.id === payload.arrayId) {
                const updatedLists = array.lists
                  ? [
                      ...array.lists,
                      { listName: payload.listName, id: Date.now(), inputOn: false, cards:[] },
                    ]
                  : [{ listName: payload.listName, id: Date.now(), inputOn: false, cards:[]}];
                return { ...array, lists: updatedLists };
              }
              return array;
            });
            return { ...workspace, arrays: updatedArraysForAddList };
  
          case 'DELETE_LIST':
            const updatedArraysForDeleteList = workspace.arrays.map((array) => {
              if (array.id === payload.arrayId) {
                const deletedLists = array.lists.filter(
                  (list) => list.id !== payload.listId
                );
                return { ...array, lists: deletedLists };
              }
              return array;
            });
            return { ...workspace, arrays: updatedArraysForDeleteList };
  
          case 'UPDATE_LIST_NAME':
            const updatedArraysForUpdateListName = workspace.arrays.map((array) => {
              if (array.id === payload.arrayId) {
                return {
                  ...array,
                  lists: array.lists.map((list) => {
                    if (list.id === payload.listId) {
                      return { ...list, listName: payload.listName };
                    }
                    return list;
                  }),
                };
              }
              return array;
            });
            return { ...workspace, arrays: updatedArraysForUpdateListName };
  
          case 'ADD_CARD':
            const updatedArraysForAddCard = workspace.arrays.map((array) => {
              if (array.id === payload.arrayId) {
                return {
                  ...array,
                  lists: array.lists.map((list) => {
                    if (list.id === payload.listId) {
                      const updatedCards = list.cards
                        ? [
                            ...list.cards,
                            { cardName: payload.cardName, id: Date.now() },
                          ]
                        : [{ cardName: payload.cardName, id: Date.now() }];
                      return { ...list, cards: updatedCards };
                    }
                    return list;
                  }),
                };
              }
              return array;
            });
            return { ...workspace, arrays: updatedArraysForAddCard };
  
          case 'DELETE_CARD':
            const updatedArraysForDeleteCard = workspace.arrays.map((array) => {
              if (array.id === payload.arrayId) {
                return {
                  ...array,
                  lists: array.lists.map((list) => {
                    if (list.id === payload.listId) {
                      const updatedCards = list.cards.filter(
                        (card) => card.id !== payload.cardId
                      );
                      return { ...list, cards: updatedCards };
                    }
                    return list;
                  }),
                };
              }
              return array;
            });
            return { ...workspace, arrays: updatedArraysForDeleteCard };
  
          case 'UPDATE_CARD_NAME':
            const updatedArraysForUpdateCardName = workspace.arrays.map((array) => {
              if (array.id === payload.arrayId) {
                return {
                  ...array,
                  lists: array.lists.map((list) => {
                    if (list.id === payload.listId) {
                      return {
                        ...list,
                        cards: list.cards.map((card) => {
                          if (card.id === payload.cardId) {
                            return { ...card, cardName: payload.cardName };
                          }
                          return card;
                        }),
                      };
                    }
                    return list;
                  }),
                };
              }
              return array;
            });
            return { ...workspace, arrays: updatedArraysForUpdateCardName };
  
          default:
            return workspace;
        }
      }
      return workspace;
    });
  };