var assert = require('assert');
var refs = require('refs');
var ripple = require('ripple');

describe('refs', function(){
  var View;

  beforeEach(function () {
    View = ripple('<input ref="name" value="foo" name="name" />')
      .use(refs);
  });

  it('should not have a reference before mounting', function(){
    var view = new View();
    assert(view.refs == null);
  });

  it('should store the ref when mounted', function () {
    var view = new View();
    view.mount(document.body);
    assert(view.refs.name.nodeName);
    view.unmount();
  });

  it('should not share refs between instances', function () {
    var one = new View();
    var two = new View();
    one.mount(document.body);
    two.mount(document.body);
    assert(one.refs.name !== two.refs.name);
  });

  it('should remove references when unmounted', function () {
    var view = new View();
    view.mount(document.body);
    view.unmount();
    assert(view.refs == null);
  });

});