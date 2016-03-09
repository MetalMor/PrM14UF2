

(function(app) {
    console.log('hola pomodoro');

  app.Pomodoro = ng.core
    .Component({
        selector: 'global',
        /*pipes: [app.Pipe],*/
        templateUrl: 'app/pomodoro_template.html'
    })

    .Class({
      constructor: function Pomodoro() {
            this.tasques = [];
            this.primera = "any";
            this.tempsInicial = 25*60*1000;
            this.temps = this.tempsInicial;
            this.outTemps = "Carregant...";
            this.horaActual = 'any';
            this.espera = "Esperant...";
            this.data = function() { return new Date(); };
            this.comptaTemps = setInterval(() => {
                this.horaActual = this.generaHora();
            }, 1000);

            this.generaData = function() {
                return [this.data().getDate(),
                        this.data().getMonth() + 1,
                        this.data().getFullYear()].join(' del ');
            };
            this.parseTime = function(t) { return t < 10 ? '0' + t : t };
            this.generaHora = function() {
                return [this.parseTime(this.data().getHours()),
                        this.parseTime(this.data().getMinutes()),
                        this.parseTime(this.data().getSeconds())].join(':');
            };

            // CONTROL DE LA LLISTA
            this.afegirTasca = function(tasca) {
                if(!this.isVoid(tasca)) {
                    this.novaTasca(tasca);
                    this.initPrimera();
                }
            };
            this.tascaInstance = function(nom) {
                return new app.Tasca(
                    this.generaNumTasca(),
                                     nom,
                                     this.generaData(),
                                     "any");
            };
            this.novaTasca = function(nom) {
                var tasca = this.tascaInstance(nom);
                this.tasques.push(tasca);
            };
            this.tascaToLlista = function(tasca) {
                this.parseTasca(tasca);
                localStorage.setItem(tasca.toString(),
                                     JSON.stringify(tasca));
            };
            this.parseTasca = function(tasca) {
                if(this.timeOut()) tasca.final = this.generaHora();
            };
            this.esborrarTasca = function(tasca) {
                if (this.isPrimeraTasca(tasca)) {
                    this.tascaToLlista(tasca);
                    this.initTemps();
                }
                this.tasques.splice(this.tasques.indexOf(tasca), 1);
                this.initPrimera();
            };
            this.ultimaTasca = function() {
                return this.tasques[this.tasques.length - 1];
            };
            this.generaNumTasca = function() {
                return this.emptyList() ?
                    1 :
                    this.ultimaTasca().numero+1;
            };
            /* funcio innecessaria
            this.escriure = function ($event) {
                if ($event.which === 13) {
                    this.afegirTasca($event.target.value);
                    $event.target.value = null;
                }
            }*/
            // -----

            // ACCIONS DEL TEMPS
            this.aturaComptador = function() {
                if(!this.emptyList())
                    clearInterval(this.interval);
            };
            this.resetComptador = function() {
                if (!this.emptyList())
                    this.interval = setInterval(() => {
                        this.funcioComptadora();
                    }, 1000);
            };
            this.funcioComptadora = function() {
                if (!this.emptyList()) {
                    this.comptar();
                    this.mostraTemps();
                } else
                    this.temps = this.tempsInicial;
            };
            // -----

            // CONTROL DEL TEMPS
            this.comptar = function() {
                this.temps -= 1000;
                if (this.timeOut()) this.esborrarTasca(this.tasques[0]);
            };
            this.minuts = function() {
                return Math.floor(this.temps / 60000) + 'min '
            };
            this.segons = function() {
                return ((this.temps % 60000) / 1000).toFixed(0) + 'sec';
            };
            this.mostraTemps = function() {
                this.outTemps = this.minuts() + this.segons();
            };
            this.resetTemps = function() {
                this.temps = this.initTemps();
            };
            this.initTemps = function() {
                this.temps = this.tempsInicial;
            };
            this.initPrimera = function() {
                this.primera = this.tasques[0];
            };
            this.interval = setInterval(() => {
                this.funcioComptadora();
            }, 1000);
            //this.resetInterval = this.interval;
            this.pausa = function() {
                clearInterval(this.interval);
            };
            // -----

            // VALIDACIONS
            this.isVoid = function(string) {
                return string == 0;
            };
            this.isPrimeraTasca = function(tasca) {
                return this.comparaTasques(this.primera, tasca);
            };
            this.emptyList = function() {
                return this.tasques.length <= 0;
            };
            this.comparaTasques = function(t1, t2) {
                return t1.equals(t2);
            };
            this.tascaRepetida = function(tasca) {
                this.tasques.forEach(t, function(tasca) {
                   this.comparaTasques(tasca, t);
                });
            }
            this.timeOut = function() {
                return this.temps < 0;
            };
            // -----
        }
    })
})(window.app || (window.app = {}));
