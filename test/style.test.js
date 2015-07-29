/*############## TEST FUNCTIONS ##############*/

var container = Look.getBy.id('box-container');
var box = Look.create({tag: 'div', attr: {class: 'box'}}, container);

function testSetStyle(object) {
  QUnit.test(object, function(assert) {
  	Look.style.setStyle(box, {backgroundColor: 'green'});
    assert.equal(box.style['backgroundColor'], 'green');
  })
}

testSetStyle(box);

function testSetProperty(object) {
  QUnit.test(object, function(assert) {
  	Look.style.setProperty(box, 'borderColor', 'blue');
    assert.equal(box.style['borderColor'], 'blue');
  })
}

testSetProperty(box);