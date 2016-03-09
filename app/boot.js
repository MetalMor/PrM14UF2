(function(app) {
  document.addEventListener('DOMContentLoaded', function() {
    ng.platform.browser.bootstrap(app.AppComponent);
    ng.platform.browser.bootstrap(app.LlistaDone);
  });
})(window.app || (window.app = {}));
