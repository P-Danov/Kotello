import "./login.css";
import { useContext } from "react";
import ApiContext from "../../context/ApiContext";

const LoggedAsUser = (props) => {
  const { loggedIn, setLoggedIn } = useContext(ApiContext);
  const { sidebar, setSidebar } = useContext(ApiContext);

  return (
    <div className={props.class} style={props.style}>
      <p
        onClick={() => {
          setLoggedIn(false);
          props.setDropdownOpen([false, false, false, false, false, false]);
          setSidebar(false);
        }}
        className="formOptions"
      >
        {props.polish ? "Wyloguj" : "Logout"}
      </p>
    </div>
  );
};

export default LoggedAsUser;
