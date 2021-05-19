/* 👇 Start writing your p5.js code here */


// de huidige volume van de geluid als input
let vol = 0.0;
// mic voor het opnemen van geluid
let mic;
let pitch;
// huidige audio context
let audioContext;
let currentNote = '';
// image die wordt getoond
let currentDisplayedImage;
let colors = [];
// lijst met alle images die worden ingeladen bij de preload functie
let images = [];

// json file van de trained model die nodig is voor het gebruiken van pitchDetection
const model_url = 'https://cdn.jsdelivr.net/gh/ml5js/ml5-data-and-models/models/pitch-detection/crepe/';
// high volume constante wordt gebruikt om de hoogte bij te houden van de volume
const HIGH_VOLUME = 0.2;
// lijst van imagefilenames voor het inladen van images
const imageFileNames = ['level1.PNG', 'level2.PNG', 'level3.PNG', 'level4.png', 'level5.PNG'
]


function preload() {
  imageFileNames.forEach((imgFileName) => {
    images.push(loadImage('/img/' + imgFileName));
  });
}

function setup() {
  print('Welcome to the random sound drawing!');
  createCanvas(windowWidth, windowHeight);
  audioContext = getAudioContext();
  mic = new p5.AudioIn();
  mic.start(startPitch);

  //verander de kleurmodus naar HSB
  colorMode(HSB); //360,100,100,1.0

  //Definieer de kleurenpallet
  for (let i = 0; i < scale.length; i++) {
    let newColor = color(i * 360 / scale.length, 50, 100, 0.9);
    colors.push(newColor);
  }
  stroke(0, 0, 0, 0);
}

// wanneer er interactie plaats vind voor deze functie uit
function draw() {
  
  if (mouseIsPressed) {
    vol = mic.getLevel();
    console.log(vol);
    if (isHighVolume()) {
      console.log('highVolumeDetected');
      let img = retrieveImage(vol);
      if (currentDisplayedImage == null) {
        currentDisplayedImage = image(img, 20, 20, img.width / 6, img.height / 6);
        
      }
  
    } else {
      ellipse(mouseX, mouseY, vol * 500);
      fill(random(255), random(255), random(255));
      
    }
  } else {
    return false;
  }
  
}
//voor het halen van een image van de image array
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

// het uitvoeren van de pitchDetection model
function startPitch() {
  pitch = ml5.pitchDetection(model_url, audioContext, mic.stream, modelLoaded);
}
 
// Load the model and get the pitch
function modelLoaded() {
  select('#status').html('Model Loaded');
  getPitch();
}

//als knop ingedrukt wordt clear alles en verander de achtergrond naar een willekeurige kleur
function keyPressed() {
  clear();
  background(random(255), random(255), random(255));

}

// functie voor het geluid niveau groter of gelijk aan 0.2
function isHighVolume() {
  if (vol >= HIGH_VOLUME) {
    console.log(vol)
    return true;
  } else return false;
}

// weergeef image wanneer een bepaalde frequency bereikt wordt
function retrieveImage(vol) {
  if (vol >= 0.2 && vol < 0.25) {
    return images[0];
  } else if (vol >= 0.26 && vol < 0.28) {
    return images[1];
  } else if (vol >= 0.30 && vol < 0.32) {
    return images[2]
  } else if (vol >= 0.33 && vol < 0.35) {
    return images[3]
  } else if (vol >= 0.36 && vol < 0.39) {
    return images[4]
  } else return images[0];
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);

}  
