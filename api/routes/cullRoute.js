'use strict';
module.exports = function(app) {
  const cullController = require('../controllers/cullController');

  app.route('/specs')
    .get(cullController.list_all_specs)

  app.route('/specs/:specification')
    .get(cullController.read_a_spec)
};