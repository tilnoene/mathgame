import Header from '../../components/Header';
//import Input from '../../components/Input';
import PrintQuestion from '../../components/PrintQuestion';

import "./styles.css";

function nextQuestion(){
  alert('a');
}

function Input(styles) { 
  const ans = 0;

  function keyPress(e){
    if(e.keyCode == 13){
      console.log('value', e.target.value, ans, styles);
      
      if(e.target.value == ans){
        e.target.value = '';
        nextQuestion();
      } else{
        e.target.value = '';
      }

    }
  }

  return (
    <div>
      <input type="text" inputMode="numeric" id="user-answer" className="error" onKeyDown={keyPress} /> 
    </div>
  );
}

const GameScreen = ( {question} ) => (
  <div className="GameScreen">
    <div className="ad">
      <Header />
    </div>

    <div className="container">
      <PrintQuestion question={question} />
      <Input />
    </div> 

  </div>
);
// question={{a: 2, b: 3, answer: 6, operation: '*'}}
export default GameScreen;