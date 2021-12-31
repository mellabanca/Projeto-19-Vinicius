var torreImg,torre;
var portaImg,porta,portaGRP;
var gradeImg,grade,gradeGRP;
var fantasma,fantasmaImg;
var blocoINV,blocoGRP;
var estado = "play";
var somJogo;
var score = 0;
function preload(){
  torreImg = loadImage("tower.png");
  portaImg = loadImage("door.png");
  gradeImg = loadImage("climber.png");
  fantasmaImg = loadImage("ghost-standing.png");
  somJogo = loadSound("spooky.wav");
}

function setup() {
 createCanvas(600,600);
 somJogo.play();
 torre = createSprite(300,300)
 torre.addImage("tower",torreImg);
 torre.velocityY = 1;
 portaGRP = new Group();
 gradeGRP = new Group();
 blocoGRP = new Group();
fantasma = createSprite(200,200,50,50);
fantasma.scale = 0.3;
fantasma.addImage("fantasma",fantasmaImg);
}
function draw() {
 background("black");
 if (estado === "play"){
    score = score + Math.round(frameRate()/60);
 if(torre.y >590){
     torre.y = 300;
 }
 if (keyDown("space")){
     fantasma.velocityY = -10;
 }
 if (keyDown("right")){
    fantasma.x = fantasma.x + 3;

}
if (keyDown("left")){
    fantasma.x = fantasma.x -3;

}
    fantasma.velocityY = fantasma.velocityY +0.8;

if (gradeGRP.isTouching(fantasma)){
    fantasma.velocityY = 0;
}

if (blocoGRP.isTouching(fantasma)|| fantasma.y> 600){
    estado = "gameover";
}
    drawSprites();
    gerarPortas(); 
}

if (estado ==="gameover"){
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("ACABOU",230,250);
    text("score"+score,20,30);
}


}
function gerarPortas(){
    if(frameCount % 240 ===0){
    porta = createSprite(200,-50);
    porta.addImage("porta",portaImg);

    grade = createSprite(200,10);
    grade.addImage("grade",gradeImg);

    blocoINV = createSprite(200,15);
    blocoINV.width = grade.width;
    blocoINV.height = 2;
    blocoINV.visible = false;

    porta.x = Math.round(random(120,400));
    porta.velocityY = 1;

    grade.x = porta.x;
    grade.velocityY = 1;

    blocoINV.x = porta.x;
    blocoINV.velocityY = 1;

    fantasma.depth = porta.depth;
    fantasma.depth = fantasma.depth+1;

    porta.lifetime = 800;
    grade.lifetime = 800;

    portaGRP.add(porta);
    gradeGRP.add(grade);

    blocoINV.debug = true;
    blocoGRP.add(blocoINV);
    }
}

