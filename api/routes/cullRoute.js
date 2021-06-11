'use strict';
module.exports = function(app) {
  const cullReport = require('../controllers/cullController');

  app.route('/specs')
    .get(cullReport.list_all_specs)
    .post(cullReport.create_a_spec);

  app.route('/spec/:specId')
    .get(cullReport.read_a_spec)
    .put(cullReport.update_a_spec)
    .delete(cullReport.delete_a_spec);
};