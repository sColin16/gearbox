import { AsyncPlayer } from "../../core/players.js";

// Class that implements the gearbox API to let a human play Rock, Paper, Scissors in the browser
// Note that this class must be coupled to elements on the webpage
export class HumanRPSPlayer extends AsyncPlayer {
    constructor() {
        super();

        // Bind all the action buttons and display elements on the webpage
        this.rockButton = document.getElementById('rock-btn');
        this.paperButton = document.getElementById('paper-btn');
        this.scissorsButton = document.getElementById('scissors-btn');

        this.p1ActionDisplay = document.getElementById('p1-action-display');
        this.p2ActionDisplay = document.getElementById('p2-action-display');
        this.outcomeDisplay = document.getElementById('outcome-display');

        // Add the event listeners to submit moves
        this.rockButton.addEventListener('click', () => this.takeAction('R'));
        this.paperButton.addEventListener('click', () => this.takeAction('P'));
        this.scissorsButton.addEventListener('click', () => this.takeAction('S'));
    }

    startTurnActions(state) {}

    endTurnActions(state) {}

    // Dummy function, could be expanded to prepare page elements
    handleGameStart(moderator, state) {}

    // Primary function to let the human know what just happened
    handleOutcome(moderator, outcome) {
        // Print out the outcome for testing purposes
        console.log('Turn outcome', outcome);

        // Handle if the turn was valid or not (which doesn't really happen)
        if (!outcome.validity.overall) {
            if(!outcome.validity.personal) {
                this.outcomeDisplay.innerText = 'You made an invalid move';
            } else {
                this.outcomeDisplay.innerText = 'An opponent made an invalid move';
            }

            return;
        }

        // Display what move each player made
        this.p1ActionDisplay.innerText = 'You played ' + outcome.action.repr.personal;
        this.p2ActionDisplay.innerText = 'Opponent played ' + 
            outcome.action.repr.opponents[0];

        // Report the outcome of that turn
        if(outcome.utilities.personal === 1) {
            this.outcomeDisplay.innerText = 'You win!';
        } else if (outcome.utilities.personal === 0) {
            this.outcomeDisplay.innerText = 'It\'s a tie!';
        } else {
            this.outcomeDisplay.innerText = 'You lose!';
        }
    }

    // Another dummy function where the UI could be updated to alert the human of something
    handleGameEnd() {}
}
