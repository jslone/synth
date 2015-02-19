var mainloop = require('sald:mainloop.js');
var synth = require('synth.js')(new (window.AudioContext || window.webkitAudioContext)());

// my second degree fm synth
var keyboard = new synth(
{	
	/*'spaceinvaders' : {
		type: 'sine',
		freq: 10,
		gain: 100,
		output: [
			'synth'
		]
	}*/
	/*'metroid' : {
		type: 'sine',
		freq: 440,
		gain: 100,
		output: [
			'synth'
		]
	}*/
	/*'smbcastle' : {
		type: 'sine',
		freq: 110,
		gain: 100,
		output: [
			'synth'
		]
	}*/
	/*'flute' : {
		type: 'sine',
		freq: 1760,
		gain: 100,
		output: [
			'synth'
		]
	}*/
	/*'spooky' : {
		type: 'sine',
		freq: 5,
		gain: 20,
		output: [
			'synth'
		]
	}*/
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
},
{
	attack: 0.01,
	decay: 0,
	sustain: 1,
	release: 0.01
});

// my dvorak key
var keys = {
	'A' : 47,
	'S' : 48,
	'D' : 49,
	'F' : 50,
	'G' : 51,
	'H' : 52,
	'J' : 53,
	'K' : 54,
	'L' : 55,
	'SEMICOLON' : 56,
	'APOSTROPHE' : 57
};

console.log(keyboard);

sald.size = {x:320, y:240, mode:"ratio"};
sald.scene = {
	update:function(elapsed) {
		this.fade = (this.fade + elapsed) % 1.0;
		this.blink *= Math.pow(0.5, elapsed / 0.7);
	},
	draw:function() {
		var ctx = sald.ctx;
		ctx.setTransform(1,0, 0,1, 0,0);

		var amt = Math.sin(this.fade * Math.PI * 2.0) * 0.5 + 0.5;
		var r = amt * 0.2 + 0.2;
		var g = 0.1 + 0.9 * this.blink;
		var b = amt * 0.4 + 0.3;
		ctx.fillStyle = 'rgb(' + ((r * 256.0) | 0) + ', ' + ((g * 256.0) | 0) + ', ' + ((b * 256.0) | 0) + ')';
		ctx.fillRect(0,0, ctx.width, ctx.height);
	},
	key:function(key, down) {
		//synth.key(key,down);
		if (key === "SPACE" && down) {
			this.blink = 1.0;
		}
		console.log(key);
		switch(key) {
			case 'SPACE':
				this.blink = 1.0;
				break;
			default:
				if(keys[key]) {
					keyboard.setKey(keys[key],down);	
				}
				
		}
	},
	mouse:function(pos, button, down) {
		//Mouse handling.
	},
	fade:0.0,
	blink:0.0
};

window.main = function main() {
	mainloop.start(document.getElementById("canvas"));
};
