'use strict'



function KeysTwo(){
    var self = this;

    self.counter = 0;
    self.currentCombination = '';
    self.randomKeys = ['i', 'j', 'k', 'l'];
}

KeysTwo.prototype.getRandomKey = function(){
    var self = this;
    //clear currentcombination
    //for i until counter -> add newKey to currentCombination
    self.currentCombination += self.randomKeys[Math.floor(Math.random() * self.randomKeys.length)];

}

KeysTwo.prototype.validateKey = function(key) {
    var self = this;
    return self.randomKeys.includes(key);

}

KeysTwo.prototype.increaseCounter = function(){
    var self = this;

    self.counter ++;
}