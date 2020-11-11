import Header from '../../components/Header';
import Button from '../../components/Button';

import "./styles.css";

const MainMenu = () => (
  <div className="MainMenu">
    <div className="ad">
      <Header />
    </div> 
    
    <div className="main-menu">

      <p className="logo">SpeedCalc</p>

      <Button 
        styles="btn"
        onClick='teste()'
        title="Um jogador"
      />

      <Button 
        styles="btn"
        onClick='teste()'
        title="Multiplayer"
        disabled={true}
      />
    </div>

  </div>
);

export default MainMenu;
