'use strict';
module.exports = function(app) {
  const cullController = require('../controllers/cullController');

  app.route('/specs')
    .get(cullController.list_all_specs)
    .post(cullController.create_a_spec);

  app.route('/specs/:specification')
    .get(cullController.read_a_spec)
    .put(cullController.update_a_spec)
    .delete(cullController.delete_a_spec);
};