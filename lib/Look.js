'use strict';

var Look = {
  // -- Private --------------------------------------------------------------

_setAttributes : function(element, attributes) {
                for (var name in attributes) {
                  element.setAttribute(name, attributes[name]);
                }
              },
 _setContent : function(element, content) {
                  var look = this;
                  content.forEach(function(object) {
                    look.create(object,element);
                  });
                },

_lookFor : function(collection, attribute, position) {

                },
  // -- Public ---------------------------------------------------------------

create : function(object, container) {
          var element = this.newElement(object.tag);
          this._setAttributes(element, object.attr);
          if (object.content) {this._setContent(element, object.content);}
          container ? container.appendChild(element) : document.body.appendChild(element);
          return element;
        },
copy   : function(from, to, remove) {
          this.create({'tag':'div', 'id': to});
          this.getBy.id(to).innerHTML = this.getBy.id(from).innerHTML;
        },

      // -- document operations substitution ----------------------------------

newElement : function(tag) {
            return document.createElement(tag);
          },

getBy : {
    id : function(id) {
         return document.getElementById(id);
      },
    class : function(class, at) {
          at ? document.getElementsByClassName(class)[at] : document.getElementsByClassName(class);
      },
    href : function(href, at) {
           at ? this._lookFor(document.getElementsByTagName('a'), 'href') : at ? this._lookFor(document.getElementsByTagName('a'), 'href', at)
      }
    },


}
