// Redirect to index.html after 5 seconds
setTimeout(() => {
  window.location.replace('index.html');
}, 5000);

// Polyfill for String.prototype.includes
if (!String.prototype.includes) {
  String.prototype.includes = function(search, start) {
    'use strict';
    
    if (search instanceof RegExp) {
      throw new TypeError('First argument to String.prototype.includes must not be a RegExp');
    }
    
    if (start === undefined) {
      start = 0;
    }
    
    return this.indexOf(search, start) !== -1;
  };
}
