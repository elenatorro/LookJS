// -- Dependencies ------------------------------------------------------

var should = require("should");
var Look = require("../lib/Look");

// -- Tests -------------------------------------------------------------

describe('Default Test: ', function(){
  describe('Group 2', function(){
    it('should return -1 when the value is not present', function(){
      var look = new Look();
      look.defaultVariable().should.eql('default');
    })
  })
})
