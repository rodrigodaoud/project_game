'use strict'

function main(){

    var mainScreen = document.querySelector('#main-screen');
    var stage;
   
    var bodyBackground = document.querySelector('body');
    var snd = new Audio('./css/sounds/coins.wav');

    // ------------------ COUNTDOWN SCREEN

    var countdownScreen;
    var countNumbers;
    var numbers;

    function buildCountdownScreen(){
        stage = 'countdown-screen'

        countdownScreen = document.createElement('div');
        countdownScreen.classList.add('countdown-screen');
        mainScreen.appendChild(countdownScreen);

        countNumbers = document.createElement('div');
        countNumbers.classList.add('numbers-div');
        countdownScreen.appendChild(countNumbers);

    }

    // ------------------ START SCREEN

    var startScreen
    var startGameButton;
    var instructionsButton;

    var startButtonClick = function(){ 
        snd.play();
        deleteStartScreen();
        buildGameScreen(); 

    };

    var startInstructionsButton = function(){ 
        console.log('Instructions button')
    };

    function buildStartScreen (){
        stage = 'start-screen';

        // -- creeating dom elements
        // -- main-div
        startScreen = document.createElement('div');
        startScreen.classList.add('start-screen');
        mainScreen.appendChild(startScreen);
            // -- title
        var gameTitle = document.createElement('div');
        gameTitle.classList.add('game-title');
        startScreen.appendChild(gameTitle);

        var title = document.createElement('h1');
        title.innerHTML = 'LUCKY COMBO' + '<br/>' + 'THE GAME';
        gameTitle.appendChild(title);
        // -- buttons
        var buttons = document.createElement('div');
        buttons.classList.add('start-button');
        startScreen.appendChild(buttons);

        var startButtonDiv = document.createElement('div');
        startButtonDiv.classList.add('play');
        buttons.appendChild(startButtonDiv);

        startGameButton = document.createElement('button');
        startGameButton.innerHTML = 'PLAY';
        startButtonDiv.appendChild(startGameButton);
        
        var instrButtonDiv = document.createElement('div');
        instrButtonDiv.classList.add('inst');
        buttons.appendChild(instrButtonDiv);

        instructionsButton = document.createElement('button');
        instructionsButton.innerHTML = 'INSTRUCTIONS';
        instrButtonDiv.appendChild(instructionsButton);

        // eventListener to startButton
        startGameButton.addEventListener('click', startButtonClick);
        instructionsButton.addEventListener('click', startInstructionsButton);
        

    }

    function deleteStartScreen(){
        //remove eventListerner from startButton
        startGameButton.removeEventListener('click', startButtonClick);
        instructionsButton.removeEventListener('click', startInstructionsButton);
        // remove startScreen
        startScreen.remove();
    }

    // ------------------ GAME SCREEN

    var game;
    var gameDiv;   
    
    function buildGameScreen(){
        stage = 'game';

        bodyBackground.style.background = "url('./css/img/stars.gif') no-repeat";
        bodyBackground.style.backgroundSize = '100% 110%';


        game = new Game(mainScreen);
        game.onGameOver(function(nameWinner) {
            deleteGameScreen();
            buildGameOverScreen(nameWinner);
        });

    }

    function deleteGameScreen(){
        game.destroy();
    }

    // ---------------- GAME OVER SCREEN

    // -- creating dom elements


    var gameOverScreen;
    var playAgainButton
    var playAgainButtonClick = function (){
        deleteGameOverScreen();
        buildGameScreen();
    }

    function buildGameOverScreen(nameWinner){
        stage = 'gameOver'

        bodyBackground.style.background = "url('./css/img/trophy.gif') no-repeat";
        bodyBackground.style.backgroundSize = "20% 20%";
        bodyBackground.style.backgroundPosition = '50% 40%';
        bodyBackground.style.backgroundColor = 'black';
        
        gameOverScreen = document.createElement('div');
        gameOverScreen.style.display = 'flex';
        gameOverScreen.classList.add('gameover-screen');
        // -- titles
        var playerWinnerDiv = document.createElement('div')
        playerWinnerDiv.classList.add('player-winner');
        
        var playerWinnerTitle = document.createElement('h1');
        playerWinnerTitle.innerText = nameWinner;
        playerWinnerDiv.appendChild(playerWinnerTitle);
        
        gameOverScreen.appendChild(playerWinnerDiv);
        
        var victoryDiv = document.createElement('div');
        victoryDiv.classList.add('victory');
        
        var victoryTitle = document.createElement('h1');
        victoryTitle.innerText = 'VICTORY!';
        victoryDiv.appendChild(victoryTitle);

        gameOverScreen.appendChild(victoryDiv);
        //-- buttons
        var buttonsOver = document.createElement('div')
        buttonsOver.classList.add('playagain-button');
        
        playAgainButton = document.createElement('button');
        playAgainButton.innerHTML = 'PlAY AGAIN';
        buttonsOver.appendChild(playAgainButton);
        gameOverScreen.appendChild(buttonsOver);

        mainScreen.appendChild(gameOverScreen);

        //eveneListener to playAgainButton
        playAgainButton.addEventListener('click', playAgainButtonClick);

    }
    
    function deleteGameOverScreen(){

        //remove eventListener from playAgainButton
        playAgainButton.removeEventListener('click', playAgainButtonClick);
        gameOverScreen.remove();
    }


    buildStartScreen();
}
window.onload = main;