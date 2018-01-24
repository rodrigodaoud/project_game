'use strict'

function PlayerTwo(x, y, containerElement, color){
    var self = this;
    self.x = x;
    self.y = y;
    self.lastCombination;
    self.color = color;
    self.containerElement = containerElement;

    self.winner = false;
    self.size = 11;

    self.init();
}

PlayerTwo.prototype.init = function () {
    var self = this;

    self.lastCombination = '';
    self.draw();

}

PlayerTwo.prototype.draw = function() {
    var self = this;

    var cell = self.containerElement.children[self.y].children[self.x];

    
    cell.style.background = "url('./css/img/ship2.png') no-repeat";
    cell.style.backgroundSize = '100% 100%';
    cell.style.transform = 'rotate(180deg)'; 
    
}

PlayerTwo.prototype.updateTo = function(direction) {
    var self = this;

    switch (direction){
        case 'up':
            self.y -= 1;
            break;
        case 'down':
            self.y += 1;
            break;
        case 'right':
            self.x += 1;
            break;
        case 'left':
            self.x -= 1;
            break;   
    }

    self.checkLimits();

}

PlayerTwo.prototype.checkLimits = function(){
    var self = this;

    if (self.x > self.size -1) {
        self.x = self.size -1;
      }
      if (self.x < 0) {
        self.x = 0;
      }
      if (self.y > self.size -1) {
        self.y = self.size - 1;
      }
} 

PlayerTwo.prototype.clearCombination = function() {
    var self = this;
    
    self.lastCombination = '';
}

PlayerTwo.prototype.addKey = function(key) {
    var self = this;

    self.lastCombination += key;
}

PlayerTwo.prototype.clear = function(){
    var self = this;
    
    var cell = self.containerElement.children[self.y].children[self.x];

    cell.style.background = 'transparent';
}