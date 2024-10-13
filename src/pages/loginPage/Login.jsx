import { useContext, useState, useRef } from "react";
import ApiContext from "../../context/ApiContext";
import "./login.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
  const { accounts, setAccounts } = useContext(ApiContext);
  const { loggedInName, setLoggedInName } = useContext(ApiContext);
  const { loggedIn, setLoggedIn } = useContext(ApiContext);
  const [inputUsername, setInputUsername] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const incorrectTextRef = useRef(null);
  const navigate = useNavigate();

  const areCredentialsEqual = (users, usernameCheck, passwordCheck) => {
    return users.some(
      (user) =>
        user.username === usernameCheck && user.password === passwordCheck,
    );
  };

  function handleEnter(event) {
    if (event.key === "Enter") {
      if (areCredentialsEqual(accounts, inputUsername, inputPassword)) {
        setLoggedInName(inputUsername);
        props.setUsername(inputUsername);
        props.setLoggedInGuest(false);
        setLoggedIn(true);
        props.closeDropdown();
        navigate("/");
      } else {
        incorrectTextRef.current.style.display = "block";
      }
    }
  }

  function handleClick() {
    if (areCredentialsEqual(accounts, inputUsername, inputPassword)) {
      setLoggedInName(inputUsername);
      props.setUsername(inputUsername);
      props.setLoggedInGuest(false);
      props.setLoggedIn(true);
      props.closeDropdown();
      navigate("/");
    } else {
      incorrectTextRef.current.style.display = "block";
    }
  }

  return (
    <div className={props.class} style={props.style}>
      <form className="loginForm">
        <p ref={incorrectTextRef} className="incorrectText">
          {props.polish
            ? "Nieprawidłowy Użytkownik lub Hasło"
            : "Incorrect Username or Password"}
        </p>
        <p className="loginForm">{props.polish ? "Użytkownik" : "Username"}</p>
        <label>
          <input
            className="inputUsername"
            value={inputUsername}
            placeholder="test123"
            onChange={(e) => {
              setInputUsername(e.target.value);
            }}
            onKeyDown={handleEnter}
            type="text"
            required
          />
        </label>
        <p className="loginForm">{props.polish ? "Hasło" : "Password"}</p>
        <label>
          <input
            className="inputPassword"
            value={inputPassword}
            placeholder="test123"
            onChange={(e) => {
              setInputPassword(e.target.value);
            }}
            onKeyDown={handleEnter}
            type="password"
            required
          />
        </label>
      </form>

      <div className="formOptions">
        <button className="loginButton" onMouseDown={handleClick}>
          Login
        </button>
        <br></br>
        <button className="createAccount loginForm lowerLoginOptions">
          <Link
            className="createAccount loginForm lowerLoginOptions"
            to={{
              pathname: "/createAccount",
            }}
            onClick={() => {
              props.closeDropdown();
            }}
          >
            {props.polish ? "Stwórz Konto" : "Create Account"}
          </Link>
          <br></br>
        </button>
        <button className="loginAsGuest loginForm lowerLoginOptions">
          <Link
            className="loginAsGuest loginForm lowerLoginOptions"
            to="/"
            onClick={() => {
              props.setLoggedInGuest(true);
              setLoggedInName("guest");
              props.closeDropdown();
            }}
          >
            {props.polish ? "Zaloguj się jako gość" : "Log in as guest"}
          </Link>
        </button>
      </div>
    </div>
  );
};

export default Login;
