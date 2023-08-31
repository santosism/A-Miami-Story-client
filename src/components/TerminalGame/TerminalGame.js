import React, { useEffect, useRef } from 'react';
import $ from 'jquery'; // Import jQuery
import 'jquery.terminal/css/jquery.terminal.min.css';
import 'jquery.terminal/js/jquery.terminal.min.js';
import axios from 'axios';
import './TerminalGame.scss';


function TerminalGame() {


  //have branches that still come together

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


    //commands for walking: move and look
    //commands for uber: wait and continue
    //commands for metrorail: enter and exit

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
        move: 'continueWalking',
      },
      continueWalking: {
        look: 'traffic',
      },
      traffic: {
        look: 'panic',
      },
      panic: {
        move: 'visitStore',
      },
      visitStore: {
        look: "stillInStore",
      },
      stillInStore: {
        look: "stillInTheStore",
      },
      stillInTheStore: {
        move: "inTheRain",
      },
      inTheRain: {
        move: "stillWalking",
      },
      stillWalking: {
        look: "timePasses",
      },
      timePasses:{
        move: "demoDay1",
      },
      uber: {
        wait: 'keepWaiting',
      },
      keepWaiting: {
        wait: 'moreWaiting',
      },
      moreWaiting: {
        wait: 'carRide',
      },
      carRide: {
        continue: "carPanic",
      },
      carPanic: {
        continue: "bridge",
      },
      bridge: {
        wait: "waitForBridge",
      },
      waitForBridge: {
        wait: "freeBridge",
      },
      freeBridge: {
        continue: "demoDay2",
      },
      metrorail: {
        enter: "easyCard",
      },
      easyCard: {
        enter: "metroRide",
      },
      metroRide: {
        enter: "stuck",
      },
      stuck: {
        exit: "metroWaiting",
      },
      metroWaiting: {
        exit: "metroMoving",
      },
      metroMoving: {
        exit: "lastBus",
      },
      lastBus: {
        enter: "demoDay3",
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
          "You've decided to walk to BrainStation. It's a long journey, but the weather is nice.",
        choices: [
          { text: 'move', nextScene: 'continueWalking' },
        ],
      },
      continueWalking: {
        description:
          "\nSo, you walk. \nAnd the streets of Miami teem with cars, and the smell of gasoline hits your nose. Suddenly, \nyou hear a strange noise to your right. ",
        choices: [
          { text: 'look', nextScene: 'traffic' },
        ],
      },
      traffic: {
        description:
          "\nYou feel like you've been walking for forever. \nYou make it to 27th avenue, on Calle Ocho. \nBut, just as you're about to cross the street, a loud smack of metal is heard to your right. You turn and see it",
        choices: [
          { text: "look", nextScene: "panic" },
        ],
      },
      panic: {
        description:
          "\nA pile-up has happened, cars are blocking the road, the streets are blistering hot\n A Standstill. You could always take a quick detour to get some water at a local bodega. Maybe that'll help you cool off.",
        choices: [
          { text: "move", nextScene: "visitStore" },
        ],
      },
      visitStore: {
        description:
          "Everything in the store tightly packed together, packed shelves of random assortments of energy drinks, cigarette brands, and Takis variations. \nYou pay for a bottle of water. And then, the rain starts. \n:Like someone turned on a water faucet somewhere and forgot to turn it off. The rain is roaring now, the sun blotted out. \n You should wait, right?",
        choices: [
          { text: "look", nextScene: "stillInStore" },
        ],
      },
      stillInStore: {
        description:
          "You wait. \n And wait. You buy chips, an energy drink. \n The rain is still going strong. \n You should probably wait some more, right? ",
        choices: [
          { text: "look", nextScene: "stillInTheStore" }
        ],
      },
      stillInTheStore: {
        description:
          "\nWhat should have been a five minute visit to the store is now three hours later. \n The rain has not let up. You can't wait any longer. \n You'll keep on walking.",
        choices: [
          { text: "move", nextScene: "inTheRain" }
        ],
      },
      inTheRain: {
        description:
          "\n The rain is pouring now, and you can feel the cold air impeding your progress. \n You're closer to the bridge leading into Wynwood. It is 1 pm. ",
        choices: [
          { text: "move", nextScene: "stillWalking" }
        ],
      },
      stillWalking: {
        description:
          "\n Just as you're about to start crossing over the bridge,  the bridge alarm starts going off. \nThe bridge is going up, and the rain is still pouring. \n You see a hundred yachts on the horizon. ",
        choices: [
          { text: "look", nextScene: "timePasses" }
        ],
      },
      timePasses: {
        description:
          "\n The rain continues. The bridge is still up. \n It's 2 pm. \n More time passes. \n Finally, the bridge does down, and you can keep walking.",
        choices:
          [
            { text: "move", nextScene: "demoDay1" }
          ],
      },
      uber: {
        description:
          "\nYou've ordered an Uber to BrainStation. The driver is on their way.\n\n- Type the option's text to make a choice.\n- Choose the best option to reach BrainStation for Demo Day!",
        choices: [
          { text: 'wait', nextScene: 'keepWaiting' },
        ],
      },
      keepWaiting: {
        description:
          "\nYou picked the quickest option, but Miami traffic has no regard for human life, nor your time. You stare at your phone, but no notification so far. You look around you, the bakery slowly filling up with a gaggle of Miamians and tourists. You decide to head outside and wait near the coffee window.",
        choices: [
          { text: "wait", nextScene: "moreWaiting" },
        ],
      },
      moreWaiting: {
        description:
          "\nA five minute wait has turned into a loop of waiting.\n Your initial Uber ride cancelled on you. The line outside of Versailles has grown into a frenzy. You keep waiting ",
        choices: [
          { text: "wait", nextScene: "carRide" },
        ],
      },
      carRide: {
        description:
          "\nYou enter the car. You were expecting some nice AC. but the smell of the dankest of dank weed has hit your nostrils. You could go out and get another car, but that means more waiting. So, you steel yourself forward. The driver stares straight ahead, and does not wait for you to put on your seatbelt while he's putting pedal to the metal, trying to beat the crush of traffic on 27th street.",
        choices: [
          { text: "continue", nextScene: "carPanic" }
        ],
      },
      carPanic: {
        description:
          "\n The uber is weaving  in and out of lanes, and hey, you're making good progres. It's like in no time at all, you'll make it to the end. But, the car is weaving crazily. And you did waste an hour waiting....\nand getting dangerously close to other cars. Your head is swimming from the weed smell and the veering of the car, but you try to block it out. You're almost there.",
        choices: [
          { text: "continue", nextScene: "bridge" }
        ]
      },
      bridge: {
        description:
          "\n The car finally stops weaving through traffic to make it to a red light, you're now on thirteenth avenue, just about to leave Calle Ocho/Little Havana. \n- It should be smooth sailing now, right? But you notice your uber driver gripping the wheel very tight, and as you rumble along, you can see why: the north bridge is up. And traffic is at a standstill. No amount of weaving or dodging will change the reality you're in now: \n You're stuck in traffic.",
        choices: [
          { text: "wait", nextScene: "waitForBridge" }
        ],
      },
      waitForBridge: {
        description: 
        "\n The bridge is still up. ",
        choices: [
          { text: "wait", nextScene: "freeBridge"}
        ],
      },
      freeBridge: {
        description:
        "\nThe bridge is down, and you are free to go...or in this case, your uber Driver can hightail it there. Hold on!",
        choices: [
          { text: "continue", nextScene: 'demoDay2'}
        ],
      },
      metrorail: {
        description:
          "\nYou've decided to take the Metrorail to reach BrainStation.Should be easy, right?  The public transport is usually crowded but efficient.\n\n- Type the option's text to make a choice.\n- Choose the best option to reach BrainStation for Demo Day!",
        choices: [
          { text: 'enter', nextScene: 'easyCard' },
        ],
      },
      easyCard: {
        description:
          "\n You're outside Versailles, bro, and while you have time, time is not on your side. \n-One free trolley ride,  One hour has elapsed. \n -You're at the Brickell metrorail station. Time to buy an EasyCard and ride. ",
        choices: [
          { text: 'enter', nextScene: 'metroRide' }
        ],
      },

      metroRide:{
        description:
        "\n High up in the sky, about 40 feet, the Metro car is running fast. People stare out the windows. You do, too. \n The downtown horizon shifts away, the skyscrapers, finished and unfinished, blurry in the distance.", 
        choices: [
        { text: "enter", nextScene: "stuck" }
        ],
      },
      stuck: {
        description: 
        "And then, just as quickly as you're moving, the train slowly stops moving. \nThe wheels stop running.\nThe car is stuck on the middle of the track. No way to leave, and you feel the wind moving about the outisde.",
        choices: [
          { text: "exit", nextScene: "metroWaiting"}
        ],
      },
      metroWaiting: {
        description:
        "It's been thirty minutes. \nThe metrocar is still stuck. There's been one announcement, saying that things will be cleared up and moving soon. \nYou hope. It is 1:30 pm.",
        choices: [
          { text: "exit", nextScene: "metroMoving"}
        ],
      },
      metroMoving: {
        description: 
        "A further twenty minutes later, with no updates over the intercom, you think you have no chance.\nSuddenly, a jolt, and you're moving again.",
        choices: [
          { text:"exit", nextScene: "lastBus"}
        ],
      },
      lastBus: {
        description: 
        "You're almost there.\nBut time is rushing by. If you hurry, the bus should get you there. Hurry!", 
        choices: [
          { text: "enter", nextScene: "demoDay3"}
        ],
      },
      demoDay1: {
        description: "\n-Congratulations! You've made it to BrainStation for Demo Day, even though the rain made a mess of things! Dry off and get ready: The event starts at 3 pm.",
        choices: [],
      },
      demoDay2: {
        description: "\n-Congratulations! It is now 2:59 pm, but you made it to Brainstation's Demo Day. Your nerves may be shaky from the Uber-ing, but you made it!",
        choices: [],
      },
      demoDay3:{
        description: "\n-Congratulations! You made it, a few minutes, give or take. But you made it to Brainstation's Demo Day. Drink some water, stretch, and check out all the cool projects!",
        choices: [],
      },
      help: {
        description:
          "\n-Welcome to A Miami Story! Here are some player controls:\n- Type the option's text to make a choice.\n- Choose the best option to reach BrainStation for Demo Day!\nGood luck!\n\n- Type 'back' to return to the previous scene.",
        choices: [
          { text: 'back', nextScene: 'versaillesCafe' },
        ],
      },
    };

    //dominoes carreta cuban

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