import React, { useEffect, useRef } from 'react';
import $ from 'jquery'; // Import jQuery
import 'jquery.terminal/css/jquery.terminal.min.css';
import 'jquery.terminal/js/jquery.terminal.min.js';
import axios from 'axios';
import './TerminalGame.scss';

function TerminalGame() {
  const terminalRef = useRef(null);

  useEffect(() => {
    const terminal = $(terminalRef.current); // Use jQuery from the import

    // Function to handle errors in the terminal
    const handleTerminalError = (message) => {
      terminal.error(message);
    };

    // Fetch scenes and transitions data
    axios
      .get('http://localhost:5050/scenes')
      .then((response) => {
        console.log('Scenes data:', response.data);
        const scenes = response.data.scenes;

        return axios.get('http://localhost:5050/transitions')
          .then((response) => {
            console.log('Transitions data:', response.data);
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
                    if (scenes[nextScene].hint) {
                      terminal.echo(`Hint: ${scenes[nextScene].hint}`);
                    }
                  } else {
                    handleTerminalError('Invalid command. Please choose a valid option.');
                  }
                } else if (lowerCommand === 'help') {
                  const helpScene = scenes.help;
                  terminal.echo(helpScene.description);
                  if (helpScene.hint) {
                    terminal.echo(`Hint: ${helpScene.hint}`);
                  }
                } else {
                  handleTerminalError('Invalid command. Please choose a valid option.');
                }
              }
            }, {
              greetings: scenes.start.description,
              prompt: '> ',
            });
          });
      })
      .catch((error) => {
        handleTerminalError('Error fetching data: ' + error.message);
      });
  }, []);

  return (
    <div className="terminal-container">
      <div ref={terminalRef}></div>
    </div>
  );
}

export default TerminalGame;
