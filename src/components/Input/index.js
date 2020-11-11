import React, { useState } from "react";

import "./styles.css";

function Input(styles) {

  function handleChange(e) {
    this.setState({ value: e.target.value });
  }

  function keyPress(e){
    if(e.keyCode == 13){
      console.log('value', e.target.value);
      
      return e.target.value;

    }
  }

  return (
    <div>
      <input type="text" inputMode="numeric" id="user-answer" className={styles} onKeyDown={keyPress} /> 
    </div>
  );
}
/*
const Input = ( {styles} ) => {
    return (
      <input type="text" inputMode="numeric" id="user-answer" className={styles} /> 
    );
};
*/
export default Input;