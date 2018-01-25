'use strict'

function Game(mainScreen){
    var self = this;

    self.keysPlayerOne;
    self.keysPlayerTwo;
    self.playerOne;
    self.playerTwo;
    self.mainScreen = mainScreen;
    self.size = 11;
    self.windowHeight = 800;
    self.windowWidth = 800;
    self.gameDiv;
    self.gameOver;
    self.currentTurn = 1;
    self.sndGoodOne = new Audio ('./css/sounds/good.wav');
    self.sndBadOne = new Audio ('./css/sounds/error.wav');
    self.sndGoodTwo = new Audio ('./css/sounds/good.wav');
    self.sndBadTwo = new Audio ('./css/sounds/error.wav');

    self.handleKeyPressedOne = function (e) {
    
        if(self.keysPlayerOne.validateKey(e.key)){
        
            self.playerOne.addKey(e.key);
            
            self.validateCombinationOne();
            self.checkIfWinnerOne();
            console.log('----- Player 1 ' + self.keysPlayerOne.currentCombination + '---- ' + self.playerOne.lastCombination);
            
        }   
    }

    self.handleKeyPressedTwo = function (e) {
    
        if(self.keysPlayerTwo.validateKey(e.key)){
    
        self.playerTwo.addKey(e.key);

        self.validateCombinationTwo();
        self.checkIfWinnerTwo();
        console.log('----- Player 2' + self.keysPlayerTwo.currentCombination + '---- ' + self.playerTwo.lastCombination);
            
        }   
    }

    self.buildGrid();
    self.buildCombinationDisplayOne();
    self.buildCombinationDisplayTwo();
    self.init();
    
}

Game.prototype.init = function(){
    var self = this;
    self.keysPlayerOne = new KeysOne();
    self.keysPlayerTwo = new KeysTwo();
    
    var middle = Math.floor(self.size / 2);

    self.playerOne = new PlayerOne(middle - 1, 0, self.gameDiv);
    self.playerTwo = new PlayerTwo(middle + 1, self.size - 1, self.gameDiv);

    self.getKeysOne();
    self.getKeysTwo();

    document.addEventListener('keydown', self.handleKeyPressedOne);
    document.addEventListener('keydown', self.handleKeyPressedTwo);
    
}

Game.prototype.validateKeysOne = function(){
    var self = this;

    for(var i = 0; i < self.playerOne.lastCombination.length; i++){
        if(self.playerOne.lastCombination[i] !== self.keysPlayerOne.currentCombination[i]){
            return false;
        }
    }
    
    return true;

}

Game.prototype.validateKeysTwo = function(){
    var self = this;

    for(var i = 0; i < self.playerTwo.lastCombination.length; i++){
        if(self.playerTwo.lastCombination[i] !== self.keysPlayerTwo.currentCombination[i]){
            return false;
        }
    }
    
    return true;

}

Game.prototype.validateCombinationOne = function() {
    var self = this;
    
        if (self.validateKeysOne()) {
            if (self.playerOne.lastCombination.length  === self.keysPlayerOne.counter) {
                // self.correctCombination();
                self.combinationTextOne.style.color = 'rgb(142, 245, 142)';
                self.getKeysOne();
                self.sndGoodOne.play();
                self.moveToOne('down');
                self.playerOne.clearCombination();
            }
            /////
        }
        else {
            // self.wrongCombination();
            self.combinationTextOne.style.color = 'rgb(241, 122, 122)';
            self.sndBadOne.play();
            self.moveToOne('up');
            self.playerOne.clearCombination(); 
        }
}

Game.prototype.validateCombinationTwo = function() {
    var self = this;
    
        if (self.validateKeysTwo()) {
            if (self.playerTwo.lastCombination.length  === self.keysPlayerTwo.counter) {
            // self.correctCombination();
            self.combinationTextTwo.style.color = 'rgb(142, 245, 142)';
            self.getKeysTwo()
            self.sndGoodTwo.play();
            self.moveToTwo('up');
            self.playerTwo.clearCombination();
            }
        }
        else{
            // self.wrongCombination();
            self.combinationTextTwo.style.color = 'rgb(241, 122, 122)';
            self.sndBadTwo.play();
            self.moveToTwo('down');
            self.playerTwo.clearCombination(); 
        }
}

Game.prototype.correctCombination = function(){
    var self = this;

    self.correctDiv = document.createElement('div');
    self.correctDiv.classList.add('correct');
    self.correctText = document.createElement('h1');
    self.correctText.innerText = ('CORRECT!');
    self.gameDiv.appendChild(self.correctDiv);
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
    self.gameDiv.appendChild(self.wrongDiv);
    self.wrongDiv.appendChild(self.wrongText);

    window.setTimeout(function(){
        self.wrongDiv.remove();
    }, 500);
}

Game.prototype.moveToOne = function(direction) {
    var self = this;

    self.playerOne.clear();
    self.playerOne.updateTo(direction);
    self.playerOne.draw();
}

Game.prototype.moveToTwo = function(direction) {
    var self = this;

    self.playerTwo.clear();
    self.playerTwo.updateTo(direction);
    self.playerTwo.draw();
}

Game.prototype.getKeysOne = function(){
    var self = this;

    self.keysPlayerOne.increaseCounter();
    self.keysPlayerOne.getRandomKey();
    self.updateCombinationElement();
    
    console.log('current combination 1:' + self.keysPlayerOne.currentCombination);
    
}

Game.prototype.getKeysTwo = function(){
    var self = this;

    self.keysPlayerTwo.increaseCounter();
    self.keysPlayerTwo.getRandomKey();
    self.updateCombinationElement();
    
    console.log('current combination 2:' + self.keysPlayerTwo.currentCombination);
    
}

Game.prototype.updateCombinationElement = function () {
    var self = this;

    self.combinationTextOne.innerText = self.keysPlayerOne.currentCombination;
    self.combinationTextTwo.innerText = self.keysPlayerTwo.currentCombination;
}

Game.prototype.checkIfWinnerOne = function() {
    var self = this;

    if (self.playerOne.y === self.size -1){
        self.gameOver('Player One');
    }
    //check if any player if on the winner zone
    //If that is the case we invoke self.gameOver();

}

Game.prototype.checkIfWinnerTwo = function() {
    var self = this;

    if (self.playerTwo.y === 0){
        self.gameOver('Player Two');
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

    document.removeEventListener('keydown', self.handleKeyPressedOne);
    document.removeEventListener('keydown', self.handleKeyPressedTwo);
    self.combinationDivOne.remove();
    self.combinationDivTwo.remove();
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
    gameRow[0].style.borderBottom = '1px solid #add8e6';
    gameRow[0].style.borderRadius = '20px'
    gameRow[self.size -1].style.borderTop = '1px solid #bf0000';
    gameRow[self.size -1].style.borderRadius = '20px'
}

Game.prototype.buildCombinationDisplayOne = function(){
    var self = this;

    self.combinationDivOne = document.createElement('div');
    self.combinationDivOne.classList.add('combo-display-one');
    self.combinationTextOne = document.createElement('h1');
    self.combinationDivOne.appendChild(self.combinationTextOne);
    self.mainScreen.appendChild(self.combinationDivOne);
}

Game.prototype.buildCombinationDisplayTwo = function(){
    var self = this;

    self.combinationDivTwo = document.createElement('div');
    self.combinationDivTwo.classList.add('combo-display-two');
    self.combinationTextTwo = document.createElement('h1');
    self.combinationDivTwo.appendChild(self.combinationTextTwo);
    self.mainScreen.appendChild(self.combinationDivTwo);

}


