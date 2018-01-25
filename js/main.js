'use strict'

function main(){

    var mainScreen = document.querySelector('#main-screen');
    var stage;
    var bodyBackground = document.querySelector('body');
    var coins = new Audio('./css/sounds/coins.wav');
    var startScreenSound = new Audio('./css/sounds/thriller.mp3');

    // ------------------ COUNTDOWN SCREEN

    var countdownScreen;
    var countNumbers;
    var numbers;
    var goText = 'Go!';
    var countdownSound = new Audio('./css/sounds/setgo.wav');

    function buildCountdownScreen(){
        stage = 'countdown-screen'

        var counter = 4;

        bodyBackground.style.background = "url('./css/img/stars.gif') no-repeat";
        bodyBackground.style.backgroundSize = '100% 110%';

        countdownScreen = document.createElement('div');
        countdownScreen.classList.add('countdown-screen');
        mainScreen.appendChild(countdownScreen);

        countNumbers = document.createElement('div');
        countNumbers.classList.add('numbers-div');
        countdownScreen.appendChild(countNumbers);

        numbers = document.createElement('h1');
        numbers.classList.add('countdown-numbers');
        countNumbers.appendChild(numbers);

        setInterval(function(){
            counter--;
            if(counter > 0){
                numbers.innerText = counter;
                countdownSound.play();
            }
            if(counter === 0){
                clearInterval(counter);
                buildGameScreen();
            }
            
        }, 600);
    }

    function deleteCountdownScreen(){
        countdownScreen.remove();
    }

    // ------------------ START SCREEN

    var startScreen
    var startGameButton;
    var instructionsButton;

    var startButtonClick = function(){
        coins.play();
        startScreenSound.pause();
        deleteStartScreen();
        buildCountdownScreen(); 

    };

    var startInstructionsButton = function(){ 
        console.log('Instructions button')
    };

    function buildStartScreen (){
        stage = 'start-screen';

        startScreenSound.play();
        startScreenSound.volume = 0.5;
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
    var go; 
    var goText;
    var gameSound = new Audio ('./css/sounds/gameScreenSound.mp3');
    
    function buildGameScreen(){
        stage = 'game';

        bodyBackground.style.background = "url('./css/img/stars.gif') no-repeat";
        bodyBackground.style.backgroundSize = '100% 110%';

        go = document.createElement('div');
        go.classList.add('go-text');
        goText = document.createElement('h1');
        goText.innerText = ('GO!');
        mainScreen.appendChild(go);
        go.appendChild(goText);

        setTimeout(function(){
            go.remove();
        }, 600)



        game = new Game(mainScreen);
        gameSound.play();
        gameSound.volume = 0.5;
        game.onGameOver(function(nameWinner) {
            deleteGameScreen();
            gameSound.pause();
            buildGameOverScreen(nameWinner);
        });

        deleteCountdownScreen();

    }

    function deleteGameScreen(){
        game.destroy();
    }

    // ---------------- GAME OVER SCREEN

    // -- creating dom elements


    var gameOverScreen;
    var playAgainButton;
    var overSound = new Audio ('./css/sounds/supermario.mp3');
    var playAgainButtonClick = function (){
        deleteGameOverScreen();
        buildCountdownScreen();
        coins.play();
        overSound.pause();
        gameSound.currentTime = 0;
    }

    function buildGameOverScreen(nameWinner){
        stage = 'gameOver'

        overSound.play();

        bodyBackground.style.background = "url('./css/img/starsvictory.gif') no-repeat";
        bodyBackground.style.backgroundSize = "100% 110%";
        
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