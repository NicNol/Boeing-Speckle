'use strict';
module.exports = function(app) {
  const cullReport = require('../controllers/cullController');

  app.route('/tasks')
    .get(cullReport.list_all_specs)
    .post(cullReport.create_a_spec);

  app.route('/tasks/:taskId')
    .get(cullReport.read_a_spec)
    .put(cullReport.update_a_spec)
    .delete(cullReport.delete_a_spec);
};