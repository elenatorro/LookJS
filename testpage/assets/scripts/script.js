'use strict';

Look = {
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
          this.get.id(to).innerHTML = this.get.id(from).innerHTML;
        },

      // -- document operations substitution ----------------------------------

newElement : function(tag) {
            return document.createElement(tag);
          },
get : {
     id : function(tag) {
       return document.getElementById(tag);
    },
  class : function(tag, at) {
        at ? document.getElementsByClassName(tag)[at] : document.getElementsByClassName(tag);
    }
  }

}
