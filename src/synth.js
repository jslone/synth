module.exports = function(context) {
	var modulator = require('modulator.js')(context);
	var adsr = require('adsr.js')(context);

	function Synth(modArgs, adsrArgs) {
		this.keys = [];
		this.adsr = adsrArgs;

		// hook up all modulators to each other

		// create modulator from args
		var mods = {};
		for(var modName in modArgs) {
			var mod = new modulator(modArgs[modName]);
			mods[modName] = mod;
		}

		// link modulators to their output
		for(var modName in modArgs) {
			var output = modArgs[modName].output;
			for(var i = 0; i < output.length; i++) {
				if(output[i] === 'synth') {
					this.output = mods[modName];
				}
				else {
					mods[modName].gain.connect(mods[output[i]].modulator.frequency);
				}
			}
		}
	}

	Synth.prototype.startKey = function(key) {
		var tone = context.createOscillator();
		tone.type = "sine";
		tone.frequency.value = Math.pow(1.059463,key-48) * 440;
		
		// modulate
		this.output.gain.connect(tone.frequency);

		// create envelope
		var envelope = adsr();

		// connect envelope to output
		envelope.connect(context.destination);
		
		// connect note to envelope
		tone.connect(envelope);

		// set envelope properties
		envelope.attack = this.adsr.attack;
		envelope.decay = this.adsr.decay;
		envelope.sustain = this.adsr.sustain;
		envelope.release = this.adsr.release;

		// start the audio
		this.keys[key] = {tone: tone, envelope: envelope}
		this.keys[key].tone.start(context.currentTime);
		this.keys[key].envelope.start(context.currentTime);
	}

	Synth.prototype.stopKey = function(key) {
		// stop the envelope
		var stopAt = this.keys[key].envelope.stop(context.currentTime);
		// stop the tone once envelope is done
		this.keys[key].tone.stop(context.currentTime + stopAt);
	}

	Synth.prototype.setKey = function(key,on) {
		if(on) {
			this.startKey(key);
		} else {
			this.stopKey(key);
		}
	}

	return Synth;
}