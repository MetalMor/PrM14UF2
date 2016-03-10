
/**
 * Component controlador de la llista emmagatzemada.
 * Controla els elements del localStorage per mostrarlos.
 *
 * @author mor
 *
 */
(function(app) {
    console.log('hola done');

  app.LlistaDone = ng.core
    .Component({
        selector: 'llista',
        pipes: [app.Comparator],
        templateUrl: 'app/templates/done_template.html'
    })

    .Class({
      constructor: function LlistaDone() {
            /* Llista de tasques finalitzades */
            this.tasques = [];
            /* Total de tasques mostrades al navegador */
            this.total = 0;
            /* Patró d'ordre */
            this.camp = 'final';
            /* Retorna l'array d'elements emmagatzemmats */
            this.getAllStorage = function() {
                console.log('getting storage');
                var values = [];
                Object.keys(localStorage).forEach(function(key) {
                    var tasca = localStorage.getItem(key);
                    if(key != 'debug')
                        values.push(JSON.parse(tasca));
                });
                return values;
            };
            /* Actualitza el patró d'ordenació */
            this.ordre = function(cmp) {
                this.camp = cmp;
                this.storageToLlista();
            };
            /* Actualitza la llista amb les dades del localStorage */
            this.storageToLlista = function() {
                this.tasques = this.getAllStorage();
            };
            /* Interval d'actualització de la llista */
            this.interval = setInterval(() => {
                if(this.storageActualitzat())
                    this.storageToLlista();
            }, 1000);
            /* Retorna true si la llista està actualitzada amb les dades del localStorage */
            this.storageActualitzat = function() {
                return (this.tasques.length+1) != localStorage.length;
            };
        }
    })
})(window.app || (window.app = {}));
