import React, {useState, useContext} from "react";
import "./kotello.css";
import ApiContext from '../../context/ApiContext';
import Workspace from "../../pages/workspacePage/Workspace";
import Last from "../../pages/lastPage/Last";
import Create from "../../pages/createPage/Create";
import Flag from "react-flagkit";

const Kotello = () => {
  const { polish, setPolish } = useContext(ApiContext);
  const [activeButton, setActiveButton] = useState('');
  const [showPage, setShowPage] = useState(true);
  const [renderPage, setRenderPage] = useState('');

  const handleClickButton = (classString,render) => {
    setActiveButton(classString);
    setRenderPage(render)
    setShowPage(false)
  };

  return (
    <div className="kotelloContainer">
      {showPage?
      <div className="kotelloButtonContainer">

        <div className="kotelloCreate">
          <button
            className={`kotelloButton kotelloButtonCreate ${activeButton === '.kotelloButtonCreate' && renderPage==='create' ? 'active' : ''}`}
            onClick={(e) => {handleClickButton('.kotelloButtonCreate','create');e.stopPropagation()}}
          >
            {polish ? 'Utwórz' : 'Create'}
          </button>
        </div>

        <div className="kotelloWorkspace">
          <button
            className={`kotelloButton kotelloButtonWorkspace ${activeButton === '.kotelloButtonWorkspace' && renderPage==='workspace' ? 'active' : ''}`}
            onClick={(e) => {handleClickButton('.kotelloButtonWorkspace','workspace');e.stopPropagation()}}
          >
            {polish ? 'Obszar Roboczy' : 'Workspace'}
          </button>
        </div>

        <div className="kotelloLast">
          <button
            className={`kotelloButton kotelloButtonLast ${activeButton === '.kotelloButtonLast' ? 'active' : ''}`}
            onClick={(e) => {handleClickButton('.kotelloButtonLast','last');e.stopPropagation()}}
          >
            {polish ? 'Ostatnie' : 'Last'}
          </button>
        </div>

        <div className="languageButtonKotello">
        {polish ? (
          <Flag
            role="button"
            className="flag"
            onClick={() => {
              setPolish(!polish);
              
            }}
            country="PL"
          />
        ) : (
          <Flag
            role="button"
            className="flag"
            onClick={() => {
              setPolish(!polish);
              
            }}
            country="GB"
          />
        )}
        </div>
      </div>

        :
    
    <div className="kotelloDisplayContent">
      <button className="kotelloBackButton" onClick={(e)=>{setShowPage(true);e.stopPropagation()}}>{polish?"WSTECZ":"BACK"}</button>
      {renderPage=='create'?
        <Create/>
      :renderPage=='workspace'?
        <Workspace/>
      :renderPage=='last'?
        <Last/>
      :<></>}
    </div>}
      
    </div>
  );
};

export default Kotello;
