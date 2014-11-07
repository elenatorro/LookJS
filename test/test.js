// -- Dependencies ------------------------------------------------------
var should = require("should");
var Look = require("../lib/Look");

// -- Tests -------------------------------------------------------------

describe('Creating DOM elements (not inserting): ', function(){
  describe('Creating DIVS, very simple', function(){
    it('Create a new simple div', function(){
      var look = new Look();
      look.createDiv().should.eql('<div></div>');
    })
  })
})
