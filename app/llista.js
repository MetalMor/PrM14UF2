(function(app) {
    console.log('hola done');

  app.LlistaDone = ng.core
    .Component({
        selector: 'llista',
        /*pipes: [app.Pipe],*/
        templateUrl: 'app/done_template.html'
    })

    .Class({
      constructor: function LlistaDone() {
            /*this.getStorageKeys = function() {
                return Object.keys(localStorage);
            };
            this.getStorageValues = function(keys) {
                var values = [];
                for (var i = keys.length-1;
                     i => 0;
                     i--) {
                    values.push(this.getStorageValue(keys[i]));
                }
                return values;
            };
            this.keyValida = function() {
                return key =! 'debug';
            };
            this.getStorageValue = function(key) {
                if(this.keyValida())
                    return localStorage.getItem(key);
            };
            this.carregaStorage = function () {
                return this.getStorageValues(this.getStorageKeys());
            };
            this.tasques = this.carregaStorage();*/
        }
    })
})(window.app || (window.app = {}));
