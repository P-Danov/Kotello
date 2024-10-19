import React, { useState, useEffect, useLayoutEffect,  useRef, useContext, useCallback } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import "./navbar.css";
import NavItem from "./NavItem";
import { LiaCatSolid } from "react-icons/lia";
import Flag from "react-flagkit";
import DropdownMenu from "./DropdownMenu";
import Login from "../../pages/loginPage/Login";
import LoggedAsGuest from "../../pages/loginPage/LoginAsGuest";
import LoggedAsUser from "../../pages/loginPage/LoginAsUser";
import ApiContext from "../../context/ApiContext";
import Workspace from "../../pages/workspacePage/Workspace";
import Last from "../../pages/lastPage/Last";
import Create from "../../pages/createPage/Create";
import More from "../../pages/morePage/More";
import Kotello from "../../pages/kotelloPage/Kotello";


const Navbar = () => {
  const { polish, setPolish, sidebar, setSidebar } = useContext(ApiContext);
  const { workspace, setWorkspace } = useContext(ApiContext);
  const { loggedIn, setLoggedIn } = useContext(ApiContext);
  const { loggedInGuest, setLoggedInGuest } = useContext(ApiContext);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [startPosition, setStartPosition] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
  ]);

  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const closeDropdown = useCallback(() => {
    setDropdownOpen([false, false, false, false, false, false]);
  }, []);

  useLayoutEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        closeDropdown();
      }
    };
  
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(()=>{
    if(windowWidth>=630){
      if(dropdownOpen[5]==true){
        closeDropdown()
      } 
    }
  }, [windowWidth])
 
  useEffect(() => {
    const handleResize = () => {
        setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => {
        window.removeEventListener('resize', handleResize);
    };
}, []);
  
  let customStyle = {
    color: loggedIn
      ? "rgba(255, 255, 255, 0.849)"
      : loggedInGuest
        ? "rgba(255, 255, 255, 0.849)"
        : "rgba(255, 255, 255, 0.449)",
  };

  function handleClick(index, classString) {
    if (loggedIn || loggedInGuest || index === 4) {
      const button = document.querySelector(classString);
      const rect = button.getBoundingClientRect();
      setStartPosition(rect.left - 10);
      
      const dropdownOpenVar = dropdownOpen.map((w, i) => {
        if (i === index) {
          return (w = !dropdownOpen[index]);
        } else {
          return (w = false);
        }
      });
      setDropdownOpen(dropdownOpenVar);
    }
  }

  return (
    <div className="container" ref={dropdownRef}>
      <div className="leftSide">
        <LiaCatSolid
          className={loggedIn||loggedInGuest?"cat":"catInactive"} 
          onClick={() => handleClick(0, ".cat")}
        ></LiaCatSolid>
        {dropdownOpen[0] && (
          <DropdownMenu
            class="dropdown catD"
            link={<Kotello />}
            text="cat dropdown"
            style={{ left: startPosition, width: 200 }}
          />
        )}

        <NavItem 
          to="/" 
          className={loggedIn||loggedInGuest?"kotello button":"kotello inactive"} 
          open={dropdownOpen[0]}
          handleClick={()=>{closeDropdown();setSidebar(false);navigate('/Welcome')}}
          text="Kotello" />

        <NavItem
          className={loggedIn||loggedInGuest?"create button":"create inactive"}
          text={polish ? "Utwórz" : "Create"}
          open={dropdownOpen[3]}
          handleClick={() => handleClick(3, ".create")}
          style={{
            ...customStyle,
            backgroundColor: dropdownOpen[3] ? "rgb(149, 88, 32)" : "",
          }}
        >
          <DropdownMenu
            class="dropdown createD"
            link={<Create />}
            style={{ left: startPosition, overflowY: "scroll" }}
          />
        </NavItem>

        <NavItem
          className={loggedIn||loggedInGuest?"workSpace button":"workSpace inactive"}
          text={polish ? "Obszar Roboczy" : "Work Space"}
          open={dropdownOpen[1]}
          handleClick={() => handleClick(1, ".workSpace")}
          style={{
            ...customStyle,
            backgroundColor: dropdownOpen[1] ? "rgb(149, 88, 32)" : "",
          }}
        >
          <DropdownMenu
            class="dropdown workspaceD"
            link={<Workspace />}
            style={{ left: startPosition, overflowY: "scroll" }}
          />
        </NavItem>

        <NavItem
          className={loggedIn||loggedInGuest?"last button":"last inactive"}
          text={polish ? "Ostatnie" : "Last"}
          open={dropdownOpen[2]}
          handleClick={() => handleClick(2, ".last")}
          style={{
            ...customStyle,
            backgroundColor: dropdownOpen[2] ? "rgb(149, 88, 32)" : "",
          }}
        >
          <DropdownMenu
            class="dropdown lastD"
            link={<Last />}
            style={{ left: startPosition, overflowY: "scroll" }}
          />
        </NavItem>


      </div>

      <div className="rightSide" >

        <NavItem
          className="plusButton"
          text={"+"}
          open={dropdownOpen[5]}
          handleClick={() => handleClick(5, ".last")}
          style={{
            ...customStyle,
            backgroundColor: dropdownOpen[5] ? "rgb(149, 88, 32)" : "",
          }}
        >
          <DropdownMenu
            class="dropdown plusD"
            link={<More />}
            style={{left: -224 , overflowY: "scroll"}}
          />
        </NavItem>

        <NavItem
          className="login button"
          text={
            loggedIn
              ? username
              : loggedInGuest
                ? polish
                  ? "Gość"
                  : "Guest"
                : polish
                  ? "Zaloguj"
                  : "Login"
          }
          open={dropdownOpen[4]}
          handleClick={() => handleClick(4, ".login")}
        >
          {loggedIn ? (
            <LoggedAsUser
              class="dropdownLogin"
              polish={polish}
              loggedInGuest={loggedInGuest}
              setLoggedIn={setLoggedIn}
              setLoggedInGuest={setLoggedInGuest}
              setDropdownOpen={setDropdownOpen}
              style={polish ? { left: -185 } : { left: -200 }}
            />
          ) : loggedInGuest ? (
            <LoggedAsGuest
              polish={polish}
              setLoggedInGuest={setLoggedInGuest}
              setDropdownOpen={setDropdownOpen}
              style={polish ? { left: -185 } : { left: -200 }}
            />
          ) : (
            <Login
              class="dropdownLogin"
              username={username}
              setUsername={setUsername}
              polish={polish}
              loggedInGuest={loggedInGuest}
              setLoggedIn={setLoggedIn}
              setLoggedInGuest={setLoggedInGuest}
              setDropdownOpen={setDropdownOpen}
              closeDropdown={closeDropdown}
              style={polish ? { left: -185 } : { left: -200 }}
            />
          )}
        </NavItem>
        {polish ? (
          <Flag
            role="button"
            className="flag"
            onClick={() => {
              setPolish(!polish);
              closeDropdown();
            }}
            country="PL"
          />
        ) : (
          <Flag
            role="button"
            className="flag"
            onClick={() => {
              setPolish(!polish);
              closeDropdown();
            }}
            country="GB"
          />
        )}
      </div>
    </div>
  );
};

export default Navbar;
