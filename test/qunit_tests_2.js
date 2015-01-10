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
  id : {
    'test_text' : {
      ES : 'Bienvenidos',
      EN : 'Welcome'
    }
  },

  class : {
    'test_class_text' : {
      0 : {
        ES : 'Hola',
        EN : 'Hello'
      },

      1 : {
        ES : 'Adios',
        EN : 'Bye'
      }
    }
  }
};

testTranslation(localize, document.getElementById('test_text'));

function testMultipleElements(localizer, text_element) {
  QUnit.test(localizer, function(assert) {
    var link = Look.changeLanguage('EN', localizer);
    assert.equal(text_element[0].innerHTML, 'English')
  })
}

var localize_multiple = {
    class : {
      'test_multiple_elements' : {
        0 : {
          ES : 'Español',
          EN : 'English'
        },

        1 : {
          ES : 'Español',
          EN : 'English'
        }
      }
    }
  };

  testMultipleElements(localize_multiple, document.getElementsByClassName('test_multiple_elements'));
