// Code based on Photo Drawer by Sayama
// https://www.openprocessing.org/sketch/657254


let img;
var osc1;
var synth;

function preload() {
    img = loadImage("../faultycat/fc.jpg");
}


function setup() {
    createCanvas(100, 100);
    frameRate(1);
    background("rgba(255, 191, 0, 0)");
    initImage();
    noLoop();
    osc1 = new p5.Oscillator();
    synth = new p5.PolySynth();
}

function mouseClicked() {
    if (!playing) {
        synth.play();
    } else {
        synth.stop();
    }
}

function draw() {
    //fc();
    doggo();
    //genMusic(); // to do
    fcText();
}

function mouseClicked() {

}

function fcText() {
    fill(30,30 , 0, 120);
    textSize(20);
    textAlign(CENTER);
    text("Faulty Cat Productions.\nWebsite coming soon", width / 2, height - (height * 0.19));
}

function doggo() {
    ellipseMode(CENTER);
    noStroke();
    let rows = height / 70;
    let cols = width / 70;
    for (var x = 0; x < width; x += cols) {				
        for (var y = 0; y < height-100; y += rows) {
            blendMode(LIGHTEST);
            let col = img.get(x, y);
            col = color(red(col), green(col), blue(col), 80);
            fill(col);											
            ellipse(x, y, rows, cols);
        }
    }
    strokeWeight(0.8);
    stroke(45);
    // blendMode(LIGHTEST);
    fill("rgba(255, 255, 255, 0.0)");
    ellipse(width/2, height/2-100, width, height-100);
}

function genMusic() {
    var midiNoteNumber = 70;
    var freq = midiToFreq(midiNoteNumber); // Convert MIDI note to frequency
    // Play note number 70 with velocity 1, starting now, for a duration of 1s
    synth.play(freq, 0.8, 2, 1);
}




function initImage() {

    //rezsizeCanvas
    var wRatio = img.width / windowWidth;
    var hRatio = img.height / windowHeight;

    if (wRatio < hRatio) {resizeCanvas(int((img.width / hRatio) * 0.75), int(windowHeight * 0.75)+100);}
    else {resizeCanvas(int(windowWidth * 0.75), int((img.height / wRatio) * 0.75) + 100);}

    img.resize(width, height-100);

}


