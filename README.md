# Dino Neural Network


### Acknowledgements
- This project was inspired by ssusnic's implementation of [Flappy Birds](https://github.com/ssusnic/Machine-Learning-Flappy-Bird)
- This project uses code from [Chromium](https://github.com/chromium/chromium/tree/master/components/neterror/resources) and [Synaptic](https://github.com/cazala/synaptic/blob/master/dist/synaptic.min.js)

### How to run the program
1) Download the zip from GitHub.
2) Extract it.
3) Open the Dino-Neural-Network-master folder then open the src folder.
4) Run the "neterror.html" file.
5) If you would like to watch the Dinos train then click the "Don't Train" button and watch them learn. If not skip this step.
6) Enter the score you would like to train them to get in the text box. We recommend 100,000 if you are impatient, but if you want them to be really good we recommend at least one million. 
7) Click train. The generation number and top score from that generation will appear at the bottom of the window and will update as the dinos train.
8) Wait for the training to finish. When it does it will automatically show you the dinos.

### TODO
- [X] let user train dinos until a certain score is reached
- [X] turn off invert when not rendering
- [X] don't change (and mess up) game when window is resized
- [X] make deltaTime constant to prevent lag?
- [X] stop training after reaching score (don't wait for dinos to crash)
- [X] give scoreboard more digits
- [ ] find some way to export successfully models

### ideas for improvement
- [ ] experiment with different NN structures
- [ ] add complement of child
