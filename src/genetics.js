/*
Rocco Manzo - Rmanzo
3/28/18
*/

var population = []; //the population of neural networks (should have around 20)
var MAX_DINOS = 20;
//creates the initial Population
createPop : function() = {
  this.population.splice(0, this.population.length);

  for(var i = 0; i < MAX_DINOS; i++){
    var newDino = new synpatic.Architect.Perceptron(0,0,0);//change????

    newDino.index = i;
    newDino.fitness = 0;
    newDino.score = 0;
    newDino.isWinner = false;

    this.population.push(newDino);
  }

}

//evolves the population
evolvePopulation : function() = {}

//gets the top 5? dinos from the population and brutally executes the rest
selectDinos : function() = {}

//makes a baby dino given a mommy and a daddy dino
makeBabyDino : function(mommy, daddy) = {}

//mutates a newly made dinos
mutate : function(babyDino) = {}
