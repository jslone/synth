var spaceinvaders = {
	'spaceinvaders' : {
		type: 'sine',
		freq: 10,
		gain: 100,
		output: [
			'synth'
		]
	}
}

var metroid = {
	'metroid' : {
		type: 'sine',
		freq: 440,
		gain: 100,
		output: [
			'synth'
		]
	}
}

var smbcastle = {
	'smbcastle' : {
		type: 'sine',
		freq: 110,
		gain: 100,
		output: [
			'synth'
		]
	}
}

var flute = {
	'flute' : {
		type: 'sine',
		freq: 1760,
		gain: 100,
		output: [
			'synth'
		]
	}
}

var spooky = {
	'spooky' : {
		type: 'sine',
		freq: 5,
		gain: 20,
		output: [
			'synth'
		]
	}
}

var fm2 = {
	'fm2' : {
		type: 'sine',
		freq: 880,
		gain: 100,
		output: [
			'fm1'
		]
	},
	'fm1' : {
		type: 'sine',
		freq: 440,
		gain: 100,
		output: [
			'synth'
		]
	}
}

var adsr = {
	attack: 0.01,
	decay: 0,
	sustain: 1,
	release: 0.01
}

module.exports = {
	adsr: adsr,
	fm: fm2
}