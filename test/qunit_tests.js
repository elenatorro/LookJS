var Look = new Look();


/*############## TEST FUNCTIONS ##############*/


/*###### TAG CREATION ######*/

/*Div Creation*/
function testDivCreation(object, container) {
  QUnit.test(object, function(assert) {
    var div = Look.create(object, container);
    assert.equal(container.lastChild, div)
  })
}
testDivCreation({'tag':'div'}, 'container');

/*Div Creation by Default*/
function testDivCreationDefault(object) {
  QUnit.test(object, function(assert) {
    var div = Look.create(object);
    assert.equal(body.lastChild, div)
  })
}
testDivCreationDefault({'tag':'div'});


/*Div Parameters Id and Class*/
function testDivParameters(object, container) {
  QUnit.test(object, function(assert) {
    var div = Look.create(object);
    assert.equal('divClass', div.className);
  });

  QUnit.test(object, function(assert) {
    var div = Look.create(object);
    assert.equal('divId', div.id);
  });

  QUnit.test(object, function(assert) {
    var div = Look.create(object);
    assert.equal('tar', div.id);
  });
}
testDivParameters({'tag':'div', 'class':'divClass', 'id':'divId'}, 'container');



/*TEST*/
