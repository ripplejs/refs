module.exports = function(View) {

  View.on('construct', function(view){
    view.refs = {};
  });

  View.directive('ref', function(view, node, attr, value){
    view.refs[value] = node;
  });

};