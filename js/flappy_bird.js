

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

let gap = 100;
let pipeGap;

let gravity = 1.5;

let score=0;

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
            pipes.push({    
                x : canvas.width,
                y : Math.floor(temp * pipeDown.height) - pipeDown.height
            });       
        }
        
        if(isColission(pipes[i])){
            canvas_context.drawImage(foreground, 0, background.height-foreground.height);
            canvas_context.drawImage(flappy_bird, birdX, birdY);
            let temp = score;
            canvas_context.fillStyle = "#000";
            canvas_context.font = "20px Verdana";
            canvas_context.fillText("Score : "+0,10,canvas.height-20);
            score=0;
            alert(temp);
        } 

        if(pipes[i].x == 1){
            score++;
        }
    }

    // draw foreground
    canvas_context.drawImage(foreground, 0, background.height-foreground.height);

    // draws bird
    canvas_context.drawImage(flappy_bird, birdX, birdY);

    // if(isColission()) location.reload(); 

    birdY += gravity;   // applies gravity 

    canvas_context.fillStyle = "#000";
    canvas_context.font = "20px Verdana";
    canvas_context.fillText("Score : "+score,10,canvas.height-20);
         
    requestAnimationFrame(draw);
}

draw();

//for colission detection 
function isColission(pipe){
    return (
        birdY<=0 
        || birdY+flappy_bird.height>=background.height-foreground.height 
        || birdX + flappy_bird.width >= pipe.x 
        && birdX <= pipe.x + pipeDown.width
        && (birdY <= pipe.y + pipeDown.height
            || birdY + flappy_bird.height >= pipe.y + pipeGap
           )
    );
}
