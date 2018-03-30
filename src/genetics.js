/*
Rocco Manzo - Rmanzo
3/28/18
*/

var population = []; //the population of neural networks (should have around 20)
var MAX_DINOS = 20;

//creates the initial Population
makePopulation : function() = {
  this.population.splice(0, this.population.length);

  for(var i = 0; i < MAX_DINOS; i++){
    var newDino = new Dino(0, new synpatic.Architect.Perceptron(0,0,0), i);
    this.population.push(newDino);
  }

}

//returns an array of the top 5 Dinos
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
evolvePopulation : function() = {}

//gets the top 5? dinos from the population and brutally executes the rest
selectDinos : function() = {}

//makes a baby dino given a mommy and a daddy dino
makeBabyDino : function(mommy, daddy) = {}

//mutates a newly made dinos
mutate : function(babyDino) = {}
