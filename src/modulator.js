// adapted from http://jsfiddle.net/greweb/s2MMR/19/
module.exports = function(context) {
	return function Modulator (opts) {
		this.modulator = context.createOscillator();
		this.gain = context.createGain();
		this.modulator.type = opts.type;
		this.modulator.frequency.value = opts.freq;
		this.gain.gain.value = opts.gain;
		this.modulator.connect(this.gain);
		this.modulator.start(context.currentTime);
	}
}