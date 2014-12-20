/*############## TEST FUNCTIONS ##############*/


/*###### TAG CREATION ######*/

/*Div Creation*/
function testDivCreation(object, container) {
  QUnit.test(object, function(assert) {
    var div = Look.create(object, container);
    assert.equal(container.lastChild, div)
  })
}
testDivCreation({'tag':'div'}, document.getElementById('container_one'));

/*Div Creation by Default*/
function testDivCreationDefault(object) {
  QUnit.test(object, function(assert) {
    var div = Look.create(object);
    assert.equal(document.body.lastChild, div)
  })
}
testDivCreationDefault({'tag':'div'});


/*Div Parameters Id and Class*/
function testDivParameters(object, container) {
  var div = Look.create(object,container);
  QUnit.test(object, function(assert) {
    assert.equal('divClass', div.className);
  });

  QUnit.test(object, function(assert) {
    assert.equal('divId', div.id);
  });
}
testDivParameters({'tag':'div', 'attr' : {'class':'divClass', 'id':'divId'}}, document.getElementById('container_two'));

function testDivRecursion(object, container) {
  var div = Look.create(object,container);
  console.log(object.content);
  QUnit.test(object, function(assert) {
    assert.equal('firstSon', div.firstChild.id);
  });

  QUnit.test(object, function(assert) {
    assert.equal('secondSon', div.lastChild.id);
  });
}

testDivRecursion({
  'tag'   :'div',
   'attr' : {
      'class' : 'divClass',
      'id'    : 'divId2'
      },

    'content' : [{
      'tag'   : 'div',
      'attr'  : {
        'id'  : 'firstSon'
        }
      },{
        'tag'   : 'div',
        'attr'  : {
          'id'  : 'secondSon'
        }
      }]
      },
    document.getElementById('container_three')
  )

  function testDivCopy(copyFrom, copyTo) {
    var div = Look.copy(copyFrom, copyTo);
    QUnit.test(object, function(assert) {
      assert.equal(div, div.lastChild);
    });
  }

  testDivCreationDefault('container_three', 'container_four');
