import { useContext, useState } from "react";
import ApiContext from "../../context/ApiContext";
import { LuEye } from "react-icons/lu";
import { LuEyeOff } from "react-icons/lu";
import { GoIssueClosed } from "react-icons/go";
import { GoXCircle } from "react-icons/go";
import { useNavigate } from "react-router-dom";

const CreateAccount = () => {
  const {
    polish,
    setPolish,
    accounts,
    setAccounts,
    message,
    setMessage,
    messageText,
    setMessageText,
  } = useContext(ApiContext);

  const [usernameOk, setUsernameOk] = useState(false);
  const [passwordOk, setPasswordOk] = useState(false);
  const [passwordConfirmOk, setPasswordConfirmOk] = useState(false);
  const [emailOk, setEmailOk] = useState(false);
  const [typingUsername, setTypingUsername] = useState("");
  const [typingPassword, setTypingPassword] = useState("");
  const [typingConfirm, setTypingConfirm] = useState("");
  const [typingEmail, setTypingEmail] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(false);
  const navigate = useNavigate();

  const writeUsername = (e) => {
    setTypingUsername(e.target.value);
    let value = ("typingUsername", e.target.value);
    if (value.length >= 6 && value.length <= 15 && !value.includes(" ")) {
      setUsernameOk(true);
    } else {
      setUsernameOk(false);
    }
  };
  const writePassword = (e) => {
    setTypingPassword(e.target.value);
    let value = ("typingPassword", e.target.value);
    const containsUpperCase = /[A-Z]/.test(value);
    const containsNumber = /[0-9]/.test(value);
    if (
      value.length >= 6 &&
      value.length <= 15 &&
      containsUpperCase &&
      containsNumber &&
      !value.includes(" ")
    ) {
      setPasswordOk(true);
    } else {
      setPasswordOk(false);
    }
    if (typingConfirm === value) {
      setPasswordConfirmOk(true);
    } else {
      setPasswordConfirmOk(false);
    }
  };
  const confirmPassword = (e) => {
    setTypingConfirm(e.target.value);
    let value = ("confirmPassword", e.target.value);

    if (typingPassword === value) {
      setPasswordConfirmOk(true);
    } else {
      setPasswordConfirmOk(false);
    }
  };
  const writeEmail = (e) => {
    setTypingEmail(e.target.value);
    let value = ("typingEmail", e.target.value);
    if (
      value.length >= 6 &&
      value.length <= 30 &&
      value.includes("@") &&
      !value.includes(" ")
    ) {
      setEmailOk(true);
    } else {
      setEmailOk(false);
    }
  };
  const isUsernameDuplicate = (users, usernameToCheck) => {

    return users.some((user) => user.username === usernameToCheck);
  };
  const createAccount = () => {
    if (usernameOk && passwordOk && passwordConfirmOk && emailOk) {
      if (!isUsernameDuplicate(accounts, typingUsername)) {
        const newUser = {
          username: typingUsername,
          password: typingPassword,
          email: typingEmail,
        };
        setAccounts((prevAccounts) => [...prevAccounts, newUser]);

        navigate("/accountCreated");
      } else {
        setMessage(true);
        setMessageText("account username exists ");

      }
    } else {
      setMessage(true);
      setMessageText("Poprawnie uzupełnij pola ");

    }
  };

  return (
    <div className="createAccountPage">
      <p className="createAccountText">
        {polish ? "Stwórz Konto" : "Create Account"}
      </p>
      <div className="accountInstructionUsername">
        {polish ? (
          <p>Nazwa użytkownika powinna zawierać od 6 do 15 znaków.</p>
        ) : (
          <p>The username should contain from 6 to 15 characters.</p>
        )}
      </div>
      <div className="accountInstructionPassword">
        {polish ? (
          <p>
            Hasło powinno zawierać od 6 do 15 znaków w tym 1 dużą litere oraz 1
            cyfre.
          </p>
        ) : (
          <p>
            The password should contain from 6 to 15 characters, including 1
            capital letter and 1 number.
          </p>
        )}
      </div>
      <form>
        <label>
          <input
            className="createAccountForm"
            placeholder={polish ? "Nazwa Użytkownika" : "Username"}
            onChange={(e) => {
              writeUsername(e);
            }}
          />
          {usernameOk ? (
            <GoIssueClosed className="usernameIconOk"></GoIssueClosed>
          ) : (
            <GoXCircle
              className="usernameIconOk"
              style={{ color: "red" }}
            ></GoXCircle>
          )}
        </label>
        <label>
          <br></br>
          <input
            className="createAccountForm"
            placeholder={polish ? "Hasło" : "Password"}
            onChange={(e) => {
              writePassword(e);
            }}
            type={passwordVisible ? "text" : "password"}
          />
          {passwordOk ? (
            <GoIssueClosed className="passwordIconOk"></GoIssueClosed>
          ) : (
            <GoXCircle
              className="passwordIconOk"
              style={{ color: "red" }}
            ></GoXCircle>
          )}
          {passwordVisible ? (
            <LuEye
              className="passwordVisibleIcon"
              onClick={() => setPasswordVisible(!passwordVisible)}
            ></LuEye>
          ) : (
            <LuEyeOff
              className="passwordVisibleIcon"
              onClick={() => setPasswordVisible(!passwordVisible)}
            ></LuEyeOff>
          )}
        </label>
        <label>
          <br></br>
          <input
            className="createAccountForm"
            placeholder={polish ? "Potwierdź Hasło" : "Confirm Password"}
            onChange={(e) => {
              confirmPassword(e);
            }}
            type={confirmVisible ? "text" : "password"}
          />
          {passwordConfirmOk ? (
            <GoIssueClosed className="passwordConfirmIconOk"></GoIssueClosed>
          ) : (
            <GoXCircle
              className="passwordConfirmIconOk"
              style={{ color: "red" }}
            ></GoXCircle>
          )}
          {confirmVisible ? (
            <LuEye
              className="passwordVisibleIcon"
              onClick={() => setConfirmVisible(!confirmVisible)}
            ></LuEye>
          ) : (
            <LuEyeOff
              className="passwordVisibleIcon"
              onClick={() => setConfirmVisible(!confirmVisible)}
            ></LuEyeOff>
          )}
        </label>
        <label>
          <br></br>
          <input
            className="createAccountForm"
            placeholder="Email"
            onChange={(e) => {
              writeEmail(e);
            }}
          />
          {emailOk ? (
            <GoIssueClosed className="emailIconOk"></GoIssueClosed>
          ) : (
            <GoXCircle
              className="emailIconOk"
              style={{ color: "red" }}
            ></GoXCircle>
          )}
        </label>
      </form>
      <button className="createAccountButton" onClick={() => createAccount()}>
        {polish ? "Stwórz" : "Create"}
      </button>
    </div>
  );
};

export default CreateAccount;
