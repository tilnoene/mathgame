import React, { useState } from 'react';
import ReactDOM from 'react-dom';
//import App from './App';
import reportWebVitals from './reportWebVitals';

import './styles.css';

// pages
//import MainMenu from './pages/MainMenu';

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

function geraQuestoes(nivel, quantidade=8){
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
  if(seconds < 60){
    return seconds + 's';
  } else{
    return parseInt(seconds / 60) + 'min ' + seconds % 60 + 's';
  }
}

function geraPontos(erros, segundos) {
  let tot = 100;

  let penalidade = parseInt(erros * 1.5) + segundos;
  let pontos = (tot - penalidade) * 10;

  if(pontos < 0){
    pontos = 0;
  }

  return pontos;
}

function Input( {nivel} ) {
  const [tempoInicial,setTempoInicial] = useState(0);

  if(tempoInicial === 0){
    let date = new Date();
    setTempoInicial(parseInt(date.getTime() / 1000));
  }

  const [erros,setErros] = useState(0);
  const [acertos,setAcertos] = useState(1);
  const [questaoAtual,setQuestao] = useState(geraQuestoes(nivel, 1));
  const [styles,setStyles] = useState("");

  function acertouQuestao() {

    setAcertos(acertos + 1);

    if(styles === "accepted") {
      setStyles("accepted2");
    } else {
      setStyles("accepted");
    }

  }

  function errouQuestao() {

    setErros(erros + 1);

    if(styles === "error") {
      setStyles("error2");
    } else {
      setStyles("error");
    }
  }

  function atualizaQuestao(){
    setQuestao(geraQuestoes(nivel, 1));
  }

  function keyPress(e){

    if(e.keyCode === 13){

      if(parseInt(e.target.value) === questaoAtual.answer){
        e.target.value = '';
        acertouQuestao();

        if(acertos >= 8){
          let date = new Date();
          let tempoFinal = parseInt(date.getTime() / 1000);

          //console.log(tempoInicial, tempoFinal);

          ReactDOM.render(
            <React.StrictMode>
              <FinishScreen dados={{nivel: nivel, pontos: geraPontos(erros, tempoFinal - tempoInicial), acertos: acertos, erros: erros, segundos: tempoFinal - tempoInicial}}/>
            </React.StrictMode>,
            document.getElementById('root')
          );

        } else{
          atualizaQuestao();
        }
        
      } else{
        e.target.value = '';
        errouQuestao();
      }

    }

  }

  return (
    <div className="">
      <div className="container-questao numeracao">{acertos} / 8</div>
      <div className="container-questao">
        <PrintQuestion question={questaoAtual} />
        <input type="text" inputMode="numeric" id="user-answer" autoComplete="off" maxLength={4} className={styles} onKeyDown={keyPress} /> 
      </div>
    </div>
  );
}

function GameScreen( {nivel} ) {
  return (
    <div className="GameScreen">
      <div className="ad">
        <Header />
      </div>

      <div className="container">
        <Input nivel={nivel}/>
      </div> 

    </div>
  );
}

function FinishScreen( {dados} ) {
  let modo = iniciarJogoFacil;

  if(dados.nivel === 2){
    modo = iniciarJogoMedio;
  } else if(dados.nivel === 3){
    modo = iniciarJogoDificil;
  }

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
          onClick={modo}
          title="Jogar Novamente"
        />

      </div>

    </div>
  );
}

function Contador( {num} ) {
  return (
    <div className="GameScreen">
      <div className="ad">
        <Header />
      </div>

      <div className="container">
        <p className="contador">{num}</p>
      </div> 

    </div>
  );
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function iniciarJogoFacil() {
  iniciarJogo(1);
}

function iniciarJogoMedio() {
  iniciarJogo(2);
}

function iniciarJogoDificil() {
  iniciarJogo(3);
}

async function iniciarJogo( nivel )  {
  
  for(let i = 3; i >= 1; i--){
    ReactDOM.render(
      <React.StrictMode>
        <Contador num={i}/>
      </React.StrictMode>,
      document.getElementById('root')
    );

    await sleep(1000);
  }
  
  ReactDOM.render(
    <React.StrictMode>
      <GameScreen nivel={ nivel }/>
    </React.StrictMode>,
    document.getElementById('root')
  );
  
}

const TelaEscolherModoDeJogo = () => (
  <div>
    <div className="ad">
      <Header />
    </div>

    <div className="main-menu">
      <Button 
        styles="btn"
        onClick={iniciarJogoFacil}
        title="Fácil"
      />

      <Button 
        styles="btn"
        onClick={iniciarJogoMedio}
        title="Médio"
      />

      <Button 
        styles="btn"
        onClick={iniciarJogoDificil}
        title="Difícil"
      />
    </div>
  </div>
);

function EscolherModoDeJogo() {
  ReactDOM.render(
    <React.StrictMode>
      <TelaEscolherModoDeJogo />
    </React.StrictMode>,
    document.getElementById('root')
  );
}

const MainMenu = () => (
  <div className="MainMenu">
    <div className="ad">
      <Header />
    </div> 
    
    <div className="main-menu">

      <p className="logo">SpeedCalc</p>

      <Button 
        styles="btn"
        onClick={EscolherModoDeJogo}
        title="Um jogador"
      />

      <Button 
        styles="btn"
        title="Multiplayer"
        disabled={true}
      />
    </div>

  </div>
);

ReactDOM.render(
  <React.StrictMode>
    <MainMenu />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();