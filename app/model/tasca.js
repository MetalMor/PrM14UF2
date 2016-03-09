
/**
 * Model de tasca.
 * Conté les propietats que identifiquen i defineixen una tasca.
 *
 * @author mor
 *
 */
(function (app) {
    console.log('hola tasca');
    app.Tasca = Tasca;
    console.log('model Tasca carregat');
    function Tasca(n, nm, dt) {
        /* Identificador únic i inequívoc */
        this.id = n;
        /* Nom especificat */
        this.nom = nm;
        /* Data de realització */
        this.data = dt;
        /* Hora en què ha sigut acabada ('pendent' fins que es compleixi el temps) */
        this.final = 'pendent';
        /* Tasca acabada (true) o pendent (false) */
        this.acabada = false;
        /* Determina si dues tasques son iguals a partir de la seva ID */
        this.equals = function(other) {
            return this.id == other.id;
        };
        /* Especifica l'hora en què la tasca s'ha completat */
        this.setFinal = function(fn) {
            this.acabada = true;
            this.final = fn;
        };
        /* Retorna una cadena (identificador - nom) per reconèixer la tasca */
        this.toString = function() {
            return this.id + '-' + this.nom;
        };
    }
})(window.app || (window.app = {}));
