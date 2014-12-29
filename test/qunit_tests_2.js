/*############## TEST FUNCTIONS ##############*/

/*Link test */

function testLinkCreation(href, linkElement) {
  QUnit.test(href, function(assert) {
    var link = Look.getBy.href(href);
    console.log(link);
    assert.equal(linkElement.firstChild, link)
  })
}

var linkOptions = {
  'tag':'div',
  'attr': {
    'id':'link container'
  },
  'content': [{
    'tag':'a',
    'attr': {
      'href':'http://elenatorro.com'
    }
  }]
}

testLinkCreation('http://elenatorro.com', Look.create(linkOptions));
