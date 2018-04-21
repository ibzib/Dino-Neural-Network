/*
Rocco Manzo - Rmanzo
3/28/18
*/

// parameters for genetic algo
var POPULATION_SIZE = 50; // number of test subjects per generation
var SELECTION_SIZE = 10; // number of test subjects selected to continue
var MUTATION_RATE = 0.12;
var EXTINCTION_THRESHOLD = 3000;

// neural network: # of neurons per layer
var N_INPUTS = 5;
var N_HIDDEN = 10;
var N_OUTPUTS = 1;

// for debugging -- just make dinos jump randomly
var RANDOM_JUMP = false;

var Genetics = function(populationSize, selectionSize, mutationRate) {
  this.populationSize = populationSize;
  this.selectionSize = selectionSize;
  this.mutationRate = mutationRate;
  this.init();
}

Genetics.prototype = {
  // creates initial population
  init : function() {
    this.population = [];
    for (var i = 0; i < this.populationSize; i++) {
      var newUnit = new synaptic.Architect.Perceptron(N_INPUTS,N_HIDDEN,N_OUTPUTS);
      newUnit.index = i;
      newUnit.fitness = 0;
      newUnit.score = 0;
      this.population.push(newUnit);
    }
  },

  getWinner : function() {

    //return this.population[Math.floor(Math.random()*this.selectionSize)];

    var totalFitness = 0;
    var scores = [];
    var selection = Math.random();

    //finds the total fitness of the top Dinos
    for(var i = 0; i < this.selectionSize; i++){
      totalFitness += this.population[i].fitness;
    }

    //assigns everybody a score (the last one should be 1)
    for(var i = 0; i < this.selectionSize; i++){
      scores.push(this.population[i].fitness/totalFitness);
      for(var j = i; j >= 0; j--){
        scores[i] += scores[j];
      }
    }

    for(var i = 0; i < this.selectionSize; i++){
      if(selection <= scores[i]){
        return this.population[i];
      }
    }
    return this.population[Math.floor(Math.random()*this.selectionSize)];
  },

  // evolves the population
  // returns false if population went extinct
  evolvePopulation : function() {

    this.population.sort(function(unit1, unit2) {
      return unit2.fitness - unit1.fitness;
    });

    var maxFitness = this.population[0].fitness;
    if (maxFitness < EXTINCTION_THRESHOLD) {
      this.init();
    } else {
      for(var i = this.selectionSize; i < this.populationSize; i++){ //makes baby dinos
        var mommy = this.getWinner();
        var daddy = this.getWinner();
        for(var j = 0; j < 1000 && mommy == daddy; j++){
          daddy = this.getWinner();
        }
        var baby = this.makeBabyDino(mommy.toJSON(), daddy.toJSON());
        this.population[i] = synaptic.Network.fromJSON(baby);
      }
    }

    return maxFitness;
  },

  //makes a baby dino given a mommy and a daddy dino and mutates it
  makeBabyDino : function(mommy, daddy) {
    var babyDino = mommy;
    //randomly selects weights form each parent
    for(var i = 0; i < babyDino.neurons.length; i++){
      if(Math.random() > 0.5){
        babyDino.neurons[i] = daddy.neurons[i];
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
	      // console.log(babyDino.neurons[i]['bias'] + " " + babyDino.neurons[i]['bias'] * mutateFactor);
        babyDino.neurons[i]['bias'] *= mutateFactor;
      }
    }
    //randomly mutates weight
    for(var i = 0; i < babyDino.connections.length; i++) {
      if(Math.random() < this.mutationRate){
        var mutateFactor = 1 + ((Math.random() - 0.5) * 3 + (Math.random() - 0.5)); //change formula?
        babyDino.connections[i]['weight'] *= mutateFactor;
      }
    }
    return babyDino;
  },

  activate : function(index, obstacle, speed) {
    if (!obstacle) {
      // if no obstacle exists, do nothing
      return 0.5
    }
    if (RANDOM_JUMP) {
      return Math.random() > 0.5;
    }

    var inputs = [];
    inputs.push(obstacle.xPos);
    inputs.push(obstacle.yPos);
    inputs.push(obstacle.typeConfig.width * obstacle.size);
    inputs.push(obstacle.typeConfig.height);
    inputs.push(speed);
    var outputs = this.population[index].activate(inputs);
    return outputs;
  }

}
