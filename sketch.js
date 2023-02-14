var gameChar_x;
var gameChar_y;
var floorPos_y;
var character;
var trees_x;
var clouds;
var mountains;
var cameraPosX;


// Instructions:

// 1. Add a score counter [1 marks]
// 	- create a global variable called `game_score`
// 	- increment `game_score` by one each time the character collects an item.
// 	- use the text function to draw the score on the screen.

let game_score = 0;

let collectables = [{
    x_pos: 500,
    y_pos: 100,
    size: 50,
    isFound: false
    },
    {
    x_pos: -30,
    y_pos: 100,
    size: 50,
    isFound: false
    },
    {
    x_pos: 400,
    y_pos: 100,
    size: 50,
    isFound: false
    },
    {
    x_pos: 80,
    y_pos: 100,
    size: 50,
    isFound: false
    },
    {
        x_pos: 600,
        y_pos: 100,
        size: 50,
        isFound: false
        }
    
];

let canyons = [
    { 
        x_pos: 600,
        width: 0
    },
    { 
        x_pos: 1000,
        width: 0
    },
    { 
        x_pos: 300,
        width: 0
    },
    { 
        x_pos: 30,
        width: 0
    },

    
]

function setup()
{  

	createCanvas(1024, 576);
	floorPos_y = height * 3/4;
	gameChar_x = width/2;
	gameChar_y = floorPos_y;
    
    trees_x = [100, 230, 460, 680, 900];
    
    cameraPosX = 0;
    
    character = {
        
        isLeft: false,
        isRight: false,
        isFalling: false,
        isPlummeting: false
    }
        
    clouds = [    
        cloud1 = {
        radius: 60,
        x_pos: 100,
        y_pos: 120
    },
                      
        cloud2 = {
        radius: 60,
        x_pos: 350,
        y_pos: 120
    },
                      
        cloud3 = {
        radius: 60,
        x_pos: 645,
        y_pos: 120
    }]
    
    mountains = [
        mountain1 = {
        x1: 100,
        y1: floorPos_y,
        x2: 350,
        y2: floorPos_y,
        x3: 225,
        y3: 120
    },
                
        mountain2 = {
        x1: 680,
        y1: floorPos_y,
        x2: 850,
        y2: floorPos_y,
        x3: 765,
        y3: 120

                }]    
}

