// let sounds = [];
let blorb;
let value;
let blorbs = [];
let env;
let osc;
let totalBlorbs = 15;
let icSetMinor = [2, 3, 5, 7, 8, 10];
let startingNoteSet = [58, 60, 62, 63, 64, 67];
let transPos = [-24, -12, 0, 12, +24];
let filter;
let reverb;
let delay;
let oscFreq;
let t1 = 0.4;
let l1 = 0.7;
let t2 = 0.8;
let l2 = 0.1;

function preload() {
}


function setup() {
    createCanvas(720, 400);
    frameRate(25);
    filter = new p5.LowPass();
    filter.freq(200);
    reverb = new p5.Reverb();
    delay = new p5.Delay();
    // env = new p5.Envelope(t1, l1, t2, l2)
    let startNote = startingNoteSet[Math.floor(Math.random() * startingNoteSet.length)];
    for (i = 0; i <= totalBlorbs; i++) {
        let x = random(width);
        let y = random(height);
        let r = random(5, 15);
        // this could assign a random pitch to each blorb...
        // let randSound = Math.ceil(Math.random() * 10);
        // console.log(randSound);
        let o = new p5.Oscillator('square');
        o.disconnect();
        o.connect(filter);
        let s = new p5.Envelope(t1,l1,t2,l2);
        delay.process(o, 0.200, 0.7, 700);
        delay.connect(reverb);
        // reverb.process(o, 3, 2);
        // reverb.drywet(0.5);
        let b = startNote + icSetMinor[Math.floor(Math.random() * icSetMinor.length)];
        b = b + transPos[Math.floor(Math.random() * transPos.length)];
        console.log(b);
        blorb = new Blorb(x, y, r, s, o, b);
        blorbs.push(blorb);
    }
    // console.log(blorbs);
}

function draw() {
    background(220);
    for (i = 0; i <= totalBlorbs; i++)
    {
        blorbs[i].display();
    }
}

function randPitch () {
    
}

function mousePressed() {
    if (getAudioContext().state !== 'running') {
        getAudioContext().resume();
    }
}
function mouseMoved() {
    for (i = 0; i <= totalBlorbs; i++) {
        blorbs[i].hover(mouseX, mouseY);
    } 
}
// Constructor

class Blorb {
    constructor(x, y, r, s, o, b) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.f = random(255);
        this.s = s;
        this.o = o;
        this.history = [];
        this.notehistory = [b];
        this.b = b;
    }
    
    display() {
        
        // stroke(20);
        
        
        beginShape(TRIANGLE_FAN);
        for (var i = 0; i < this.history.length; i++) {
            var pos = this.history[i];
            // noFill();
            // noStroke();
            vertex(pos.x,pos.y);
            endShape();
        }
        stroke(20);
        fill(this.f);
        ellipse(this.x, this.y, this.r * 2);
        lerp(this.x, this.y, 0.2);
    }
    
    playAudio() {
        // Sound playback per blorb.
        var p = midiToFreq(this.notehistory[this.notehistory.length - 1]);
        // for (var i = 0; i < this.notehistory.length; i++) {
        //     p = this.history[i];
        // }
        if (this.x < width - width/2)
        {
            this.o.pan(random(0,1));
        } else {
            this.o.pan(random(-1,0));
        }
        if (this.y < height - height/2)
        {
            this.s.setADSR(this.y/height, this.x/width, this.x/height, this.y/width)
        } 
        //  else {
        //     this.s.rate(random(1, 8));
        // }
        // if (randNum > 1) {
        //     this.s.reverseBuffer();
        // }
        this.o.start();
        // this.o.disconnect();
        // this.o.connect(filter);
        // this.o.disconnect();
        this.o.freq(p);
        
        // this.s.disconnect();
        // this.s.connect(reverb);
        this.s.play(this.o);
        
    }
    update() {
        
        // try to generate movement
        this.f = random(255);
        this.r = this.r + random(-2, 2);
        this.xdest = this.x + random(-50, 50);
        this.ydest = this.y + random(-50, 50);

        // make new notehistory.

        if (this.notehistory.length > 10) {
            this.notehistory.splice(0,1);
        }
        // let randTrans = Math.floor(Math.random() * transPos.length);
        let r = this.notehistory[0] + icSetMinor[Math.floor(Math.random() * icSetMinor.length)];
        r = r + transPos[Math.floor(Math.random() * transPos.length)];
        if (r < 30) {
            r = r + 12;
        } else if (r > 110) {
            r = r - 12;
        }
        this.notehistory.push(r);
        // console.log(this.notehistory);
        //   += icSetMinor[Math.floor(Math.random() * icSetMinor.length)];
        // this.b += transPos[Math.floor(Math.random() * transPos.length)];
        // this.notehistory.push(this.b);
        
        // let oscFreq = midiToFreq(this.noteHistory[randInt] + transPos[randTrans]);
        // this.noteHistory.push(oscFreq);
        // console.log(notehistory);
        
        
        
        // set a loop that moves the thing. This might need to refresh the function...
        this.x += random(-50, 50);
        this.y += random(-50, 50);
        var v = createVector(this.x, this.y, this.f);
        this.history.push(v);
        
        if (this.history.length > 25) {
            this.history.splice(0,1);
        }

        // console.log(this.notehistory);
    }
    
    
    hover(px, py) {
        // let randNum = random(0, 2);
        let d = dist(px, py, this.x, this.y);
        
        
        if (d < this.r)
        {
            this.playAudio();
            this.update();
        }
    }
}
