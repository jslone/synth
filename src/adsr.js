// adapted from https://github.com/mmckegg/adsr

module.exports = function(context) {
    function adrs() {
        var node = context.createGain();

        Object.defineProperties(node,props);

        return node;
    }

    var props = {
        start: {
            value: function(at) {
                var peakTime = at + this.attack;
                this.gain.cancelScheduledValues(at);
                if(this.attack) {
                    this.gain.setValueAtTime(0,at);
                    this.gain.linearRampToValueAtTime(1,peakTime);
                } else {
                    this.gain.setValueAtTime(1,at);
                }
                if(this.decay) {
                    this.gain.setTargetAtTime(this.sustain, peakTime, getTimeConstant(this.decay));
                }
            }
        },

        stop: {
            value: function(at) {
                var endTime = at + this.release;

                if(this.release) {
                    this.gain.cancelScheduledValues(at);
                    this.gain.setTargetAtTime(0, endTime, getTimeConstant(this.release));
                }
                return endTime;
            }
        }
    }

    function getTimeConstant(time){
        return Math.log(time+1)/Math.log(100)
    }

    return adrs;
}