import React, { useState, useEffect } from 'react';
  
function EngKey(props) {
  const [clicked, setClicked] = useState(false);
  useEffect(() => {
    setClicked(false);
  }, [props.count]);

  function handleClick() {
    props.msg.text = props.letter;
    props.msg.lang = 'en-US'
    props.msg.voice = props.voices[0]
    props.msg.rate = 0.5;
    window.speechSynthesis.speak(props.msg);
    setClicked(true);
    props.func(props.letter)
  }

  return (
    <div 
        className='letter'  
        onClick={clicked ? () => {} : handleClick}
        disabled={clicked}>
        {props.letter}
    </div>
  );
}

export default EngKey;
