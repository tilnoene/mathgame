import React from 'react';
import ReactDOM from 'react-dom';
//import App from './App';
import reportWebVitals from './reportWebVitals';

import './styles.css';

// pages
import MainMenu from './pages/MainMenu';

// simple components
import Header from './components/Header';
import PrintQuestion from './components/PrintQuestion';

// funcoes gerais
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  
  return Math.floor(Math.random() * (max - min)) + min;
}

var operacoes = ['+', '-', '*', '/'];

function geraQuestao(a, b, operacao){

  if(operacao === '+'){
    return a + b;
  } else if(operacao === '-'){
    return a - b;
  } else if(operacao === '*'){
    return a * b;
  } else if(operacao === '/'){
    return a / b;
  }

}

function geraQuestoes(nivel=3, quantidade=8){
  let minV = 2;
  let maxV = 9;

  let minOperacoes = 0;
  let maxOperacoes = 3;

  if(nivel === 1){ // 4 soma, 4 subtração
    minOperacoes = 0;
    maxOperacoes = 2;
  } else if(nivel === 2){ // 4 mult, 4 divisão
    minOperacoes = 2;
    maxOperacoes = 4;
  } else if(nivel === 3){
    minOperacoes = 0;
    maxOperacoes = 4;
  }

  let questoes = [];

  // modo de operacoes aleatórias
  for(let i = 0; i < quantidade; i++){
    let operacaoAtual = getRandomInt(minOperacoes, maxOperacoes);
    let a = getRandomInt(minV, maxV);
    let b = getRandomInt(minV, maxV);

    // a >= b
    if(b > a){
      let temp = a;
      a = b;
      b = temp;
    }

    let question = undefined;
    if(operacoes[operacaoAtual] === '/'){
      let temp = a*b;

      question = {a: temp, b: b, operation: '/', answer: geraQuestao(temp, b, '/')};
    } else{
      question = {a: a, b: b, operation: operacoes[operacaoAtual], answer: geraQuestao(a, b, operacoes[operacaoAtual])};
    }

    if(i > 1) questoes.push(question); // retorna apenas a questão se size for 1
    else return question;
  }

  return questoes;
}

function Input() { 
  var players = [
    {acertos: 0, erros: 0}, // player 1
  ];

  let questaoAtual = geraQuestoes(2, 1);

  function keyPress(e){
    if(e.keyCode === 13){
      console.log('value', e.target.value, players[0].acertos, players[0].erros, questaoAtual);

      if(parseInt(e.target.value) === questaoAtual.answer){
        e.target.value = '';
        players[0].acertos++;

        if(players[0].acertos >= 8){
          // tela final e tal
          alert('FIM');

        } else{
          // atualiza questão
          questaoAtual = geraQuestoes(2, 1);
        }
        
      } else{
        e.target.value = '';
        players[0].erros++;
      }
    }
  }

  return (
    <div className="container">
      <PrintQuestion question={questaoAtual} />
      <input type="text" inputMode="numeric" id="user-answer" autoComplete="off" className={'accepted'} onKeyDown={keyPress} /> 
    </div>
  );
}

function GameScreen(){
  return (
    <div className="GameScreen">
      <div className="ad">
        <Header />
      </div>

      <div className="container">
        <Input />
      </div> 

    </div>
  );
}

let a = 0;

  if(a === 1){
    ReactDOM.render(
      <React.StrictMode>
        <MainMenu />
      </React.StrictMode>,
      document.getElementById('root')
    );
  } else{
    ReactDOM.render(
      <React.StrictMode>
        <GameScreen />
      </React.StrictMode>,
      document.getElementById('root')
    );
  }

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
