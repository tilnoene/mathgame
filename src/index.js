import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';

// pages
import MainMenu from './pages/MainMenu';
import GameScreen from './pages/GameScreen';

let a = 0;

  if(a == 1){
    ReactDOM.render(
      <React.StrictMode>
        <MainMenu />
      </React.StrictMode>,
      document.getElementById('root')
    );
  } else{
    ReactDOM.render(
      <React.StrictMode>
        <GameScreen question={{a: 20, b: 32, operation: 'x', id: 1}}/>
      </React.StrictMode>,
      document.getElementById('root')
    );
  }

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
