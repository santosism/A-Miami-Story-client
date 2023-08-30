import React, { useEffect, useRef } from 'react';
import $ from 'jquery'; // Import jQuery
import 'jquery.terminal/css/jquery.terminal.min.css';
import 'jquery.terminal/js/jquery.terminal.min.js';
import axios from 'axios';



function TerminalGame() {

  const terminalRef = useRef(null);
  
  
  useEffect(() => {
    
    const terminal = $(terminalRef.current); // Use jQuery from the import
    
    // function saveGameDataToServer(userId, gameData) {
    //   const requestData = {
    //     userId: userId,
    //     gameData: gameData
    //   };
    
    //   axios.post('/saveGameData', requestData)
    //     .then(response => {
    //       terminal.echo(response.data.message);
    //     })
    //     .catch(error => {
    //       terminal.error('Error saving game data:', error);
    //     });

    const transitions = {
      start: {
        start: 'versaillesCafe',
      },
      versaillesCafe: {
        walk: 'walking',
        uber: 'uber',
        metrorail: 'metrorail',
        help: 'help',
      },
      walking: {
        continue: 'continueWalking',
      },
      continueWalking: {
        walk: 'traffic',
      },
      traffic: {
        argue: 'panic',
      },
      panic: {
        store: 'visitStore',
      },
      uber: {
        wait: 'keepWaiting',
      },
      keepWaiting: {
        wait: 'moreWaiting',
      },
      moreWaiting: {
        enter: 'carRide',
      },
      metrorail: {
        proceed: 'demoDay',
      },
      help: {
        back: 'versaillesCafe',
      },
    };



    const scenes = {
      start: {
        description:
          "Welcome to A Miami Story! Here are some player controls:\n- Type the option's text to make a choice.\n- You'll have some options, but if you ever need a reminder, type 'help' Choose the best option to reach BrainStation for Demo Day!\nGood luck!",
        choices: [
          { text: 'start', nextScene: 'versaillesCafe' },
          {
       image:
          'https://firebasestorage.googleapis.com/v0/b/a-miami-story.appspot.com/o/pixel%20art%20miami%20beach.jpg?alt=media&token=0f344778-940a-4c55-a90f-5641e0f24b67'
          }
        ],
      },
      versaillesCafe: {
        description:
          "You're at Versailles Cafe at 8 am. It's a bright morning. And you have plenty of time, right?",
        choices: [
          { text: 'walk', nextScene: 'walking', hint: "Enjoy the fresh air and the scenic route." },
          { text: 'uber', nextScene: 'uber', hint: "Ride in comfort with a driver." },
          { text: 'metrorail', nextScene: 'metrorail', hint: "Use public transportation for a crowded but efficient journey." },
          { text: 'help', nextScene: 'help', hint: "Get a reminder of the controls." },
        ],
      },
      walking: {
        description:
          "You've decided to walk to BrainStation. It's a long journey, but the weather is nice.\n\n- Type the option's text to make a choice.\n- Choose the best option to reach BrainStation for Demo Day!",
        choices: [
          { text: 'continue', nextScene: 'continueWalking' },
        ],
      },
      continueWalking: {
        description:
          "So, you've decided to walk to BrainStation. Brave choice, especially with this sun. So, you walk. \nAnd you walk. And the streets of Miami teem with cars, and the smell of gasoline hits your nose. Suddenly, \nyou hear a strange noise. ",
        choices: [
          { text: 'walk', nextScene: 'traffic' },
        ],
      },
      traffic: {
        description:
          "Welp. You feel like you've been walking for forever. In reality, you have been walking for about twenty minutes. The croquettas and cafecito you ate in a rush before deciding to walk are not sitting well with you. But no matter, you have to make it to Demo Day to see all the cool projects. You make it to 27th avenue, on Calle Ocho.",
        choices: [
          { text: "argue", nextScene: "panic" },
        ],
      },
      panic: {
        description:
          "Panic sets in. A pile-up has happened, cars are blocking the road, the streets are blistering hot. And you have no water bottle on you. You could always take a quick detour to get some water at a local bodega. Maybe that'll help you cool off.",
        choices: [
          { text: "store", nextScene: "visitStore" },
        ],
      },
      uber: {
        description:
          "You've ordered an Uber to BrainStation. The driver is on their way.\n\n- Type the option's text to make a choice.\n- Choose the best option to reach BrainStation for Demo Day!",
        choices: [
          { text: 'wait', nextScene: 'keepWaiting' },
        ],
      },
      keepWaiting: {
        description:
          "You picked the quickest option, but Miami traffic has no regard for human life, nor your time. You stare at your phone, but no notification so far. You look around you, the bakery slowly filling up with a gaggle of Miamians and tourists. You decide to head outside and wait near the coffee window.",
        choices: [
          { text: "wait", nextScene: "moreWaiting" },
        ],
      },
      moreWaiting: {
        description:
          "A five minute wait has turned into a loop of waiting.\n Your initial Uber ride cancelled on you. The line outside of Versailles has grown into a frenzy. ",
        choices: [
          { text: "enter", nextScene: "carRide" },
        ],
      },
      carRide: {
        description: 
        "You enter the car. You were expecting some nice AC. but the smell of the dankest of dank weed has hit your nostrils. You could go out and get another car, but that means more waiting. So, you steel yourself forward. The driver stares straight ahead, and does not wait for you to put on your seatbelt while he's putting pedal to the metal, trying to beat the crush of traffic on 27th street.",
        choices: [
          { text: "hold", nextScene: "carPanic"}
        ]
      },
      metrorail: {
        description:
          "You've taken the Metrorail and a bus to reach BrainStation. The public transport is crowded but efficient.\n\n- Type the option's text to make a choice.\n- Choose the best option to reach BrainStation for Demo Day!",
        choices: [
          { text: 'proceed', nextScene: 'demoDay' },
        ],
      },
      demoDay: {
        description: "Congratulations! You've made it to BrainStation for Demo Day! The event starts at 3 pm.",
        choices: [],
      },
      help: {
        description:
          "Welcome to A Miami Story! Here are some player controls:\n- Type the option's text to make a choice.\n- Choose the best option to reach BrainStation for Demo Day!\nGood luck!\n\n- Type 'back' to return to the previous scene.",
        choices: [
          { text: 'back', nextScene: 'versaillesCafe' },
        ],
      },
    };
    
    let currentScene = 'start';

    terminal.terminal(
      (command, terminal) => {
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
              terminal.error('Invalid command. Please choose a valid option.');
            }
          } else if (lowerCommand === 'help') {
            const helpScene = scenes.help;
            terminal.echo(helpScene.description);
            if (helpScene.hint) {
              terminal.echo(`Hint: ${helpScene.hint}`);
            }
          } else {
            terminal.error('Invalid command. Please choose a valid option.');
          }
        }
      },
      {
        greetings: scenes.start.description,
        prompt: '> ',
      }
    );
  }, []);

  return (
    <div className="terminal-container">
      <div ref={terminalRef}></div>
    </div>
  );
}

export default TerminalGame;