function draw()
{
	///////////DRAWING CODE//////////
    
    //Controls the camera
    if (character.isLeft == true && character.isPlummeting == false && character.isRight == false){
        cameraPosX --;
    } else if (character.isRight == true && character.isPlummeting == false && character.isLeft == false){
        cameraPosX ++;
    }

	background(100,155,255); //fill the sky blue
    
    //Draws the ground
	noStroke();
	fill(0,155,0);
	rect(0, floorPos_y, width, height - floorPos_y); //draw some green ground
    
    //Save the state
    push();
    translate(-cameraPosX, 0);
    
    //Draws 2 mountains
    drawMountains();
 
    
    //Draws the trees
    drawTrees();

    //Draws multiple clouds
    drawClouds();
            
        
        // In the `draw` function, wrap the calls to `drawCollectable` and `checkCollectable` in a for loop which traverses collectables
        
        // Creates multiple coins
    for (let i = 0; i < collectables.length; i++) {
        // console.log(collectables)
        //    Draws collectable
        drawCollectable(collectables[i]);
        
        //Calculate the distance
        
        d = dist(gameChar_x, gameChar_y, collectables[i].x_pos, collectables[i].y_pos)
            
        //Check if Collectible is found
        checkCollectable(collectables[i]);
    
    }

    for (let x = 0; x < canyons.length; x++) {
        //draw the canyon
        drawCanyon(canyons[x]);


        // Check if character above the canyon
        checkCanyon(canyons[x]);
    }

        
            
            
    
	//the game character
	if(character.isLeft && character.isFalling)
	{
		// add your jumping-left code

        //head
        fill(200, 150,150);
        ellipse(gameChar_x, gameChar_y - 58, 35);
        //body
        fill(255,0,0);
        rect(gameChar_x - 13, gameChar_y - 40, 26, 30);
        //feet
        fill(0);
        rect(gameChar_x - 15, gameChar_y - 15, 10, 10);

        fill(0);
        rect(gameChar_x + 5, gameChar_y - 10, 10, 10);
        //hands
        fill(200, 150,150);
        rect(gameChar_x + 12, gameChar_y - 45, 10, 10);

        fill(200, 150,150);
        rect(gameChar_x - 22, gameChar_y - 45, 10, 10);

	}
	else if(character.isRight && character.isFalling)
	{
		// add your jumping-right code

        //head
        fill(200, 150,150);
        ellipse(gameChar_x, gameChar_y - 58, 35);
        //body
        fill(255,0,0);
        rect(gameChar_x - 13, gameChar_y - 40, 26, 30);
        //feet
        fill(0);
        rect(gameChar_x - 15, gameChar_y - 10, 10, 10);

        fill(0);
        rect(gameChar_x + 5, gameChar_y - 15, 10, 10);
        //hands
        fill(200, 150,150);
        rect(gameChar_x + 12, gameChar_y - 45, 10, 10);

        fill(200, 150,150);
        rect(gameChar_x - 22, gameChar_y - 45, 10, 10);


	}
	else if(character.isLeft)
	{
		// add your walking left code

        //head
        fill(200, 150,150);
        ellipse(gameChar_x, gameChar_y - 50, 35);

        //body
        fill(255,0,0);
        rect(gameChar_x - 13, gameChar_y - 35, 26, 30);

        // left feet
        fill(0);
        rect(gameChar_x - 15, gameChar_y - 10, 10, 10);

        // right feet
        fill(0);
        rect(gameChar_x + 5, gameChar_y - 6, 10, 10);


	}
	else if(character.isRight)
	{
		// add your walking right code

        //head
        fill(200, 150,150);
        ellipse(gameChar_x, gameChar_y - 50, 35);

        //body
        fill(255,0,0);
        rect(gameChar_x - 13, gameChar_y - 35, 26, 30);

        // left feet
        fill(0);
        rect(gameChar_x - 15, gameChar_y - 6, 10, 10);

        // right feet
        fill(0);
        rect(gameChar_x + 5, gameChar_y - 10, 10, 10);
	}
    
	else if(character.isFalling || character.isPlummeting)
	{
		// add your jumping facing forwards code

        //head
        fill(200, 150,150);
        ellipse(gameChar_x, gameChar_y - 58, 35);
        //body
        fill(255,0,0);
        rect(gameChar_x - 13, gameChar_y - 40, 26, 30);
        //feet
        fill(0);
        rect(gameChar_x - 15, gameChar_y - 10, 10, 10);

        fill(0);
        rect(gameChar_x + 5, gameChar_y - 10, 10, 10);
        //hands
        fill(200, 150,150);
        rect(gameChar_x + 12, gameChar_y - 45, 10, 10);

        fill(200, 150,150);
        rect(gameChar_x - 22, gameChar_y - 45, 10, 10);
	}
	else
	{
		// add your standing front facing code

        //head
        fill(200, 150,150);
        ellipse(gameChar_x, gameChar_y - 50, 35);

        //body
        fill(255,0,0);
        rect(gameChar_x - 13, gameChar_y - 35, 26, 30);

        // left feet
        fill(0);
        rect(gameChar_x - 15, gameChar_y - 6, 10, 10);

        // right feet
        fill(0);
        rect(gameChar_x + 5, gameChar_y - 6, 10, 10);
	}
    
    pop();
    
//    Gravity
    
    if (gameChar_y < floorPos_y){
        gameChar_y += 1.5;
        character.isFalling = true;
    } else{
        character.isFalling = false;
    }
    
	///////////INTERACTION CODE//////////
	//Put conditional statements to move the game character below here
    
    //If the character is in the pit stop moving
    
    if (character.isLeft == true && gameChar_y <= floorPos_y + 20){
        gameChar_x += -1;
    }
    
    if (character.isRight == true && gameChar_y <= floorPos_y + 20){
        gameChar_x += 1;
    }

}

