var Look = new Look();

function testDivCreation(name, father) {
  QUnit.test(name, function(assert) {
    var son = Look.createDiv(father.id);
    assert.equal(father.lastChild, son)
  })
}

testDivCreation("Look.createDiv, father", document.getElementById('father'));
