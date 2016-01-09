//playground.js

acontext = new webkitAudioContext() || new AudioContext;  

//Now we can create an instance of our waveform generator and play it.

waveform = new Synth(acontext);
soundFiles = ["drums1.wav",
			  "808drum.wav",
			  "slowdrums.wav",
			  "bassline.wav",
			  "chords.wav",
			  "arp1.wav",
			  "arp2.wav",
			  "vibes.wav"];
buttonNames = ['drums1','drums2','slowdrums','bassline','chords','arp1','arp2','vibes'];

/*
maxim1 = new Maxim();
maxim2 = new Maxim();
maxim3 = new Maxim();

player1 = maxim1.loadFile("drums1.wav");
player1.loop
player2 = maxim2.loadFile("bassline.wav");
player2.loop
player3 = maxim3.loadFile("arp.wav");
player3.loop
*/

maxims = new Array(soundFiles.length);
players = {};

for(var i=0;i<soundFiles.length;++i){
	maxims[i] = new Maxim();
	players[i] = maxims[i].loadFile(soundFiles[i]);
	players[i].loop;
	players[buttonNames[i]] = players[i];
}

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

playAll = function(playList) {
	console.log("play all!!!!!!");
	console.log(playList);
	buttonNames.forEach(function(btn){
		players[btn].stop();
	});
	playList.forEach(function(btn){
		players[btn].play();
	});
	/*
	for(var btn in buttonNames){
		players[btn].stop();
		if(btn in playList){

			players[btn].play();
		}
	}*/
}

setSpeed = function(speedList) {
	for(btn in speedList){
		players[btn].speed(speedList[btn]);
	}
	/*
	for(var i=0;i<soundFiles.length;++i){
		players[i].speed(speed);
	}*/
//	player1.speed(speed);
//	player2.speed(speed);
//	player3.speed(speed);
}

stopAll = function() {
	console.log("stop all!!!!!!");
	for(var i=0;i<soundFiles.length;++i){
		players[i].stop();
		players[i].volume(0);
	}
//	player1.stop();
//	player2.stop();
//	player3.stop();
}


