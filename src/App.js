import './App.css';
import englishWords from './englishwords';
import Keyboard from './keyboard';
import { useState, useEffect } from 'react';

const msg = new SpeechSynthesisUtterance();
let hebWord;

function Char(props) {
  const [clicked, setClicked] = useState(false);
  useEffect(() => {
    setClicked(false);
  }, [props.count])
  
  useEffect(() => {
    if (props.charSet.includes(props.char)) {
      setClicked(true);
    }
  }, [props.charSet, props.char]);
  
  return (
    <div
      className={clicked ? "character-clicked" : "character"}
    >
      {props.char}
    </div>
  );
}

function EngWord(props) {
  const { engWord, charSet, count, func } = props;

  useEffect(() => {
    func('he');
    func();
  }, [engWord])
 
  return (
    <div className='engWord'>
      {engWord.split('').map((char, index) => (
        <Char key={index} char={char} charSet={charSet} count={count}/>
      ))}
    </div>
  );
}

function Pronunciation(props) {
  return <div className="pronunciation">{props.pronunciation}</div>;
}

function compareLists(list1, list2) {
  const sortedList1 = list1.sort();
  const sortedList2 = list2.sort();
  return sortedList1.join('') === sortedList2.join('');
}

function App() {
  let charsNotClicked;
  let engWord
  let [charsClicked, setCharsClicked] = useState([]);
  const [count, setCount] = useState(Math.floor(Math.random() * englishWords.length));
  const [showButton, setShowButton] = useState(false);
  const [showOverlay, setShowOverlay] = useState(true);
  
  engWord = Object.keys(englishWords[Math.floor(count)])[0];
  hebWord = englishWords[Math.floor(count)][engWord];
  charsNotClicked = Array.from(new Set(engWord.split('')));

  function handleCorrectGuess() {
    sayit(undefined, engWord);
    celebrateWord();
  }

  function celebrateWord() {
    setShowButton(true);
  }

  useEffect(() => {
    if (compareLists(charsClicked, charsNotClicked)) {
      handleCorrectGuess();
      }
    }, [charsClicked]);
  
  function check(letter) {
    if (charsNotClicked.includes(letter)) {
      setCharsClicked([...charsClicked, letter]);
    }
  }
  
  function nextWord() {
    const number = Math.floor(Math.random() * englishWords.length);
    setCount(number);
    setCharsClicked([]);
    setShowButton(false)
  }

  function removeOverlay() {
    setShowOverlay(false);
    sayit('he', hebWord);
    sayit(undefined, engWord);
  }

  const message = new SpeechSynthesisUtterance();
  const voices = window.speechSynthesis.getVoices();
  
  function sayit(hebLanguage) {
    if (hebLanguage === 'he') {
      message.lang = 'he';
      message.pitch = 0; 
      message.text = hebWord;
    } else {
      message.lang = 'en-US';
      message.voice = voices[0];
      message.text = engWord;
    }
    window.speechSynthesis.speak(message);
  }
  
  return (
    <div className="App">
      {showOverlay && (
        <div className='overlay-popup'>
        <h1>.בּוֹאוּ נִלְמַד אַנְגְּלִית</h1>
          <p>.לִיחְצוּ עַל הָאוֹתִיוֹת בְּאַנְגְּלִית, הַמַתְאִימוֹת לְכֹּל מִלָה</p>
          <button onClick={removeOverlay}>בּוֹאוּ נַתְחִיל</button>
        </div>
      )}
      <header className="App-header">
        <h1 className='hebWord'>{hebWord}</h1>
        <EngWord engWord={engWord} charSet={charsClicked} count={count} func={sayit}/>
        <Keyboard func={check} count={count} msg={msg} voices={voices}/>
        <hr></hr>
        <div className='nextword'>
          {<button className='hearagain' onClick={sayit}>לשמיעה חוזרת</button>}
          { showButton && <button className='nextwordbutton' onClick={nextWord}>למילה הבאה</button>}
        </div>
      </header>
    </div>
  );
}

export { App, Pronunciation };
