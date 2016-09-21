var casper = require('casper').create({
  verbose: true,
  logLevel: "debug"
});

var image_path = casper.cli.args[ 0 ];
var filter = casper.cli.args[ 1 ];

var getRect = function (options) {
  document.body.innerHTML = '<div class="element"></div>';
  var element = document.querySelector('.element');
  element.style.height = '600px';
  element.style.width = '600px';
  element.style.backgroundImage = 'url("file://' + options.path + '")';
  element.style.backgroundSize = 'cover';
  element.style["-webkit-filter"]  = options.filter;
  return element.getBoundingClientRect();
};

casper.start('about:blank');
casper.then(function () {
  var clipRect = this.evaluate(getRect, {path: image_path, filter: filter});

  var rect = {
    top: clipRect.top,
    left: clipRect.left,
    width: clipRect.width,
    height: clipRect.height
  };

  this.wait(3000, function () {
    this.capture(image_path, rect);
  });
});

casper.run();