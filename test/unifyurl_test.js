var grunt = require('grunt');
var fs    = require('fs');
var glob  = require('glob');

exports.unifyurl = {

  default_options: function(test) {
    'use strict';

    test.expect(1);

    var actual   = glob.sync('**', {cwd:'build/default_options'}).sort();
    var expected = glob.sync('**', {cwd:'test/expected/default_options'}).sort();

    test.deepEqual(expected, actual, 'should copy relative assets along destination file');

    test.done();
  },

  custom_options: function(test) {
    'use strict';

    test.expect(1);

    var actual   = glob.sync('**', {cwd:'build/custom_options'}).sort();
    var expected = glob.sync('**', {cwd:'test/expected/custom_options'}).sort();

    test.deepEqual(expected, actual, 'should copy relative assets along destination file with custom destination and source extensions');

    test.done();
  },

  custom_options_url: function(test) {
    'use strict';

    test.expect(1);

    var actual   = glob.sync('**', {cwd:'build/custom_options_url'}).sort();
    var expected = glob.sync('**', {cwd:'test/expected/custom_options_url'}).sort();

    test.deepEqual(expected, actual, 'should copy relative assets along destination file with custom url');

    test.done();
  },


};
