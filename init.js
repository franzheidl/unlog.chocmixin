function unlog(lang) {
  Recipe.run(function(recipe) {

    var r, s, regex;
    var scope = Document.current().rootScope();

    if (recipe.selection.length > 0) {
      r = recipe.selection;
    }
    else {
      r = new Range(0, recipe.length);
    }
    s = recipe.textInRange(r);

    if (lang === 'JS') {
      if (scope === 'js.source') {
        regex = new RegExp(/console.log\(.*?\);/g);
      }
      else {
        Alert.show('The current document does not appear to be Javascript.');
        return;
      }
    }
    else if (lang === 'Coffee') {
      if (scope === 'coffee.source') {
        regex = new RegExp(/console.log.*/g);
      }
      else {
        Alert.show('The current document does not appear to be Coffeescript.');
        return;
      }
    }

    var t = regex;
    if (s.search(t) > -1) {
      s = s.replace(t, '');
      recipe.replaceTextInRange(r, s);
    }
    else {
      Alert.show('No console.log(s) to be found.');
    }


  });
}



Hooks.addMenuItem('Actions/JavaScript/Remove console.log(s)', '', function() {
  unlog('JS');
});

Hooks.addMenuItem('Actions/CoffeeScript/Remove console.log(s)', '', function() {
  unlog('Coffee');
});