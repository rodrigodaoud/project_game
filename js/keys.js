'use strict'



function Keys(){
    var self = this;

    self.counter = 0;
    self.currentCombination = '';
    // self.randomKeysOne = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'z', 'x', 'c', 'v', 'b', 'n', 'm'];
    self.randomKeysOne = ['q', 'w', 'e', 'r', 'a', 's', 'd', 'f'];
}

Keys.prototype.getRandomKey = function(){
    var self = this;
    //clear currentcombination
    //for i until counter -> add newKey to currentCombination
    self.currentCombination += self.randomKeysOne[Math.floor(Math.random() * self.randomKeysOne.length)];

}

Keys.prototype.increaseCounter = function(){
    var self = this;

    self.counter ++;
}