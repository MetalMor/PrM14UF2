(function(app) {
    app.Comparator = ng.core
		.Pipe({
			name: "ordenar"
		})
		.Class({
			constructor: function() {
                field = 'final';
                this.compare = function(tasca1, tasca2) {
                    return tasca1[field[0]].localeCompare(tasca2[field[0]]);
                };
                this.setCamp = function(f) {
                    field = f;
                };
                this.emptyList = function(list) {
                    return list.length <= 1;
                };
            },
			transform: function(value, field) {
                if(!this.emptyList(value)) {
                    this.setCamp(field);
                    value.sort(this.compare);
                    return value;
                }
			}
		});console.log('hola comparator')
})(window.app || (window.app = {}));
