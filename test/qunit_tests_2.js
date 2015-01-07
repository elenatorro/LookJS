/*############## TEST FUNCTIONS ##############*/

/*Link test */

function testLinkCreation(href, linkElement) {
  QUnit.test(href, function(assert) {
    var link = Look.getBy.href(href);
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

function testLinkError(src, linkElement) {
  QUnit.test(src, function(assert) {
    var link = Look.getBy.src(src);
    assert.equal(false, link)
  })
}

var linkOptions = {
  'tag':'div',
  'attr': {
    'id':'src fake container'
  },
  'content': [{
    'tag':'a',
    'attr': {
      'href':'http://elenatorro.com'
    }
  }]
}

testLinkError('http://elenatorro.com', Look.create(linkOptions));


/* TRANSLATION */

function testTranslation(localizer, text_element) {
  QUnit.test(localizer, function(assert) {
    var link = Look.changeLanguage('EN', localizer);
    assert.equal(text_element.innerHTML, 'Welcome')
  })
}

var localize = {
  'test_text' : {
    ES : 'Bienvenidos',
    EN : 'Welcome'
  }
};

testTranslation(localize, document.getElementById('test_text'));
