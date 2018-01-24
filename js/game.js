'use strict'

function Game(mainScreen){
    var self = this;

    self.keysPlayerOne;
    self.keysPlayerTwo;
    self.player;
    self.mainScreen = mainScreen;
    self.size = 11;
    self.windowHeight = 800;
    self.windowWidth = 800;
    self.gameDiv;
    self.gameOver;

    self.handleKeyPressed = function (e) {

        if(e.key >= 'a' && e.key <= 'z'){

        self.player.addKey(e.key);

        self.validateCombination();
        self.checkIfWinnerOne();
        console.log('----- ' + self.keysPlayerOne.currentCombination + '---- ' + self.player.lastCombination);
        
        }   
    }

    self.buildGrid();
    self.buildCombinationDisplay();
    self.init();
    
}

Game.prototype.validateCombination = function() {
    var self = this;
    
    if (self.keysPlayerOne.counter === self.player.lastCombination.length) {
        if (self.keysPlayerOne.currentCombination === self.player.lastCombination) {
            self.correctCombination();
            self.getKeys()
            self.moveTo('down');
        }
        else{
            
            self.wrongCombination();
            self.moveTo('up');
        }

        self.player.clearCombination();
    } 
}

Game.prototype.correctCombination = function(){
    var self = this;

    self.correctDiv = document.createElement('div');
    self.correctDiv.classList.add('correct');
    self.correctText = document.createElement('h1');
    self.correctText.innerText = ('CORRECT!');
    self.mainScreen.appendChild(self.correctDiv);
    self.correctDiv.appendChild(self.correctText);

    window.setTimeout(function(){
        self.correctDiv.remove();
    }, 500);
}

Game.prototype.wrongCombination = function(){
    var self = this;

    self.wrongDiv = document.createElement('div');
    self.wrongDiv.classList.add('wrong');
    self.wrongText = document.createElement('h1');
    self.wrongText.innerText = ('WRONG!');
    self.mainScreen.appendChild(self.wrongDiv);
    self.wrongDiv.appendChild(self.wrongText);

    window.setTimeout(function(){
        self.wrongDiv.remove();
    }, 500);
}


Game.prototype.moveTo = function(direction) {
    var self = this;

    self.player.clear();
    self.player.updateTo(direction);
    self.player.draw();
}

Game.prototype.init = function(){
    var self = this;
    self.keysPlayerOne = new Keys();
    
    var middle = Math.floor(self.size / 2);
    self.playerOne = new PlayerOne(middle - 1, 0, self.gameDiv);

    self.getKeys();

    document.addEventListener('keydown', self.handleKeyPressed);
    
}

Game.prototype.getKeys = function(){
    var self = this;

    self.keysPlayerOne.increaseCounter();
    self.keysPlayerOne.getRandomKey();
    self.updateCombinationElement();
    
    console.log('current combination :' + self.keysPlayerOne.currentCombination);
    
}

Game.prototype.updateCombinationElement = function () {
    var self = this;
    self.combinationText.innerText = self.keysPlayerOne.currentCombination;
}

Game.prototype.checkIfWinnerOne = function() {
    var self = this;

    if (self.player.y === self.size -1){
        self.gameOver();
    }
    //check if any player if on the winner zone
    //If that is the case we invoke self.gameOver();

}
Game.prototype.checkIfWinnerTwo = function() {
    var self = this;

    if (self.player.y === self.size -1){
        self.gameOver();
    }
    //check if any player if on the winner zone
    //If that is the case we invoke self.gameOver();

}

Game.prototype.onGameOver = function(callback) {
    var self = this;

    self.gameOver = callback;
}

Game.prototype.destroy = function(){
    var self = this;

    document.removeEventListener('keydown', self.handleKeyPressed);
    self.combinationDiv.remove();
    self.gameDiv.remove();
}

Game.prototype.buildGrid = function() {
    var self = this;

    self.gameDiv = document.createElement('div');
    self.gameDiv.classList.add('game-screen');
    self.gameDiv.style.display = 'inline-block';
    self.mainScreen.appendChild(self.gameDiv); 
    
    for (var i = 0; i < self.size; i++){
        var gameRow = document.createElement('div');
        gameRow.classList.add('game-row');
        gameRow.style.height = self.windowHeight / self.size + 'px';
        self.gameDiv.appendChild(gameRow);

        for (var j = 0; j < self.size; j++){
            var gameColumn = document.createElement('div');
            gameColumn.classList.add('game-column');
            gameColumn.style.width = self.windowWidth / self.size + 'px';
            gameRow.appendChild(gameColumn);
        }
    }

    gameRow = document.querySelectorAll('.game-row');
    gameRow[0].style.border = '1px solid #add8e6';
    gameRow[0].style.borderRadius = '20px'
    gameRow[self.size -1].style.border = '1px solid #bf0000';
    gameRow[self.size -1].style.borderRadius = '20px'
}

Game.prototype.buildCombinationDisplay = function(){
    var self = this;

    self.combinationDiv = document.createElement('div');
    self.combinationDiv.classList.add('combo-display-one');
    self.combinationText = document.createElement('h1');
    self.combinationDiv.appendChild(self.combinationText);
    self.mainScreen.appendChild(self.combinationDiv);

}


