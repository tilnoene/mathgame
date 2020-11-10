import Header from '../../components/Header';
import Input from '../../components/Input';
import PrintQuestion from '../../components/PrintQuestion';

import "./styles.css";

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