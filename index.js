var through2 = require('through2')
  , bun      = require('bun')
  , eachline = require('eachline')
  , extname  = require('path').extname
  , dirname  = require('path').dirname
  , fs       = require('fs')
  , join     = require('path').join
  , relative = require('path').relative
  , resolve  = require('path').resolve
  , crypto   = require('crypto')
  , _        = require('underscore')
;

var matchUrl = /url\s*\(\s*(['"]?)([^)]+)\1\s*\)/g

module.exports = function(src, dest, options, addFile) {
  if(extname(src) !== '.css') return through2();
  var delimiter = '\n';

  var uopt = _.extend({dest:'./'}, options.unifyurl || {});

  var i = 0;
  var rewrite = function(line, encoding, next) {
    line = line.toString();
    if(matchUrl.test(line)) {
      line = line.replace(matchUrl, function(match, quote, path, offset, str) {
        var stat, from, to, uid, toUrl;

        // Only relative path
        if(path[0] !== '.') {
          return match;
        }

        from   = join(dirname(src),  path);

        if(from.slice(0,2) === '..') {
          throw(new Error('Error: File path out of project:', from));
        }

        try {
          stat = fs.statSync(from);
        } catch(e) {
          return match;
        }

        uid = crypto.createHash('md5')
          .update(from + '#' + stat.mtime)
          .digest('hex');

        toUrl  = uopt.dest + uid + extname(from);
        to     = join(dirname(dest), toUrl);

        addFile([from], to);

        return 'url('+toUrl+')';

      });
    }
    this.push(line+'\n');
    next();
  }

  return bun([
    eachline(),    // Split stream in lines
    through2(rewrite) // Rewrite css
  ]);
}