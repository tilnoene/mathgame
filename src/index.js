import React, { useState } from 'react';
import ReactDOM from 'react-dom';
//import App from './App';
import reportWebVitals from './reportWebVitals';

import './styles.css';

// pages
import MainMenu from './pages/MainMenu';

// simple components
import Header from './components/Header';
import PrintQuestion from './components/PrintQuestion';
import Button from './components/Button';

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

function createTime(seconds) {
  console.log(seconds);
  if(seconds < 60){
    return seconds + 's';
  } else{
    return parseInt(seconds / 60) + 'min ' + seconds % 60 + 's';
  }
}

function Input() {
  const [erros,setErros] = useState(0);
  const [acertos,setAcertos] = useState(0);
  const [questaoAtual,setQuestao] = useState(geraQuestoes(2, 1));
  const [styles,setStyles] = useState("");

  function acertouQuestao() {

    setAcertos(acertos + 1);

    if(styles == "accepted") {
      setStyles("accepted2");
    } else {
      setStyles("accepted");
    }

  }

  function errouQuestao() {

    setErros(erros + 1);

    if(styles == "error") {
      setStyles("error2");
    } else {
      setStyles("error");
    }
  }

  function atualizaQuestao(){
    setQuestao(geraQuestoes(2, 1));
  }

  function keyPress(e){

    if(e.keyCode === 13){

      if(parseInt(e.target.value) === questaoAtual.answer){
        e.target.value = '';
        acertouQuestao();

        if(acertos >= 8){
          // tela final e tal
          alert('FIM');

        } else{
          atualizaQuestao();
        }
        
      } else{
        e.target.value = '';
        errouQuestao();
      }

      console.log(styles, acertos, erros);
    }

  }

  return (
    <div className="container">
      <PrintQuestion question={questaoAtual} />
      <input type="text" inputMode="numeric" id="user-answer" autoComplete="off" maxLength={4} className={styles} onKeyDown={keyPress} /> 
    </div>
  );
}

function GameScreen() {
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

function FinishScreen( {dados} ) {
  return (
    <div className="FinishScreen">

      <div className="ad">
        <Header />
      </div>

      <div className="finish-menu">
        <p className="pontuacao">{dados.pontos} Pontos</p>
        <p className="estatisticas">Acertos: {dados.acertos} - Erros: {dados.erros}</p>
        <p className="estatisticas">Tempo: {createTime(dados.segundos)}</p>
        
      </div>

      <div className="jogar-novamente">
        <Button 
          styles="btn"
          onClick='teste()'
          title="Jogar Novamente"
        />

      </div>

    </div>
  );
}

let a = 3;

  if(a === 1){
    ReactDOM.render(
      <React.StrictMode>
        <MainMenu />
      </React.StrictMode>,
      document.getElementById('root')
    );
  } else if (a === 2){
    ReactDOM.render(
      <React.StrictMode>
        <GameScreen />
      </React.StrictMode>,
      document.getElementById('root')
    );
  } else {
    ReactDOM.render(
      <React.StrictMode>
        <FinishScreen dados={{pontos: 329, acertos: 8, erros: 10, segundos: 119}}/>
      </React.StrictMode>,
      document.getElementById('root')
    );
  }

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();