dali.utils.namespace("dali.services");

dali.services.AlertService = function() {
  this.alerts = {};

  this.timeout_ = null;
};
dali.addSingletonGetter(dali.services.AlertService);

dali.services.AlertService.prototype.setTimeout = function(timeout) {
  this.timeout_ = timeout;
  return this;
};

dali.services.AlertService.prototype.getAlerts = function() {
  return this.alerts_;
};

dali.services.AlertService.prototype.error = function(message) {

  var id = dali.uuid();

  this.alerts[id] = {
    type: 'danger',
    msg: message,
    expired: false
  };

  this.expire_(id);
};

dali.services.AlertService.prototype.success = function(message) {

  var id = dali.uuid();

  this.alerts[id] = {
    type: 'success',
    msg: message,
    expired: false
  };

  this.expire_(id);
};

dali.services.AlertService.prototype.expire_ = function(index) {
  var scope = this;
  (function(id) {
    scope.timeout_(function() {
      scope.closeAlert(id);
    }, 1700);
  })(index);
};


/**
 * Checks whether or not the service has any alerts currently being displayed.
 * This is generally used in conjunction with an "ng-show" directive to display
 * the alert holder only when there are alerts to display.
 * @return {boolean} True if there are alerts to display, false otherwise.
 */
dali.services.AlertService.prototype.nonEmpty = function() {
  for (var key in this.alerts) {
    if (this.alerts.hasOwnProperty(key)) {
      return true;
    }
  }

  return false;
};

dali.services.AlertService.prototype.closeAlert = function(id) {
  delete this.alerts[id];
};

alerts.factory('AlertService', ['$timeout', function($timeout) {
  return dali.services.AlertService.getInstance().setTimeout($timeout);
}]);
