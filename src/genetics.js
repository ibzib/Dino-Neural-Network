/*
Rocco Manzo - Rmanzo
3/28/18
*/

var population = []; //the population of neural networks (should have around 20)
var MAX_DINOS = 20;
var MUTATION_RATE = 0.05;

//creates the initial Population
makePopulation : function() = {
  this.population.splice(0, this.population.length);

  for(var i = 0; i < MAX_DINOS; i++){
    var newDino = new Dino(0, new synpatic.Architect.Perceptron(0,0,0), i);
    this.population.push(newDino);
  }

}

//gets the top 5? dinos from the population and brutally executes the rest
getWinners : function() = {
  var winners = []; //list of winners

  //add the first 5 dinos from the pop to the winners
  for(int i = 0; i < 5; i++){
    winners.push(population[i]);
  }

  //sorting the list so the highest fitness dino is in position 0
  //ik insertion sort is slow but it's 5 long so it's fine
  for(int i = 1; i < winners.length; i++){
    for(int j = i; j > 0; j--){
      if(winners[j].fitness <= winners[j-1].fitness){
        break;
      }
      else{
        var temp = winners[i];
        winners[i] = winners[i-1];
        winners[i-1] = temp;
      }
    }
  }

  //loop through the rest of the population to find the top 5
  //start looping at 5 because 0-4 are already in the winners array
  for(int i = 5; i < population.length; i++){
      for(int j = winners.length-1; j >= 0; j--){
        if(population[i].fitness > winners[j].fitness){
          winners[j] = population[i];
        }
        else{
          break;
        }
      }
  }
  return winners;
}

//evolves the population
evolvePopulation : function() = {

  var winners = getWinners();
  for(int i = 0; i < winners.length; i++){ //puts the winners at the front of the population array
    this.population[i] = winners[i];
  }
  for(int i = 5; i < population.length; i++){ //makes baby dinos
    this.population[i] = makeBabyDino(winners[Math.floor(Math.random()*6)], winners[Math.floor(Math.random()*6)]);
  }
}

//makes a baby dino given a mommy and a daddy dino and mutates it
makeBabyDino : function(mommy, daddy) = {
  var babyDino = mommy;
  //randomly selects bias form either its mom or dad
  for(int i = 0; i < babyDino.neurons.length; i++){
    if(Math.random() > 0.5){
      babyDino.neurons[i]['bias'] = daddy.neurons[i]; //do I need the ['bias']??
    }
  }

  /*
  do we want to do this in 1 loop and get the bias and weight from the same parent??
  */

  //randomly selects weights form each parent
  for(int i = 0; i < babyDino.neurons.length; i++){
    if(Math.random() > 0.5){
      babyDino.neurons[i]['weight'] = daddy.neurons[i]; //do I need the ['bias']??
    }
  }
  return mutate(babyDino);
}

//mutates a newly made baby dinos
mutate : function(babyDino) = {
  //randomly mutates bias
  for(int i = 0; i < babyDino.neuron.length)
    if(Math.random() < this.MUTATION_RATE){
      var mutateFactor = 1 + ((Math.random() - 0.5) * 3 + (Math.random() - 0.5)); //change formula?
      babyDino.neurons[i]['bias'] *= mutateFactor;
  }
  //randomly mutates weight
  for(int i = 0; i < babyDino.neuron.length)
    if(Math.random() < this.MUTATION_RATE){
      var mutateFactor = 1 + ((Math.random() - 0.5) * 3 + (Math.random() - 0.5)); //change formula?
      babyDino.neurons[i]['weight'] *= mutateFactor;
  }
}
