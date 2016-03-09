(function (app) {
    app.AppComponent = ng.core
        .Component({
            selector: 'aplicacio',
            template: '<global></global>',
            directives: [app.Pomodoro]
        })
        .Class({
            constructor: function () {}
        });
    console.log('component global carregat');
})(window.app || (window.app = {}));
