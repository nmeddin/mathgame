var player = new Image(); 
var threat = new Image(); 

function formDrawing(){ 
  player.src = 'https://mdn.mozillademos.org/files/1429/Canvas_earth.png';
  threat.src = 'https://mdn.mozillademos.org/files/1456/Canvas_sun.png';
  window.requestAnimationFrame(draw); 
}
function draw(){
  //we need to get the canvas and change it so it makes it 2D. 
  var getCanvas = document.getElementById("myCanvas").getContext("2d");

  getCanvas.globalCompositeOperation = "destination-over";
  getCanvas.clearRect(0,0, 320,480);

  getCanvas.fillStyle = 'rgba(0, 0, 0, 0.4)';
  getCanvas.strokeStyle = 'rgba(0, 153, 255, 0.4)';
  getCanvas.save();
  getCanvas.translate(150, 150);

  var time = new Date();
  getCanvas.rotate(((2 * Math.PI) / 60) * time.getSeconds() + ((2 * Math.PI) / 60000) * time.getMilliseconds());
  getCanvas.translate(105, 0);
  getCanvas.drawImage(player, -40,-40);

  getCanvas.restore();

  getCanvas.drawImage(threat, 0,0,300,300);
  window.requestAnimationFrame(draw);
}

formDrawing();

