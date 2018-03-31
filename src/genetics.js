/*
Rocco Manzo - Rmanzo
3/28/18
*/

var Genetics = function(populationSize, selectionSize, mutationRate) {
  this.populationSize = populationSize;
  this.selectionSize = selectionSize;
  this.mutationRate = mutationRate;
}

Genetics.prototype = {
  // creates initial population
  init : function() {
    this.population = [];
    for (var i = 0; i < this.populationSize; i++) {
      var newUnit = new synaptic.Architect.Perceptron(0,0,0);
      newUnit.index = i;
      newUnit.fitness = 0;
      newUnit.score = 0;
      this.population.push(newUnit);
    }
  },

  getWinner : function() {
    return this.population[Math.floor(Math.random()*this.selectionSize)];
  },

  //evolves the population
  evolvePopulation : function() {

    this.population.sort(function(unit1, unit2) {
      return unit1.fitness < unit2.fitness;
    });

    // uncomment this when makeBabyDino is implemented
    // for(var i = this.selectionSize; i < this.populationSize; i++){ //makes baby dinos
    //   this.population[i] = this.makeBabyDino(this.getWinner(), this.getWinner());
    // }
  },

  //makes a baby dino given a mommy and a daddy dino and mutates it
  makeBabyDino : function(mommy, daddy) {
    var babyDino = mommy;
    //randomly selects bias form either its mom or dad
    for(var i = 0; i < babyDino.neurons.length; i++){
      if(Math.random() > 0.5){
        babyDino.neurons[i]['bias'] = daddy.neurons[i]; //do I need the ['bias']??
      }
    }

    /*
    do we want to do this in 1 loop and get the bias and weight from the same parent??
    */

    //randomly selects weights form each parent
    for(var i = 0; i < babyDino.neurons.length; i++){
      if(Math.random() > 0.5){
        babyDino.neurons[i]['weight'] = daddy.neurons[i]; //do I need the ['bias']??
      }
    }
    return this.mutate(babyDino);
  },

  //mutates a newly made baby dinos
  mutate : function(babyDino) {
    //randomly mutates bias
    for(var i = 0; i < babyDino.neurons.length; i++) {
      if(Math.random() < this.mutationRate){
        var mutateFactor = 1 + ((Math.random() - 0.5) * 3 + (Math.random() - 0.5)); //change formula?
        babyDino.neurons[i]['bias'] *= mutateFactor;
      }
    }
    //randomly mutates weight
    for(var i = 0; i < babyDino.neurons.length; i++) {
      if(Math.random() < this.mutationRate){
        var mutateFactor = 1 + ((Math.random() - 0.5) * 3 + (Math.random() - 0.5)); //change formula?
        babyDino.neurons[i]['weight'] *= mutateFactor;
      }
    }
  },

}

