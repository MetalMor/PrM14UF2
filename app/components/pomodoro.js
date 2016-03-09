/**
 * Component controlador de l'aplicació.
 * Realitza les tasques relacionades amb el comptador de temps, el rellotge i
 * el control de la llista temporal (no localStorage).
 *
 * @author mor
 *
 */

(function(app) {
    console.log('hola pomodoro');

  app.Pomodoro = ng.core
    .Component({
        selector: 'global',
        pipes: [app.Temps],
        templateUrl: 'app/templates/pomodoro_template.html'
    })

    .Class({
      constructor: function Pomodoro() {
            // PROPIETATS
            /* Llista de tasques */
            this.tasques = [];
            /* Guarda la primera tasca de la llista */
            this.primera = "";
            /* Missatge de càrrega */
            this.carrega = "Carregant...";
            /* Missatge d'espera del temporitzador */
            this.espera = "Esperant...";
            /* Temps inicial del comptador (milisegons) */
            this.tempsInicial = 10*1000;
            /* Temps actual del comptador */
            this.temps = this.espera;
            /* Hora actual */
            this.horaActual = this.carrega;

            // CONTROL DEL RELLOTGE/DATA
            /* Retorna objecte Date */
            this.data = function() { return new Date(); };
            /* Interval per controlar el rellotge */
            this.comptaTemps = setInterval(() => {
                this.horaActual = this.generaHora();
            }, 1000);
            /* Retorna la data actual formatada */
            this.generaData = function() {
                return [this.data().getDate(),
                        this.data().getMonth() + 1,
                        this.data().getFullYear()].join(' del ');
            };
            /* Formata correctament dades de temps */
            this.parseTime = function(t) { return t < 10 ? '0' + t : t };
            /* Retorna l'hora actual formatada */
            this.generaHora = function() {
                return [this.parseTime(this.data().getHours()),
                        this.parseTime(this.data().getMinutes()),
                        this.parseTime(this.data().getSeconds())].join(':');
            };

            // CONTROL DE LA LLISTA
            /* Afegeix una tasca nova a la llista */
            this.afegirTasca = function(tasca) {
                if(!this.isVoid(tasca)) {
                    this.tasques.push(this.novaTasca(tasca));
                    this.initPrimera();
                }
            };
            /* Nova instància del model Tasca */
            this.novaTasca = function(nom) {
                return new app.Tasca(
                    this.generaNumTasca(),
                                     nom,
                                     this.generaData());
            };
            /* Afegeix una tasca al localStorage */
            this.tascaToLlista = function(tasca) {
                this.parseTasca(tasca);
                localStorage.setItem(tasca.toString(),
                                     JSON.stringify(tasca));
            };
            /* Determina si la tasca ha estat finalitzada correctament */
            this.parseTasca = function(tasca) {
                if(this.timeOut()) tasca.setFinal(this.generaHora());
            };
            /* Esborra una tasca de la llista */
            this.esborrarTasca = function(tasca) {
                if (this.isPrimeraTasca(tasca)) {
                    this.tascaToLlista(tasca);
                    this.initTemps();
                }
                this.tasques.splice(this.tasques.indexOf(tasca), 1);
                this.initPrimera();
            };
            /* Retorna una nova ID per una tasca */
            this.generaNumTasca = function() {
                return this.data().getTime().toString(16);
            };
            /* funcio innecessaria (?)
            this.escriure = function ($event) {
                if ($event.which === 13) {
                    this.afegirTasca($event.target.value);
                    $event.target.value = null;
                }
            }*/
            // -----

            // ACCIONS DEL TEMPS
            /* Elimina l'interval comptador per pausar el temps */
            this.aturaComptador = function() {
                if(!this.emptyList())
                    clearInterval(this.interval);
            };
            /* Reestableix l'interval comptador per continuar */
            this.resetComptador = function() {
                if (!this.emptyList())
                    this.interval = setInterval(() => {
                        this.funcioComptadora();
                    }, 1000);
            };
            /* Funció que desenvolupa la tasca de comptar el temps */
            this.funcioComptadora = function() {
                if (!this.emptyList()) {
                    if(this.temps === this.espera)
                        this.initTemps();
                    this.comptar();
                    this.mostraTemps();
                } else {
                    this.temps = this.espera;
                }
            };
            // -----

            // CONTROL DEL TEMPS
            /* Compta un segon (si arriba a 0, elimina la primera tasca de la llista) */
            this.comptar = function() {
                this.temps -= 1000;
                if (this.timeOut()) this.esborrarTasca(this.tasques[0]);
            };
            /* Reestableix el temps del comptador al seu valor inicial */
            this.initTemps = function() {
                this.temps = this.tempsInicial;
            };
            /* Guarda la primera tasca de la llista a la propietat corresponent */
            this.initPrimera = function() {
                this.primera = this.tasques[0];
            };
            /* Interval comptador */
            this.interval = setInterval(() => {
                this.funcioComptadora();
            }, 1000);
            // -----

            // VALIDACIONS
            /* Retorna true si la cadena és buida */
            this.isVoid = function(string) {
                return string == 0;
            };
            /* Retorna true si la tasca especificada correspon amb la primera de la llista */
            this.isPrimeraTasca = function(tasca) {
                return this.comparaTasques(this.primera, tasca);
            };
            /* Retorna true si la llista de tasques és buida */
            this.emptyList = function() {
                return this.tasques.length <= 0;
            };
            /* Retorna true si les tasques enviades per paràmetre són la mateixa */
            this.comparaTasques = function(t1, t2) {
                return t1.equals(t2);
            };
            /* Retorna true si s'ha acabat el temps */
            this.timeOut = function() {
                return this.temps < 0;
            };
            // -----
        }
    })
})(window.app || (window.app = {}));
