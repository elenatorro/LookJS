#LookJS

##What is it?

LookJS is a tiny library created for DOM and frontend operations. It is just implemented in order to solve personal problems I have had to manage while developing web applications and websites.

###Download it:

* [Look.js](https://github.com/elenatorro/LookJS/blob/master/lib/Look.js)
* [Look.min.js](https://github.com/elenatorro/LookJS/blob/master/lib/Look.min.js)

##Features
* No dependencies
* Very simple
* Open Source
* Intuitive language

##How to use it

###DOM operations

####Object creation
* 'container' is optional, if it's not set, the new elements will append to the body *

```
var div = Look.create(object, container);
Look.create(object, container)
Look.createMany(3, object, container)
```

####Object copy
```
Look.copy(objectFrom, containerDestination);
```

####JSON structure for HTML tags

Objects are send as JSON objects. In this way, it is easier to say if you want an element to have an id, a class or any other attribute at the same time you create it. And you can create multiple elements at the same time.


```
{
  'tag'   :'div',
  'attr' : {
    'class' : 'divClass',
    'id'    : 'divId2'
    },

    'content' : [
      {
        'tag'   : 'div',
        'attr'  : {
            'id'  : 'firstSon'
            }
      },
      {
        'tag'   : 'div',
        'attr'  : {
            'id'  : 'secondSon'
          }
      }]
    }
```

Structure:
* First, 'tag' is the name of the element (div, section, aside...)
* Then, 'attr' is for the different attributes.
* Then, 'content', where you can just set text or other elements.

###Get elements

```
Look.getBy.id(id)
Look.getBy.className(class, at)
Look.getBy.tagName(tag, at)
Look.getBy.href(link, at) //only for elements with href attribute
Look.getBy.src(link, at) //only for images
```

*'at' is optional, it indicates the position, so the function only returns one element.
Otherwise, it returns a htmlcollection*

### Simple Multilanguage

You can create multilanguage webpages easly:

* Define a JSON localizer

```
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
```

* Group the localizations by:
  * id
  * class
  * tag

*Languages should follow the two-letter ISO 639-1 codes.*
##Live Demo

[coming soon...]
