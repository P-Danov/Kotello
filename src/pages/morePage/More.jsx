import React, { useState, useContext, useEffect } from "react";
import "./more.css";
import ApiContext from '../../context/ApiContext';
import Workspace from "../../pages/workspacePage/Workspace";
import Last from "../../pages/lastPage/Last";
import Create from "../../pages/createPage/Create";

const More = () => {
  const { polish } = useContext(ApiContext);
  const [activeButton, setActiveButton] = useState('');
  const [renderPage, setRenderPage] = useState('');
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(()=>{
    if(windowWidth>=400){
      if(renderPage=='create'){
        setRenderPage('')
      }
    } 
    if(windowWidth>=580){
      if(renderPage=='workspace'){
        setRenderPage('')
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

  const handleClickButton = (classString,render) => {
    setActiveButton(classString);
    setRenderPage(render)
  };

  return (
    <div className="moreContainer">
      <div className="moreButtonContainer">
        <div className="moreCreate">
          <button
            className={`moreButton moreButtonCreate ${activeButton === '.moreButtonCreate' && renderPage=='create' ? 'active' : ''}`}
            onClick={() => handleClickButton('.moreButtonCreate','create')}
          >
            {polish ? 'Utwórz' : 'Create'}
          </button>
        </div>

        <div className="moreWorkspace">
          <button
            className={`moreButton moreButtonWorkspace ${activeButton === '.moreButtonWorkspace' && renderPage=='workspace' ? 'active' : ''}`}
            onClick={() => handleClickButton('.moreButtonWorkspace','workspace')}
          >
            {polish ? 'Obszar Roboczy' : 'Workspace'}
          </button>
        </div>

        <div className="moreLast">
          <button
            className={`moreButton moreButtonLast ${activeButton === '.moreButtonLast' ? 'active' : ''}`}
            onClick={() => handleClickButton('.moreButtonLast','last')}
          >
            {polish ? 'Ostatnie' : 'Last'}
          </button>
        </div>
      </div>

    <div className="moreDisplayContent">
      {renderPage=='create'?
        <Create/>
      :renderPage=='workspace'?
        <Workspace/>
      :renderPage=='last'?
        <Last/>
      :<></>}
    </div>
      
    </div>
  );
};

export default More;
