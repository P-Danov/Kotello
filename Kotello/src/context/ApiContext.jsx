import { createContext, useState } from "react";
import { updateWorkspace } from "./updateWorkspace"; // Import funkcji

const ApiContext = createContext();

export function ApiProvider({ children }) {
  const [polish, setPolish] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [loggedInGuest, setLoggedInGuest] = useState(false);
  const [sidebar, setSidebar] = useState(false);
  const [message, setMessage] = useState(false);
  const [messageText, setMessageText] = useState({text:""});
  const [questionWindow, setQuestionWindow] = useState(false);
  const [questionWindowVariable, setQuestionWindowVariable] = useState(null);
  const [openArrayEditOptions,setOpenArrayEditOptions] = useState(false)
  const [questionWindowText, setQuestionWindowText] = useState([
    { mainText: "", option1: "", option2: "" },
  ]);
  const [loggedInName, setLoggedInName] = useState("");
  const [accounts, setAccounts] = useState([
    { username: "Test123", password: "Test123", email: "Test123@gmail.com" },
  ]);
  const [workspace, setWorkspace] = useState([]);
  const [sortedArrays, setSortedArrays] = useState([]);
  const [arrayLastList, setArrayLastList] = useState([])
  const handleUpdateWorkspace = (action, payload) => {
    setWorkspace((prevWorkspaces) =>
      updateWorkspace(action, payload, prevWorkspaces)
    );
  };

  return (
    <ApiContext.Provider
      value={{
        polish,
        setPolish,
        loggedIn,
        setLoggedIn,
        loggedInGuest,
        setLoggedInGuest,
        sidebar,
        setSidebar,
        message,
        setMessage,
        messageText,
        setMessageText,
        questionWindow,
        setQuestionWindow,
        questionWindowVariable,
        setQuestionWindowVariable,
        questionWindowText,
        setQuestionWindowText,
        loggedInName,
        setLoggedInName,
        accounts,
        setAccounts,
        workspace,
        setWorkspace,
        updateWorkspace: handleUpdateWorkspace,
        openArrayEditOptions,
        setOpenArrayEditOptions,
        sortedArrays,
        setSortedArrays,
        arrayLastList, 
        setArrayLastList,
      }}
    >
      {children}
    </ApiContext.Provider>
  );
}

export default ApiContext;


