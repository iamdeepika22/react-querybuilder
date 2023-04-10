"use strict";

var _chai = require("chai");
var _ = require("..");
describe('findRule', function () {
  var query = {
    combinator: 'and',
    id: '111',
    rules: [{
      id: '222',
      field: 'firstName',
      value: 'Test',
      operator: '='
    }, {
      id: '333',
      field: 'firstName',
      value: 'Test',
      operator: '='
    }, {
      combinator: 'and',
      id: '444',
      rules: [{
        id: '555',
        field: 'firstName',
        value: 'Test',
        operator: '='
      }]
    }]
  };
  it('should find a root rule', function () {
    (0, _chai.expect)((0, _.findRule)('111', query)).to.be.a('object');
  });
  it('should find a sub rule', function () {
    (0, _chai.expect)((0, _.findRule)('555', query)).to.be.a('object');
  });
  it('should not find an invalid id', function () {
    (0, _chai.expect)((0, _.findRule)('777', query)).to.be.undefined;
  });
});