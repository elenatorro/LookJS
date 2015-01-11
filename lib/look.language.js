Look.language = {
  change :
  function(language, localizer) {
    if (localizer['id']) {
      for (var element in localizer['id']) {
        Look.setText.to.oneElement(Look.getBy.id(element), localizer['id'][element][language]);
      }
    };

    if (localizer['class']) {
      for (var element in localizer['class']) {
        Look.setText.to.manyElements(Look.getBy.className(element), localizer['class'][element], language);
      }
    };

    if (localizer['tag']) {
      for (var element in localizer['tag']) {
        Look.setText.to.manyElements(Look.getBy.tagName(element), localizer['tag'][element], language);
      }
    };

    if (localizer['allClass']) {
      for (var element in localizer['allClass']) {
        Look.setText.to.allElements(Look.getBy.className(element), localizer['allClass'][element][language]);
      }
    };

    if (localizer['allTag']) {
      for (var element in localizer['allTag']) {
        Look.setText.to.allElements(Look.getBy.className(element), localizer['allTag'][element][language]);
      }
    };
  }
}