function keyPressed()
{
	// if statements to control the animation of the character when
	// keys are pressed.
    
//    Check if the character is moving left
    
    if (key == "a"){
        character.isLeft = true;
//        console.log('left')
    }
    //    Check if the character is moving right

    if (key == "d"){
        character.isRight = true;
//        console.log('right')
    }
    
    //Jump when w is pressed and prevent double jumps
    
    if (key == "w" && character.isFalling == false && character.isPlummeting == false){
        gameChar_y -= 140;
    }
    
	console.log("keyPressed: " + key);
	console.log("keyPressed: " + keyCode);
}

function keyReleased()
{
	// if statements to control the animation of the character when
	// keys are released.
    
        if (key == "a"){
        character.isLeft = false;
//        console.log('not left')
    }
    
    if (key == "d"){
        character.isRight = false;
//        console.log(character.isRight)
    }
    
	console.log("keyReleased: " + key);
	console.log("keyReleased: " + keyCode);
}

function drawClouds(){
    for (var i = 0; i < clouds.length; i++){
        fill(255, 255, 255);
        noStroke();
        circle(clouds[i].x_pos + 30, clouds[i].y_pos , clouds[i].radius);
        circle(clouds[i].x_pos + 10, clouds[i].y_pos - 15, clouds[i].radius);
        circle(clouds[i].x_pos + 25, clouds[i].y_pos + 20, clouds[i].radius);
        circle(clouds[i].x_pos -10, clouds[i].y_pos + 10, clouds[i].radius);
        circle(clouds[i].x_pos + 40, clouds[i].y_pos, clouds[i].radius);
        noStroke();
        fill(255);
    }
}

function drawMountains() {
    for (var i = 0; i < mountains.length; i++){
        fill(139, 69, 19);
        triangle(mountains[i].x1 - 30, mountains[i].y1, mountains[i].x2 + 30, mountains[i].y2, mountains[i].x3, mountains[i].y3);
    }
}

function drawTrees() {
    for (var i = 0; i < trees_x.length; i++){
        noStroke();
        fill(255);
        //text("tree", 800, 346);
        fill(102, 51, 0);
        rect(trees_x[i], 352, 40, 80);
        fill(0, 255, 0);
        circle(trees_x[i] + 43, 340, 50);
        circle(trees_x[i] + 25, 330 -30, 50);
        circle(trees_x[i] + 10, 340, 50);
        circle(trees_x[i], 340 - 30, 50);
        circle(trees_x[i] + 40, 340 - 20, 50);
    }
  
}

function drawCollectable(t_collectable){
    // console.log(t_collectable.x_pos);
    if (t_collectable.isFound == false){
        noStroke();
        fill(255, 193, 37);
        ellipseMode(CENTER);
        ellipse(t_collectable.x_pos + 650, t_collectable.y_pos + 310, t_collectable.size - 10, 50);
        fill(0);
        text("$", t_collectable.x_pos + 650, t_collectable.y_pos + 310);
    }
    else {
        // game_score += 1;
        // console.log(game_score);

    }

}

function drawCanyon(canyon){
    noStroke();
    fill(0);
    rectMode(CORNER);
    rect(canyon.x_pos + 600, 430, canyon.width + 40, 150);
}

function checkCollectable(t_collectable) {
    if (d > 715){
        // game_score += 1;
        t_collectable.isFound = true;
        }
}

function checkCanyon(canyon) {
    if ((canyon.width + 600 <= gameChar_x) && (gameChar_x <= canyon.width + 640)){
        character.isPlummeting = true;
        } else{
            character.isPlummeting = false;
        }
        
    if (character.isPlummeting == true){
        gameChar_y += 1.5;
    }
}