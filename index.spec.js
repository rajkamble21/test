const assert = require('assert');
const quixote = require("quixote");

describe('Home page layout', function () {

    let frame;

    let unorderedlist, anchors, wrapper, heading, navContainer, navLeft, navRight;

    before(function (done) {
      frame = quixote.createFrame({
          src: 'base/src/index.html'
      }, done);
    });

    after(function () {
      frame.remove();
    });

    beforeEach(function (done) {
      frame.reload(function() {
        unorderedlist = frame.getAll("ul.nav").at(0);
        anchors = frame.getAll('li a');
        wrapper = frame.get('div.wrapper');
        heading = frame.get('span.heading');
        navContainer = frame.get("nav.nav-container");
        navLeft = frame.get("ul.nav-left");
        navRight = frame.get("ul.nav-right");
        done();
      });
    });

    it('default navbar decoration is removed', function () {
      for(let i = 0; i < anchors.length(); i++) {
        assert.equal(anchors.at(i).getRawStyle('text-decoration').split(' ')[0], 'none', 'default decoration removed from anchors');
      }
    });

    it('navbar text is white', function () {
      for(let i = 0; i < anchors.length(); i++) {
        assert.equal(anchors.at(i).getRawStyle('color'), 'rgb(255, 255, 255)', 'text from navbar options is colored white');
      }
    });

    it('navbar background is black', function () {
      assert.equal(unorderedlist.getRawStyle('background-color'), 'rgba(0, 0, 0, 0)', 'navbar background is black');
    });

    it('padding for navbar is correct', function() {
      for(let i = 0; i < anchors.length(); i++) {
        assert.equal(anchors.at(i).getRawStyle('padding'), '15px', 'added navbar item padding of 15px');
      }
    })

    it('navbar items displayed as block', function() {
      for(let i = 0; i < anchors.length(); i++) {
        assert.equal(anchors.at(i).getRawStyle('display'), 'block', 'navbar items are displayed as a block');
      }
    })

    it('page image is displayed', function () {
      let urlParts = wrapper.getRawStyle('background-image').split('/');
      assert.equal(urlParts[urlParts.length - 1], 'home-page.png")', 'correct page image is shown');
    });

    it('page heading has correct text displayed', function() {
      assert.equal(heading.toDomElement().textContent, 'Home Page', 'page displays correct heading text');
    });

    it('page heading has correct font size', function() {
      assert.equal(heading.getRawStyle('font-size'), '60px', 'correct size of page heading');
    });
    
    it('nav-container is flex', function () {
      assert.equal(navContainer.getRawStyle('display'), "flex", "display is flex");
    });

    it('nav-left has correct flex-grow value', function () {
      assert.equal(navLeft.getRawStyle('flex-grow'), '1', "nav-left has correct flex-grow value");
    });
    it('nav-left is at the start', function () {
      assert.equal(navLeft.getRawStyle('justify-content'), 'flex-start', "nav-left is at the start");
    });
    it('nav-right is at the end', function () {
      assert.equal(navRight.getRawStyle('justify-content'), 'flex-end', "nav-left is at the start");
    });

    it('includes method is browser compatible', function() {
      String.prototype.includes = function() {}
      assert.equal("test string".includes("test"), undefined)
      require('../src/main.js');
      assert.equal("test string".includes("test"), true)
    })


});
