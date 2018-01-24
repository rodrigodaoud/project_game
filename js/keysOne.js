'use strict'



function KeysOne(){
    var self = this;

    self.counter = 0;
    self.currentCombination = '';
    self.randomKeys = ['w', 'a', 's', 'd'];
}

KeysOne.prototype.getRandomKey = function(){
    var self = this;
    //clear currentcombination
    //for i until counter -> add newKey to currentCombination
    self.currentCombination += self.randomKeys[Math.floor(Math.random() * self.randomKeys.length)];

}

KeysOne.prototype.validateKey = function(key) {
    var self = this;

    return self.randomKeys.includes(key);

}


KeysOne.prototype.increaseCounter = function(){
    var self = this;

    self.counter ++;
}