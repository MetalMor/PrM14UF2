(function (app) {
    console.log('hola tasca');
    app.Tasca = Tasca;
    console.log('model Tasca carregat');
    function Tasca(n, nm, dt, fn) {
        this.numero = n;
        this.nom = nm;
        this.data = dt;
        this.final = fn;
        this.equals = function(other) {
            return this.numero == other.numero;
        };
        this.acabada = function() {
            return this.final =! "any";
        };
        this.toString = function() {
            return this.numero + '-' + this.nom;
        };
    }
})(window.app || (window.app = {}));
