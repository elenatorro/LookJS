/****************************************************

- LookJS - 

@module: cookies
@requires: look.dom, look.operations 
@author: Elena Torro
Description: This modules manages cookies easily
****************************************************/

Look.cookie = {
  set : function (cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
  },

  get : function (cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0)==' ') c = c.substring(1);
      if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return "";
  },

  exists : function (cname) {
    if (cookie.get(cname) != "") return cookie;
    else return false;
  },

  delete : function(cname) {
    document.cookie = cname + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
  }
};