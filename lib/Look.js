Look = {
  // -- Private --------------------------------------------------------------

  _setAttributes : function(element, attributes) {
                    for (var name in attributes) {
                      element.setAttribute(name, attributes[name]);
                    };
                  },
     _setContent : function(element, content) {
                      var look = this;
                      content.forEach(function(object) {
                        look.create(object,element);
                      })
                    },

  // -- Public ---------------------------------------------------------------

          create : function(object, container) {
                    var element = document.createElement(object.tag);
                    this._setAttributes(element, object.attr);
                    if (object.content) this._setContent(element, object.content);
                    container ? container.appendChild(element) : document.body.appendChild(element);
                    return element;
                  };
          copy   : function(from, to, remove) {
                    var new = this.create({'tag':'div', 'id': from});
                    document.getElementById(from).innerHTML = document.getElementById(to).innerHTML;

                  };
}
