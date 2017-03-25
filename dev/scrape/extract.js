var jsdom = require("jsdom");
const fs = require('fs');
var contents;

var walk = function(dir, done) {
    var results = [];
    fs.readdir(dir, function(err, list) {
        if (err) return done(err);
        var i = 0;
        (function next() {
            var file = list[i++];
            if (!file) return done(null, results);
            file = dir + '/' + file;
            fs.stat(file, function(err, stat) {
                if (stat && stat.isDirectory()) {
                    walk(file, function(err, res) {
                        results = results.concat(res);
                        next();
                    });
                } else {
                    results.push(file);
                    next();
                }
            });
        })();
    });
};

walk('./exp-vegan.blogspot.com.au/', function(err, results) {
    if (err) throw err;
    results.forEach(function (filepathstr) {
      jsdom.env({
        file: filepathstr,
        scripts: ["http://code.jquery.com/jquery.js"],
        done: function(err, window) {
          var $ = window.$;
          contents = $(".post-body").html();
          // console.log(contents);
          fs.writeFile(filepathstr+".new.html", contents, function(err) {
              if (err) {
                  return console.log(err);
              }
              console.log("The file was saved!");

          });
        }
      });
    });

});
