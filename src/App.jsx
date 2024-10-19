import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Workspace from "./pages/workspacePage/Workspace";
import Last from "./pages/lastPage/Last";
import Create from "./pages/createPage/Create";
import Login from "./pages/loginPage/Login";
import background from "./images/mountainBackground.jpg";
import CreateAccount from "./pages/loginPage/CreateAccount";
import { ApiProvider } from "./context/ApiContext";
import AccountCreated from "./pages/loginPage/AccountCreated";
import Sidebar from "./components/Sidebar/Sidebar";
import Content from "./components/Content/Content";
import Arrays from "./pages/arrays/Arrays";
import More from "./pages/morePage/More";
import Kotello from "./pages/kotelloPage/Kotello";
import Welcome from "./pages/welcomePage/Welcome";
import MessageWindow from "./components/messageWindow/MessageWindow";
import QuestionWindow from "./components/questionWindow/QuestionWindow";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';


function App() {
  return (
    <section className="App" style={{ backgroundImage: `url(${background})` }}>
      <ApiProvider>
        <MessageWindow />
        <QuestionWindow />
        <Navbar />

        <div className="contentContainer">
          <Sidebar />
          <DndProvider backend={HTML5Backend}>
          <Routes>
            <Route path="/" element={<Content />}>
              <Route path="/welcome" element={<Welcome />} />
              <Route path="/kotello" element={<Kotello />} />
              <Route path="/create" element={<Create />} />
              <Route path="/workspace" element={<Workspace />} />
              <Route path="/last" element={<Last />} />
              <Route path="/more" element={<More />} />
              <Route path="/createAccount" element={<CreateAccount />} />
              <Route path="/accountCreated" element={<AccountCreated />} />
              
                <Route path="/arrays" element={<Arrays />} />
              
            </Route>
          </Routes>
          </DndProvider>
        </div>
      </ApiProvider>
    </section>
  );
}

export default App;
