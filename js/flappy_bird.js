

// get canvas 
var canvas = document.getElementById('flappy_bird_canvas');

// get context for graphics actions
var canvas_context = canvas.getContext('2d');


// creating image objects to load
/**
 * flappy bird
 */
var flappy_bird = new Image();
flappy_bird.src = "../images/flappy_bird.png";

/**
 * game play background
 */
var background = new Image();
background.src = "../images/bg.png";

/**
 * game play for ground
 */
var foreground = new Image();
foreground.src = "../images/fg.png";

/**
 * game play pipe down face
 */
var pipeDown = new Image();
pipeDown.src = "../images/pipedown.png";

/**
 * game play pipe up face
 */
var pipeUp = new Image();
pipeUp.src = "../images/pipeup.png";

/**
 * game play sounds
 * 
 * var audio = new Audio();
 * 
 * 
 * 
 * 
 * 
 */ 

/**
 * render background images
 */

 /**
  * variables
  * birdY: distance frome foreground to bird
  * birdX: distance from right wall to bird
  * 
  */
let birdY = 150;
let birdX = 100; 

let gap = 80;
let pipeGap;

let gravity = 1.5;

function moveUp(){
    birdY -= 30; 
}

document.addEventListener("keyup", moveUp);

let pipes = [];
pipes[0] = {
    x : canvas.width,
    y : 0
};

function draw(){
    // draws background
    canvas_context.drawImage(background, 0, 0);

    for(let i =0; i<pipes.length; i++){

        pipeGap = pipeDown.height + gap;
        // draws pipes
        canvas_context.drawImage(pipeDown, pipes[i].x, pipes[i].y);
        canvas_context.drawImage(pipeUp, pipes[i].x, pipes[i].y+pipeGap);

        pipes[i].x--;

        if(pipes[i].x == 125){
            let temp = Math.random();

            if(temp<0.15) temp = 0.5;
            console.log(temp);
            pipes.push({
                x : canvas.width,
                y : Math.floor(temp * pipeDown.height) - pipeDown.height
            });
        }
    }

    // draw foreground
    canvas_context.drawImage(foreground, 0, background.height-foreground.height);

    // draws bird
    canvas_context.drawImage(flappy_bird, birdX, birdY);
    birdY += gravity;   // applies gravity 
    
    requestAnimationFrame(draw);
}

draw()[i];
