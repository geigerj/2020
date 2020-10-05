let imgs = [];
const imgcount = 573;
let x = screen.width/2;
let y = screen.height/2;
let x_mult = 1;
let y_mult = 1;
let dolphins_gif;
let water;
let audio;
let begin = false;
let audioLoaded = false;
let font;

function preload(){
  waterShader = loadShader('shader.vert', 'shader.frag');
  for (let i = 1; i <= imgcount; i++) {
    let path = "media/alljpg/" + pad(i) + ".jpg";
    imgs.push(loadImage(path));
  }
  water = createVideo(
    ["media/waves.mp4"],
    async function() {
      try {
        water.hide();
        water.volume(0);
        water.loop();
      } catch (err) {
        console.error(err);
      }
    }
  )
  water.size(screen.width, screen.height);
  audio = loadSound('media/whoosh.mp3', () => {console.log("audio loaded"); audioLoaded = true;});
  font = loadFont('media/Lato-Black.ttf');
}

function setup() {
  background(0);
  createCanvas(screen.width, screen.height, WEBGL);
  
  img_graphics = createGraphics(screen.width, screen.height);
  img_graphics.noStroke();
  img_graphics.fill('rgba(0,0,0, 0.01)');
  
  text_graphics = createGraphics(screen.width, screen.height);
  text_graphics.fill(255);
  text_graphics.textSize(100);
  text_graphics.textFont("Arial");
  text_graphics.textAlign(CENTER);
  text_graphics.noStroke();
  text_graphics.text('click', width / 2, height / 2);
  
  pixelDensity(1);
  frameRate(36);
  
}

function draw() {
  shader(waterShader); 
  
  if (!begin && audioLoaded) {
    frameCount = 0; 
    waterShader.setUniform("horror", text_graphics);
  } else {
    waterShader.setUniform("horror", img_graphics);
  }
  waterShader.setUniform("displacement", water);
  
  if (frameCount % 3 == 1) {
    updateImgGraphics();
  }
  
  if (frameCount % 352 == 3) {
    audio.loop();
  }
  
  rect(0,0,width, height);
}

function mousePressed() {
  begin = true;
}

function updateImgGraphics() {
  let idx = Math.floor(Math.random() * imgcount);
  img_graphics.rect(0, 0, screen.width, screen.height);
  img_graphics.image(imgs[idx], x, y); 
  
  if (x > screen.width - 80) {
    x_mult = -1;
  }
  if (x < 10) {
    x_mult = 1;
  }
  
  if (y > screen.height - 80) {
    y_mult = -1;
  }
  if (y < 10) {
    y_mult = 1;
  }
  
  x = (x + x_mult * Math.floor(Math.random() * 90) - 30)
  y = (y + y_mult * Math.floor(Math.random() * 120) - 40);
}

function pad(num) {
  let digits = Math.floor(Math.log(num)/Math.log(10) + 1);
  for (let i = 0; i < 4 - digits; i++) {
    num = "0" + num;
  }
  return num;
}