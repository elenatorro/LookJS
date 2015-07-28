/* TRANSLATION */

function testTranslation(localizer, text_element) {
  QUnit.test(localizer, function(assert) {
    Look.language.change('EN', localizer);
    assert.equal(text_element.innerHTML, 'Welcome');
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

function testMultipleElements(localize_multiple, text_elements) {
  QUnit.test(localize_multiple, function(assert) {
    Look.language.change('EN', localize_multiple);
    assert.equal(text_elements[0].innerHTML, 'English');
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
