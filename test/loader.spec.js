const assert = require('assert');
const quixote = require("quixote");

describe('Verification test loader', function () {

    let frame;

    let items;

    before(function (done) {
      frame = quixote.createFrame({
          src: 'base/src/loader.html'
      }, done);
    });

    after(function () {
      frame.remove();
    });

    beforeEach(function (done) {
      frame.reload(function() {
        items = frame.getAll("div.wrapper > div.item");
        done();
      });
    });


    it('are circles positioned correctly', function () {
      for(let i = 0; i < items.length(); i++) {
        assert.equal(items.at(i).getRawStyle('position'), 'absolute', 'is circle position absolute');
      }
    });

    it('are circles animated correctly', function () {
      for(let i = 0; i < items.length(); i++) {
        assert.equal(items.at(i).getRawStyle('animation-name'), 'rotate', 'are circles animated correctly');
        assert.equal(items.at(i).getRawStyle('animation-duration'), '2s', 'are circles animated correctly');
        assert.equal(items.at(i).getRawStyle('animation-iteration-count'), 'infinite', 'are circles animated correctly');
      }
    });

    it('are items correctly sized', function() {
      let size = 120;
      let difference = 0;
      for(let i = 0; i < items.length(); i++) {
        let currentSize =  size - difference;
        assert.equal(items.at(i).getRawStyle('width'), `${currentSize}px`, 'has correct width');
        assert.equal(items.at(i).getRawStyle('height'), `${currentSize}px`, 'has correct height');

        difference += 20;
      }
    });

});
