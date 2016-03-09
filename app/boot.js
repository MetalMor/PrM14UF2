(function(app) {
    console.log('hola boot');
  document.addEventListener('DOMContentLoaded', function() {
    ng.platform.browser.bootstrap(app.AppComponent);
    ng.platform.browser.bootstrap(app.LlistaDone);
    console.log('inici aplicacio POMODORO');
  });
})(window.app || (window.app = {}));
