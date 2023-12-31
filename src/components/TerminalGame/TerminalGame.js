import React, { useEffect, useRef, useState } from 'react';
import $ from 'jquery';
import 'jquery.terminal/css/jquery.terminal.min.css';
import 'jquery.terminal/js/jquery.terminal.min.js';
import axios from 'axios';
import './TerminalGame.scss';

import image1 from '../../assets/images/image1.jpg';
import image2 from '../../assets/images/image2.jpg';
import image3 from '../../assets/images/image3.jpg';
import image4 from '../../assets/images/image4.jpg';
import titleImage from "../../assets/images/AMiamiStory.jpg";
import switchImage from "../../assets/images/Miami.svg";
import shena from "../../assets/images/shenaregal.jpg";
import cats from "../../assets/images/cats.jpg";
import coffee from "../../assets/images/coffee.jpg";

import backgroundMusic1 from '../../assets/music/8bitnostalgia.mp3';
import backgroundMusic2 from '../../assets/music/8bitfunk.mp3';
import backgroundMusic3 from '../../assets/music/8bitadventure.mp3';
import backgroundMusic4 from '../../assets/music/miami-vice.mp3';

function TerminalGame() {
  //setting initial States for beginning of game render
  const terminalRef = useRef(null);
  const audioRef = useRef(null);
  const [currentImage, setCurrentImage] = useState(titleImage);
  const [currentMusic, setCurrentMusic] = useState(backgroundMusic1);
  const [isMuted, setIsMuted] = useState(true);

 
 
  
  
  
  

  useEffect(() => {
    //useEffect handles the bulk of rendering and changing scenes and music
    const terminal = $(terminalRef.current);

    const handleTerminalError = (message) => {
      terminal.error(message);
    };

    axios
      .get('https://a-miami-story-server-269397fbf5fb.herokuapp.com/scenes')
      .then((response) => {
        const scenes = response.data.scenes;

        axios
          .get('https://a-miami-story-server-269397fbf5fb.herokuapp.com/transitions')
          .then((response) => {
            const transitions = response.data.transitions;

            let currentScene = 'start';

            terminal.terminal((command, terminal) => {
              const lowerCommand = command.toLowerCase();

              if (scenes[currentScene]) {
                const choices = scenes[currentScene].choices;
                const matchedChoice = choices.find(
                  (choice) => lowerCommand.includes(choice.text.toLowerCase())
                );

                if (matchedChoice) {
                  const nextScene = transitions[currentScene][matchedChoice.text.toLowerCase()];
                  if (nextScene) {
                    currentScene = nextScene;
                    terminal.echo(`You chose: ${matchedChoice.text}`);
                    terminal.echo(scenes[nextScene].description);
                    terminal.echo(''); 
                    terminal.echo('-------------------'); 
            

                    setCurrentImage(getImageForScene(nextScene));
                    setCurrentMusic(getMusicForScene(nextScene));
                  } else {
                    handleTerminalError('Invalid command. Please choose a valid option.');
                  }
                } else if (lowerCommand === 'back') {
                  const previousScene = scenes[currentScene].previousScene;
                  if (previousScene) {
                    currentScene = previousScene;
                    terminal.echo(scenes[previousScene].description);
                    setCurrentImage(getImageForScene(previousScene));
                    setCurrentMusic(getMusicForScene(previousScene));
                  } else {
                    handleTerminalError('There is no previous scene.');
                  }
                } else if (lowerCommand === 'restart') {
                  currentScene = 'start';
                  terminal.echo(scenes.start.description);
                  setCurrentImage(image1);
                  setCurrentMusic(backgroundMusic1);
                } else {
                  handleTerminalError('Invalid command. Please choose a valid option.');
                }
              }
            }, {
              greetings: scenes.start.description + '\n\n-------------------',
              prompt: '> ',
            });
          })
          .catch((error) => {
            handleTerminalError('Error fetching transitions data: ' + error.message);
          });
      })
      .catch((error) => {
        handleTerminalError('Error fetching scenes data: ' + error.message);
      });
  }, []);

  const getImageForScene = (scene) => {
    switch (scene) {
      case "help":
        return coffee; 
      case 'inAHurry':
        return image2;
      case 'stillVibin':
        return image3;
      case "vibin": 
      return shena; 
      case "worry":
        return cats;
      case 'end1':
        return image4;
      case 'end4':
        return switchImage;
      case 'end2':
        return image1;
      default:
        return titleImage;
    }
  };

  const getMusicForScene = (scene) => {
    switch (scene) {
      case "observe":
        return backgroundMusic1;
      case "stillVibin":
        return backgroundMusic3;
      case 'inAHurry':
        return backgroundMusic2;
      default:
        return backgroundMusic4;
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  useEffect(() => {
    if (!isMuted) {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = currentMusic;
        audioRef.current.load();
        audioRef.current.play();
      }
    }
  }, [currentMusic, isMuted]);

  return (
    <>
      <h1 className="game__heading">A Miami Story!</h1>
      <h2 className="game__subheading">By Ismael Santos</h2>

      <div className="terminal-container">
        <div className="image-container">
          <img src={currentImage} className="terminal__image" alt="Scene" />
        </div>
        <div ref={terminalRef}></div>
        <div classNsme="list">
          <ul className="commands">Commands:
            <li>move</li>
            <li>look</li>
            <li>wait</li>
            <li>panic</li>
            <li>help</li>
            <li>back</li>
            <li>clear/restart</li>
          </ul>
        </div>
        <button className="unmute" onClick={toggleMute}>{isMuted ? 'Unmute' : 'Mute'}</button>
        <audio ref={audioRef} autoPlay loop muted={isMuted}>
          <source src={currentMusic} type="audio/mp3" />
          Your browser does not support the audio element.
        </audio>
      </div>
    </>
  );
}

export default TerminalGame;
