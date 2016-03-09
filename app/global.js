(function (app) {
    console.log('hola global');
    app.AppComponent = ng.core
        .Component({
            selector: 'aplicacio',
            template: '<global></global>',
            directives: [app.Pomodoro, app.LlistaDone]
        })
        .Class({
            constructor: function () {}
        });
    console.log('component global carregat');
})(window.app || (window.app = {}));
