import React from 'react';

import "./styles.css";

const PrintQuestion = ( {question} ) => {
    let op = question.operation;

    if(op === '*'){
    	op = 'x';
    } else if(op === '/'){
    	op = '÷';
    }

    return (
        <div className="expression">
            <p>{question.a} {op} {question.b} = </p>
        </div>
    );
};

export default PrintQuestion;