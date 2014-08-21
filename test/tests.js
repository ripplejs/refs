var assert = require('assert');
var refs = require('refs');
var ripple = require('ripple');

describe('refs', function(){
  var View;

  beforeEach(function () {
    View = ripple('<input ref="name" value="foo" name="name" />')
      .use(refs());
  });

  it('should have references', function(){
    var view = new View();
    assert(view.refs);
  });

  it('should store the ref when mounted', function () {
    var view = new View();
    view.appendTo(document.body);
    assert(view.refs.name.nodeName);
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

  it('should work with several refs in the same view', function () {
    View = ripple('<div><input ref="name" value="foo" name="name" /><input ref="password" type="password" name="pwd" /></div>')
      .use(refs());
    var view = new View();
    view.appendTo(document.body);
    assert(view.refs.name.nodeName);
    assert(view.refs.password.nodeName);
    view.destroy();
  });

  it('should work with nested refs', function () {
    View = ripple('<div ref="container"><input ref="name" value="foo" name="name" /></div>')
      .use(refs());
    var view = new View();
    view.appendTo(document.body);
    assert(view.refs.container.nodeName);
    assert(view.refs.name.nodeName);
    view.destroy();
  });
});
