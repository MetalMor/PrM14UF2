(function(app) {
    app.Temps = ng.core
		.Pipe({
			name: "formataTemps"
		})
		.Class({
			constructor: function() {
                this.minuts = function(temps) {
                    return Math.floor(temps / 60000) + 'min '
                };
                this.segons = function(temps) {
                    return ((temps % 60000) / 1000).toFixed(0) + 'sec';
                };
                this.mostraTemps = function(temps) {
                    return temps != 'Esperant...' ?
                        this.minuts(temps) + this.segons(temps) :
                        temps;
                };
			},
			transform: function(temps) {
				//return this.mostraTemps(args[0]);
                return this.mostraTemps(temps);
			}
		})
})(window.app || (window.app = {}));
