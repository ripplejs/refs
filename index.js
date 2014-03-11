module.exports = function(View) {

  /**
   * Reset the refs whenever the view is
   * unmounted so that when it is re-rendered
   * it references the correct elements
   */
  View.on('before mount', function(){
    this.refs = {};
  });

  View.on('unmount', function(){
    this.refs = null;
  });

  View.directive('ref', function(view, node, attr, value){
    view.refs[value] = node;
  });

};