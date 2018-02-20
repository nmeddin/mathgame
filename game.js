
//we need to get the canvas and change it so it makes it 2D. 
var getCanvas = document.getElementById("myCanvas").getContext("2d");

var firstlevel = [
  "                                           ", 
  "                                           ",
  "                                           ",                      
  "                                           ",              
  "                                           ",
  "                                           ",
  "                                           ",                    
  "                                           ",
  "                                           ",
  "                                           ",
  "                                           ",
  "                                           "
];
//these are the symbols 
var chars = {
  "&": player,
  "@": enemy,
  "b": fixedEnemy, 
  "+": keyWin
};
var size = 50;
var fixed = 50;
var addNum = 0; 
//player's coors
var playerCoors = []; 
//key to get out of the level
var keyCoors = [];
//enemy coors
var xcoorEnemy = [];
var ycoorEnemy = [];
//fixed enemy 
var xcoorFixedEnemy = []; 
var ycoorFixedEnemy = []; 

var restartGame = false;
var switchsides = 0; 


function clearRect(x,y){
  getCanvas.clearRect(x,y,size,size); 
};

function clamp(value, min, max){
    if(value < min) return min;
    else if(value > max) return max;
    return value;
}
function fixCamera(theX, theY,xenemy, yenemy, xfixed, yfixed){
  getCanvas.setTransform(1,0,0,1,0,0);
  
  
  //Clamp the camera position to the world bounds while centering the camera around the player                                             
    var camX = clamp(-theX + 1000/2, 0, 20000 - 1000);
    var camY = clamp(-theY + 600/2, 0, 120000 - 600);
  
    getCanvas.translate( camX, camY ); 
    
}
//this the random course.
var makeRandomCourse = function(){
  var posplayer = Math.floor(Math.random()*12)+3;
  var poswall1 = Math.floor(Math.random()*8)+4; 
  var posfire = Math.floor(Math.random()*9)+3;
  var poswall3 = Math.floor(Math.random()*14)+3;
  var poscoin = Math.floor(Math.random()*5)+4;
  var playerperson = "&";
  var keyWin = "+";
  var space = "                      ";
  var walls = "b b b b b bb";
  var movingwalls = "@   @    @";
  var hardwalls = "b bb  bb b  bbb";
  var start = space.substring(0,posplayer) + poscoin + space.substring(posplayer,space.length);
  var wall1 = space.substring(0,poswall1) + walls.substring(0,poswall1/2) + space.substring(poswall1,space.length);
  var movingfire = space.substring(0,posfire) + movingwalls.substring(0,posfire) + space.substring(posfire,space.length);
  var wall2 = space.substring(0,poswall3/4) + hardwalls.substring(0,poswall3) + space.substring(poswall3,space.length); 
  var end = space.substring(0,poscoin) + playerperson + space.substring(poscoin,space.length);
  firstlevel[0] = start; 
  firstlevel[2] = wall1; 
  firstlevel[5] = movingfire;
  firstlevel[8] = wall2; 
  firstlevel[11] = end; 
  // console.log(wall1);
  // console.log(end);
};
//makeRandomCourse();

function player(x,y){
  var img = new Image();
  img.src = "icecream.jpg";  
  getCanvas.drawImage(img,x,y);
};
function enemy(x,y){
  var img = new Image();
  img.src = "fireball.jpg";
  getCanvas.drawImage(img,x,y); 
};
function fixedEnemy(x,y){
  var img = new Image(); 
  img.src = 'sun.jpg';
  getCanvas.drawImage(img,x,y);
}
function keyWin(x,y){
  var img = new Image(); 
  img.src = 'cone.jpg';      
  getCanvas.drawImage(img,x,y);
};

function Rounds(theLevel){
  //this takes the level 2d array 
  this.width = theLevel[0].length;
  this.height = theLevel.length;
  for(var y = 0; y < this.height; y++){
    var line = theLevel[y]; 
    for(var x = 0; x < this.width; x++){
      var ch = line[x]; 
      var Character = chars[ch];
      if(ch === "&"){
        player(x*fixed,y*fixed);
        playerCoors.push((x*fixed));
        playerCoors.push((y*fixed));
  
      }
      else if(ch === "b"){
       fixedEnemy(x*fixed,y*fixed);
       xcoorFixedEnemy.push(x*fixed);
       ycoorFixedEnemy.push(y*fixed);
        
      }
      else if(ch === "8"){
        keyWin(x*fixed,y*fixed);
        keyCoors.push(x*fixed);
        keyCoors.push(y*fixed);
      } 
      else if(ch === "@"){
        enemy(x*fixed,y*fixed);
        xcoorEnemy.push(x*fixed);
        ycoorEnemy.push(y*fixed);
      
      }
    }
  }
};


