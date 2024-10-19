import "./login.css";
import { useContext } from "react";
import ApiContext from "../../context/ApiContext";

const LoggedAsGuest = (props) => {
  const { loggedInGuest, setLoggedInGuest } = useContext(ApiContext);
  const { sidebar, setSidebar } = useContext(ApiContext);

  return (
    <div className="dropdownLoginGuest" style={props.style}>
      <p
        onClick={() => {
          setLoggedInGuest(false);
          props.setDropdownOpen([false, false, false, false, false]);
          setSidebar(false);
        }}
        className="formOptions"
      >
        {props.polish ? "Wyloguj" : "Logout"}
      </p>
    </div>
  );
};

export default LoggedAsGuest;
