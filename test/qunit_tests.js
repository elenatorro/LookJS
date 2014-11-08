var Look = new Look();


/*############## TEST FUNCTIONS ##############*/


/*###### TAG CREATION ######*/
function testDivCreation(name, father) {
  QUnit.test(name, function(assert) {
    var son = Look.createDiv(father);
    assert.equal(father.lastChild, son)
  })
}


/*###### PLAYING WITH CSS ######*/
function testAddingBackgroundColor(name, element, options) {
  QUnit.test(name, function(assert) {
    Look.cssOptions(element, options);
    assert.equal(element.style.backgroundColor, 'blue');
  })
}

function testAddingCssOptions(name, element, options) {
  QUnit.test(name, function(assert) {
    Look.cssOptions(element, options);
    assert.equal(element.style.width, options.width);
    assert.equal(element.style.height, options.height);
    assert.equal(element.style.backgroundColor, options.backgroundColor);
  })
}

/*############## CALLING FUNCTIONS ##############*/
testDivCreation("Look.createDiv, father",
                  document.getElementById('father')
                );

testAddingBackgroundColor("Look.cssOptions, element, options",
                  document.getElementById('father'),
                  {'backgroundColor': 'blue'}
                );

testAddingCssOptions("Look.cssOptions, element, options",
                  document.getElementById('father'),
                    {
                      'backgroundColor': 'blue',
                      'width': '100px',
                      'height': '100px'
                    }
                );