function fixCanvas(add){
  this.width = firstlevel[0].length;
  this.height = firstlevel.length;
  for(var y = 0; y < this.height; y++){
    var line = firstlevel[y]; 
    for(var x = 0; x < this.width; x++){
      var ch = line[x]; 
      var Character = chars[ch];
      if(ch === "&"){
        player((x*fixed)+add,y*fixed);
        playerCoors.push((x*fixed)+add);
        playerCoors.push(y*fixed);
        
      }
      else if(ch === "b"){
       //fixedEnemy(xcoorFixedEnemy[x*fixed],ycoorFixedEnemy[(y*fixed)+add]);
        fixedEnemy((x*fixed)+add,y*fixed);
       xcoorFixedEnemy.push((x*fixed)+add);
       ycoorFixedEnemy.push(y*fixed);
      }
      else if(ch === "8"){
        //keyWin(keyCoors[x*fixed],keyCoors[(y*fixed)+add]);
        keyWin((x*fixed)+add,y*fixed);
        keyCoors.push((x*fixed)+add);
        keyCoors.push(y*fixed);
      } 
      else if(ch === "@"){
        //enemy(xcoorEnemy[x*fixed],xcoorEnemy[(y*fixed)+add]);
        enemy((x*fixed)+add,y*fixed);
        xcoorEnemy.push((x*fixed)+add);
        ycoorEnemy.push(y*fixed);
      }
    }
  }
};
function move(add, num){
  this.width = firstlevel[0].length;
  this.height = firstlevel.length;
for(var y = 0; y < this.height; y++){
    var line = firstlevel[y]; 
    for(var x = 0; x < this.width; x++){
      var ch = line[x]; 
      var Character = chars[ch];
      if(ch === "&"){
         console.log(playerCoors[x*fixed]+ "x then y"+playerCoors[(y*fixed)]);
        // player(playerCoors[x*fixed],playerCoors[(y*fixed)-add]);
        player(x*fixed,(y*fixed)-add);
        playerCoors.push((x*fixed));
        playerCoors.push(((y*fixed)-add));
        console.log(playerCoors[x*fixed]+ "x then y"+playerCoors[(y*fixed)-add]);
      }
      else if(ch === "b"){
       //fixedEnemy(xcoorFixedEnemy[x*fixed],ycoorFixedEnemy[(y*fixed)+add]);
        fixedEnemy(x*fixed,(y*fixed)+add);
       xcoorFixedEnemy.push(x*fixed);
       ycoorFixedEnemy.push((y*fixed)+add);
      }
      else if(ch === "8"){
        //keyWin(keyCoors[x*fixed],keyCoors[(y*fixed)+add]);
        keyWin(x*fixed,(y*fixed)+add);
        keyCoors.push(x*fixed);
        keyCoors.push((y*fixed)+add);
      } 
      else if(ch === "@"){
        //enemy(xcoorEnemy[x*fixed],xcoorEnemy[(y*fixed)+add]);
        enemy(x*fixed,(y*fixed)+add);
        xcoorEnemy.push(x*fixed);
        ycoorEnemy.push((y*fixed)+add);
      }
    }
  }
};
var startGame = false;
var randSpeed = Math.floor(Math.random()*300)+100;
var movement = function(){
  document.onkeydown = checkKey;

  function checkKey(e) {

        e = e || window.event;
        //space bar to start
        if(e.keyCode == '32'){
          startGame = true;
        }
        if (e.keyCode == '38') {
            // up arrow ycoor goes down => 
	   	 	// getCanvas.clearRect(0,0, 1000,600);
	   	 	// addNum+=20;
	   	 	// fixCanvas(addNum);

        }
        else if (e.keyCode == '40') {
          //down arrow if I want to 
          // clearRect(playerCoors[0],playerCoors[1]);
          //    playerCoors[1]+=20;
          //    player(playerCoors[0],playerCoors[1]); 
        }
        else if (e.keyCode == '37') {
           // left arrow xcoor goes down
            /* if((isTouchingSun())||(isTouchingFireball())){
              retry();  
             }else{
             clearRect(playerCoors[0],playerCoors[1]);
             playerCoors[0]-=20;
             player(playerCoors[0],playerCoors[1]);
           }*/
           //getCanvas.clearRect(0,0, 1000,600);
           addNum+=20;
             this.width = firstlevel[0].length;
  this.height = firstlevel.length;
for(var y = 0; y < this.height; y++){
    var line = firstlevel[y]; 
    for(var x = 0; x < this.width; x++){
      var ch = line[x]; 
      var Character = chars[ch];
      if(ch === "&"){
         console.log(playerCoors[x*fixed]+ "x then y"+playerCoors[(y*fixed)]);
        // player(playerCoors[x*fixed],playerCoors[(y*fixed)-add]);
        player((x*fixed)-addNum,(y*fixed));
        playerCoors.push((x*fixed)-addNum);
        playerCoors.push(y*fixed);
        console.log(playerCoors[(x*fixed)-addNum]+ "x then y"+playerCoors[(y*fixed)]);
      }
    }
  }
	   	   // addNum+=20;
        //  player(playerCoors[0]+20,playerCoors[1]);
        //  playerCoors.push(playerCoors[0]+20);
        // playerCoors.push(playerCoors[1]);
	   	   //fixCanvas(addNum);
        }
        else if (e.keyCode == '39') {
           // right arrow
          /*if((isTouchingSun())||(isTouchingFireball())){
            retry(); 
          }else{
           clearRect(playerCoors[0],playerCoors[1]);
           playerCoors[0]+=20;
           player(playerCoors[0],playerCoors[1]);
         }
        }*/
        //getCanvas.clearRect(0,0, 1000,600);
	   	   addNum-=20;
	   	   //fixCanvas(addNum);
         }

  };
};
// makeRandomCourse();
var num = 0; 
makeRandomCourse();
Rounds(firstlevel);
var startAnimation = function(){

  if(restartGame===true){
    location.reload();
    restartGame = false;
   
  }
  getCanvas.clearRect(0,0, 1000,600);
  movement();
   num+=.5;
   
   move(num);
   //fixCamera(playerCoors[0],playerCoors[1],xcoorEnemy[0], ycoorEnemy[0],xcoorFixedEnemy[0], ycoorFixedEnemy[0]);
   
   requestAnimationFrame(startAnimation);
   
   
};

requestAnimationFrame(startAnimation); 
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

startAnimation();

