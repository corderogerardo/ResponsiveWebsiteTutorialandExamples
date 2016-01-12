
//This code is for everyone. Could go in common.js
MusicMachine = new Mongo.Collection("musicMachine");

if (Meteor.isClient) {

  Meteor.startup(function () {

  });
 
  Template.playground.helpers({
    "isStartingDac": function(){
      return (Session.get('startdac')!=undefined && Session.get('startdac') != 0);
    },

    "isStartingDrums1" : function(){
      return (Session.get('drums1')!=undefined && Session.get('drums1') != 0);
    },

    "isStartingDrums2" : function(){
      return (Session.get('drums2')!=undefined && Session.get('drums2') != 0);
    },

    "isStartingSlowdrums" : function(){
      return (Session.get('slowdrums')!=undefined && Session.get('slowdrums') != 0);
    },

    "isStartingBassline" : function(){
      return (Session.get('bassline')!=undefined && Session.get('bassline') != 0);
    },

    "isStartingChords" : function(){
      return (Session.get('chords')!=undefined && Session.get('chords') != 0);
    },

    "isStartingArp1" : function(){
      return (Session.get('arp1')!=undefined && Session.get('arp1') != 0);
    },

    "isStartingArp2" : function(){
      return (Session.get('arp2')!=undefined && Session.get('arp2') != 0);
    },

    "isStartingVibes" : function(){
      return (Session.get('vibes')!=undefined && Session.get('vibes') != 0);
    },

    "startdac": function () {
      var starter = MusicMachine.findOne();
      if (starter) {
        if (starter.startdac==0) {
          stopAll();
        }else if(starter.startdac>0){
          playAll(getPlayingTracks());
        }
      }else{
          stopAll();
      }
      return Session.get('startdac');
    },

    "drums1": function () {
      return procTrack('drums1');
    },

    "drums2": function () {
      return procTrack('drums2');
    },

    "slowdrums": function () {
      return procTrack('slowdrums');
    },

    "bassline": function () {
      return procTrack('bassline');
    },

    "chords": function () {
      return procTrack('chords');
    },

    "arp1": function () {
      return procTrack('arp1');
    },

    "arp2": function () {
      return procTrack('arp2');
    },

    "vibes": function () {
      return procTrack('vibes');
    },

    //don't forget the commas between each function
//the last one doesn't have to have one!

    "sliderVal1":  function() { 
      var slider = MusicMachine.findOne();
      if (slider) { 
          Template.instance().$('#slider1').data('uiSlider').value(slider.slide);
          var speedMag = slider.slide/100.0;
          var vols = {};
          buttonNames.forEach(function(btn){
            var vol = getVolumeSlider(btn+"Slider")/100.0;
            vols[btn] = vol * speedMag;
          });
          setSpeed(vols);
          return slider.slide;
      }
    },

    "drums1Slider":function(){
      procVolumeSlider('drums1');
    },

    "drums2Slider": function(){
      procVolumeSlider('drums2');
    },
    "slowdrumsSlider": function(){
      procVolumeSlider('slowdrums');
    },
    "basslineSlider": function(){
      procVolumeSlider('bassline');
    },
    "chordsSlider": function(){
      procVolumeSlider('chords');
    },
    "arp1Slider": function(){
      procVolumeSlider('arp1');
    },
    "arp2Slider": function(){
      procVolumeSlider('arp2');
    },
    "vibesSlider": function(){
      procVolumeSlider('vibes');
    },

    "drums1SpeedSlider":function(){
      procSpeedSlider('drums1')
    },
    "drums2SpeedSlider":function(){
      procSpeedSlider('drums2')
    },
    "slowdrumsSpeedSlider":function(){
      procSpeedSlider('slowdrums')
    },
    "basslineSpeedSlider":function(){
      procSpeedSlider('bassline')
    },
    "chordsSpeedSlider":function(){
      procSpeedSlider('chords')
    },
    "arp1SpeedSlider":function(){
      procSpeedSlider('arp1')
    },
    "arp2SpeedSlider":function(){
      procSpeedSlider('arp2')
    },
    "vibesSpeedSlider":function(){
      procSpeedSlider('vibes')
    },

  });

  function isReadyToPlay(trackName){
    return (Session.get(trackName) != undefined && Session.get(trackName) > 0);
  }

  function getPlayingTracks(){ 
    return buttonNames.filter(isReadyToPlay);
  }

  function procSpeedSlider(trackName){
    var slider = MusicMachine.findOne();
    if (slider) { 
        var sliderName = trackName + 'SpeedSlider';
        var val = slider[sliderName];
        Template.instance().$('#'+sliderName).data('uiSlider').value(val);
        players[trackName].speed(val/100.0);
        return slider[sliderName];
    } 
  }

  function procVolumeSlider(trackName){
    var slider = MusicMachine.findOne();
    if (slider) { 
        var sliderName = trackName + 'Slider';
        var val = slider[sliderName];
        Template.instance().$('#'+sliderName).data('uiSlider').value(val);
        players[trackName].volume(val/100.0);
        return slider[sliderName];
    }   
  }

  function setSliderValue(buttonName,val){
    Template.instance().$('#'+buttonName).data('uiSlider').value(val);
  }

  function getSessionValue(buttonName){
    return Session.get(buttonName);
  }

  function updateData(buttonName,newValue){
    var val = MusicMachine.findOne({});
    var oldVal = getSessionValue(buttonName);
    if(buttonName == 'startdac'){
      Session.set('startdac', newValue);
      MusicMachine.update({ _id: val._id }, {$set: {startdac: newValue}});
    }else if(buttonName == 'drums1'){
      Session.set('drums1', newValue);
      MusicMachine.update({ _id: val._id }, {$set: {drums1: newValue}});
    }else if(buttonName == 'drums2'){
      Session.set('drums2', newValue);
      MusicMachine.update({ _id: val._id }, {$set: {drums2: newValue}});
    }else if(buttonName == 'slowdrums'){
      Session.set('slowdrums', newValue);
      MusicMachine.update({ _id: val._id }, {$set: {slowdrums: newValue}});
    }else if(buttonName == 'bassline'){
      Session.set('bassline', newValue);
      MusicMachine.update({ _id: val._id }, {$set: {bassline: newValue}});
    }else if(buttonName == 'chords'){
      Session.set('chords', newValue);
      MusicMachine.update({ _id: val._id }, {$set: {chords: newValue}});
    }else if(buttonName == 'arp1'){
      Session.set('arp1', newValue);
      MusicMachine.update({ _id: val._id }, {$set: {arp1: newValue}});
    }else if(buttonName == 'arp2'){
      Session.set('arp2', newValue);
      MusicMachine.update({ _id: val._id }, {$set: {arp2: newValue}});
    }else if(buttonName == 'vibes'){
      Session.set('vibes', newValue);
      MusicMachine.update({ _id: val._id }, {$set: {vibes: newValue}});
    }
  }

  function getVolumeSlider(sliderName){
    var slider = MusicMachine.findOne({});
    if(slider){
      return slider[sliderName];
    }
  }

  function getSpeedSlider(sliderName){
    var slider = MusicMachine.findOne({});
    if(slider){
      return slider[sliderName];
    }
  }

  function getTrackState(trackName){
    var starter = MusicMachine.findOne();
    if(starter){
      return starter[trackName];
    }
  }

  function procTrack(trackName){
      var starter = MusicMachine.findOne();
      if (starter) {
        var state = getTrackState(trackName);
        if (state > 0 && starter.startdac > 0) {
          var vol = getVolumeSlider(trackName+'Slider')/100.0;
          players[trackName].volume(vol);
        } else if (state == 0) {
          players[trackName].stop();
          players[trackName].volume(0);
        }
      }
      return Session.get(trackName);
  }

  function procTrackButton(buttonName){
      var slider = MusicMachine.findOne();
      if(getSessionValue(buttonName) != 1){
        Session.set(buttonName, 1);
        updateData(buttonName,1);
        if(buttonName != 'startdac'){

          players[buttonName].volume(slider[buttonName+'Slider']/100.0);
          var speed = (slider[buttonName+'SpeedSlider']/100.0) * (slider.slide/100.0);
          players[buttonName].speed(speed);
          if(slider.startdac==0){
            players[buttonName].stop();
          }else{
            players[buttonName].play();
          }
        }
      }else{
        Session.set(buttonName, 0);
        updateData(buttonName,0);
        if(buttonName != 'startdac'){
          players[buttonName].volume(0);
          players[buttonName].stop();
        }
      }
  }

  Template.playground.events({

    "click button.startButton": function () {
      procTrackButton('startdac');
    },

    "click button.drums1Button" : function(){
      procTrackButton('drums1');
    },

    "click button.drums2Button" : function(){
      procTrackButton('drums2');
    },

    "click button.slowdrumsButton": function () {
      procTrackButton('slowdrums');
    },

    "click button.basslineButton": function () {
      procTrackButton('bassline');
    },

    "click button.chordsButton": function () {
      procTrackButton('chords');
    },

    "click button.arp1Button": function () {
      procTrackButton('arp1');
    },

    "click button.arp2Button": function () {
      procTrackButton('arp2');
    },

    "click button.vibesButton": function () {
      procTrackButton('vibes');
    }

  });

  Template.playground.onRendered(function() {
    $('h2').hide();

    var d1vhandler = _.throttle(function(event, ui) {
        var val = MusicMachine.findOne({});
        MusicMachine.update({ _id: val._id }, {$set: {drums1Slider: ui.value}});
        console.log("drum1:"+ui.value);
    }, 100, { leading: false });
    if (!this.$('#drums1Slider').data('uiSlider')) {
        $("#drums1Slider").slider({
            slide: d1vhandler,
            value:100,
            min: 0,
            max: 100
        });
    };

    var d2vhandler = _.throttle(function(event, ui) {
        var val = MusicMachine.findOne({});
        MusicMachine.update({ _id: val._id }, {$set: {drums2Slider: ui.value}});
        console.log("drum2:"+ui.value);
    }, 100, { leading: false });
    if (!this.$('#drums2Slider').data('uiSlider')) {
        $("#drums2Slider").slider({
            slide: d2vhandler,
            value:100,
            min: 0,
            max: 100
        });
    };

    var d3vhandler = _.throttle(function(event, ui) {
        var val = MusicMachine.findOne({});
        MusicMachine.update({ _id: val._id }, {$set: {slowdrumsSlider: ui.value}});
    }, 100, { leading: false });
    if (!this.$('#slowdrumsSlider').data('uiSlider')) {
        $("#slowdrumsSlider").slider({
            slide: d3vhandler,
            value:100,
            min: 0,
            max: 100
        });
    };

    var bvhandler = _.throttle(function(event, ui) {
        var val = MusicMachine.findOne({});
        MusicMachine.update({ _id: val._id }, {$set: {basslineSlider: ui.value}});
    }, 100, { leading: false });
    if (!this.$('#basslineSlider').data('uiSlider')) {
        $("#basslineSlider").slider({
            slide: bvhandler,
            value:100,
            min: 0,
            max: 100
        });
    };

    var cvhandler = _.throttle(function(event, ui) {
        var val = MusicMachine.findOne({});
        MusicMachine.update({ _id: val._id }, {$set: {chordsSlider: ui.value}});
    }, 100, { leading: false });
    if (!this.$('#chordsSlider').data('uiSlider')) {
        $("#chordsSlider").slider({
            slide: cvhandler,
            value:100,
            min: 0,
            max: 100
        });
    };

    var a1vhandler = _.throttle(function(event, ui) {
        var val = MusicMachine.findOne({});
        MusicMachine.update({ _id: val._id }, {$set: {arp1Slider: ui.value}});
    }, 100, { leading: false });
    if (!this.$('#arp1Slider').data('uiSlider')) {
        $("#arp1Slider").slider({
            slide: a1vhandler,
            value:100,
            min: 0,
            max: 100
        });
    };

    var a2vhandler = _.throttle(function(event, ui) {
        var val = MusicMachine.findOne({});
        MusicMachine.update({ _id: val._id }, {$set: {arp2Slider: ui.value}});
    }, 100, { leading: false });
    if (!this.$('#arp2Slider').data('uiSlider')) {
        $("#arp2Slider").slider({
            slide: a2vhandler,
            value:100,
            min: 0,
            max: 100
        });
    };

    var vvhandler = _.throttle(function(event, ui) {
        var val = MusicMachine.findOne({});
        MusicMachine.update({ _id: val._id }, {$set: {vibesSlider: ui.value}});
    }, 100, { leading: false });
    if (!this.$('#vibesSlider').data('uiSlider')) {
        $("#vibesSlider").slider({
            slide: vvhandler,
            value:100,
            min: 0,
            max: 100
        });
    };

    var d1svhandler = _.throttle(function(event, ui) {
        var val = MusicMachine.findOne({});
        MusicMachine.update({ _id: val._id }, {$set: {drums1SpeedSlider: ui.value}});
    }, 100, { leading: false });
    if (!this.$('#drums1SpeedSlider').data('uiSlider')) {
        $("#drums1SpeedSlider").slider({
            slide: d1svhandler,
            value:100,
            min: 0,
            max: 200
        });
    };

    var d2svhandler = _.throttle(function(event, ui) {
        var val = MusicMachine.findOne({});
        MusicMachine.update({ _id: val._id }, {$set: {drums2SpeedSlider: ui.value}});
    }, 100, { leading: false });
    if (!this.$('#drums2SpeedSlider').data('uiSlider')) {
        $("#drums2SpeedSlider").slider({
            slide: d2svhandler,
            value:100,
            min: 0,
            max: 200
        });
    };

    var ssvhandler = _.throttle(function(event, ui) {
        var val = MusicMachine.findOne({});
        MusicMachine.update({ _id: val._id }, {$set: {slowdrumsSpeedSlider: ui.value}});
    }, 100, { leading: false });
    if (!this.$('#slowdrumsSpeedSlider').data('uiSlider')) {
        $("#slowdrumsSpeedSlider").slider({
            slide: ssvhandler,
            value:100,
            min: 0,
            max: 200
        });
    };

    var bsvhandler = _.throttle(function(event, ui) {
        var val = MusicMachine.findOne({});
        MusicMachine.update({ _id: val._id }, {$set: {basslineSpeedSlider: ui.value}});
    }, 100, { leading: false });
    if (!this.$('#basslineSpeedSlider').data('uiSlider')) {
        $("#basslineSpeedSlider").slider({
            slide: bsvhandler,
            value:100,
            min: 0,
            max: 200
        });
    };

    var csvhandler = _.throttle(function(event, ui) {
        var val = MusicMachine.findOne({});
        MusicMachine.update({ _id: val._id }, {$set: {chordsSpeedSlider: ui.value}});
    }, 100, { leading: false });
    if (!this.$('#chordsSpeedSlider').data('uiSlider')) {
        $("#chordsSpeedSlider").slider({
            slide: csvhandler,
            value:100,
            min: 0,
            max: 200
        });
    };

    var a1svhandler = _.throttle(function(event, ui) {
        var val = MusicMachine.findOne({});
        MusicMachine.update({ _id: val._id }, {$set: {arp1SpeedSlider: ui.value}});
    }, 100, { leading: false });
    if (!this.$('#arp1SpeedSlider').data('uiSlider')) {
        $("#arp1SpeedSlider").slider({
            slide: a1svhandler,
            value:100,
            min: 0,
            max: 200
        });
    };

   var a2svhandler = _.throttle(function(event, ui) {
        var val = MusicMachine.findOne({});
        MusicMachine.update({ _id: val._id }, {$set: {arp2SpeedSlider: ui.value}});
    }, 100, { leading: false });
    if (!this.$('#arp2SpeedSlider').data('uiSlider')) {
        $("#arp2SpeedSlider").slider({
            slide: a2svhandler,
            value:100,
            min: 0,
            max: 200
        });
    };

   var vsvhandler = _.throttle(function(event, ui) {
        var val = MusicMachine.findOne({});
        MusicMachine.update({ _id: val._id }, {$set: {vibesSpeedSlider: ui.value}});
    }, 100, { leading: false });
    if (!this.$('#vibesSpeedSlider').data('uiSlider')) {
        $("#vibesSpeedSlider").slider({
            slide: vsvhandler,
            value:100,
            min: 0,
            max: 200
        });
    };

    var handler = _.throttle(function(event, ui) {
        var val = MusicMachine.findOne({});
        MusicMachine.update({ _id: val._id }, {$set: {slide: ui.value}});
    }, 50, { leading: false });
    
    if (!this.$('#slider1').data('uiSlider')) {
        $("#slider1").slider({
            slide: handler,
            value:100,
            min: 0,
            max: 200
        });
    }
  });
}

if (Meteor.isServer) {
//      MusicMachine.remove({});
      if (MusicMachine.find().count() === 0) {
      MusicMachine.insert({slide: 50,
                           drums1Slider:100,
                           drums2Slider:100,
                           slowdrumsSlider:100,
                           basslineSlider:100,
                           chordsSlider:100,
                           arp1Slider:100,
                           arp2Slider:100,
                           vibesSlider:100,

                           drums1SpeedSlider:100,
                           drums2SpeedSlider:100,
                           slowdrumsSpeedSlider:100,
                           basslineSpeedSlider:100,
                           chordsSpeedSlider:100,
                           arp1SpeedSlider:100,
                           arp2SpeedSlider:100,
                           vibesSpeedSlider:100,

                           startdac:0,
                           drums1:0,drums2:0,slowdrums:0,
                           bassline:0,chords:0,
                           arp1:0,arp2:0,
                           vibes:0});
    }

}