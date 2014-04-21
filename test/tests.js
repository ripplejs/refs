var assert = require('assert');
var refs = require('refs');
var ripple = require('ripple');

describe('refs', function(){
  var View;

  beforeEach(function () {
    View = ripple('<form><input ref="name" value="foo" name="name" /><input ref="name1" value="bar" name="name1" /></form>')
      .use(refs);
  });

  it('should have references', function(){
    var view = new View();
    assert(view.refs);
    assert(view.refs.name);
    assert(view.refs.name1);
  });

  it('should store the ref when mounted', function () {
    var view = new View();
    view.appendTo(document.body);
    assert(view.refs.name.nodeName);
    assert(view.refs.name1.nodeName);
    view.destroy();
  });

  it('should not share refs between instances', function () {
    var one = new View();
    var two = new View();
    one.appendTo(document.body);
    two.appendTo(document.body);
    assert(one.refs !== two.refs);
    one.destroy();
    two.destroy();
  });

  it('should remove references when destroyed', function () {
    var view = new View();
    view.appendTo(document.body);
    view.destroy();
    assert(view.refs == null);
  });


});
