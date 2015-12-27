//playground.js

acontext = new webkitAudioContext() || new AudioContext;  

//Now we can create an instance of our waveform generator and play it.

waveform = new Synth(acontext);
maxim1 = new Maxim();
maxim2 = new Maxim();
maxim3 = new Maxim();
player1 = maxim1.loadFile("drums1.wav");
player1.loop
player2 = maxim2.loadFile("bassline.wav");
player2.loop
player3 = maxim3.loadFile("arp.wav");
player3.loop

playDrums = function(){
	player1.volume(1);
}

stopDrums = function(){
	player1.volume(0);
}

playBass = function(){
	player2.volume(1);
}

stopBass = function(){
	player2.volume(0);
}

playArp = function(){
	player3.volume(1);
}

stopArp = function(){
	player3.volume(0);
}

playAll = function() {

	player1.play();
	player2.play();
	player3.play();
}

setSpeed = function(speed) {

	player1.speed(speed);
	player2.speed(speed);
	player3.speed(speed);

}


