import React from "react";
import EngKey from "./engkey";
import { Pronunciation } from "./App"

const Keyboard = (props) => {
  const englishLetters = [
    { "A": "אֶיי" },
    { "B": "בִּי" },
    { "C": "סִי" },
    { "D": "דִי" },
    { "E": "אִי" },
    { "F": "אֵף" },
    { "G": "גִ'י" },
    { "H": "'אֶייְגְ" },
    { "I": "אָי" },
    { "J": "גֶ'יי" },
    { "K": "קֶיי" },
    { "L": "אֵל" },
    { "M": "אֵם" },
    { "N": "אֵן" },
    { "O": "אוֹ" },
    { "P": "פִּי" },
    { "Q": "קְיוּ" },
    { "R": "אָר" },
    { "S": "אֵס" },
    { "T": "טִי" },
    { "U": "יוּ" },
    { "V": "וִי" },
    { "W": "דָבֶּלְיוּ" },
    { "X": "אִיקְס" },
    { "Y": "ווַאי" },
    { "Z": "זֶד" }
  ];

  return (
    <React.Fragment>
      <div className="keyboard-wrapper">
        {englishLetters.map((letter, index) => (
          <div key={index}>
            <EngKey letter={Object.keys(letter)[0]} func={props.func} count={props.count} msg={props.msg} voices={props.voices}/>
            <Pronunciation pronunciation={letter[Object.keys(letter)[0]]} />
          </div>
        ))}
      </div>
    </React.Fragment>
  )  
};

export default Keyboard;