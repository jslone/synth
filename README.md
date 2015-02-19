# synth
##Usage
Press a through ' key (middle row of keyboard) to play keys.
##Setup
Edit src/synthArgs.js to modify synth frequency modulation. Each modulator has an output array.
If 'synth' is an element of that output, the frequency modulation will be applied to the output.
Any other element of output is a key into the modulator dictionary and will modulate the frequency
of the corresponding modulator.
