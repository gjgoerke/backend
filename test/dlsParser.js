var assert = require('assert')

var parser = require('../models/queryParser')

const pairs = [
  ['([a,b],c)', 'f(((a,b) => c)).'],
  ['([aAv,bxxs],cDs)', 'f(((aAv,bxxs) => cDs)).'],
  ['([a,b],c)', 'f(((a,b) => c)).'],
  ['([aAv,bxxs],cDs)', 'f(((aAv,bxxs) => cDs)).'],
  ['([a,b],c)', 'f(((a,b) => c)).'],
  ['([aAv,bxxs],cDs)', 'f(((aAv,bxxs) => cDs)).'],
  ['([(~ a),b],c)', 'f((((~ a),b) => c)).'],
  ['([(~  a), (Id b)],c)','f((((~ a),((# 1^d: b))) => c)).'],
  ['([(~  a), (Id^1 b)],c)','f((((~ a),((# 3^d: b))) => c)).'],
  ['([(~  a), (Aw b)],c)','f((((~ a),((# 2^d: ~ b))) => c)).'],
  ['([(~  a), (Aw^1 b)],c)','f((((~ a),((# 4^d: ~ b))) => c)).'],
  ['([(~  a), (Ob b)],c)','f((((~ a),(((# 1^d: b), (# 2^d: ~ b)))) => c)).'],
  ['([(~  a), (Ob^1 b)],c)','f((((~ a),(((# 3^d: b), (# 4^d: ~ b)))) => c)).'],
  ['([(~  a), (Fb b)],c)','f((((~ a),(((# 1^d: (~ b)), (# 2^d: ~ (~ b))))) => c)).'],
  ['([(~  a), (Fb^1 b)],c)','f((((~ a),(((# 3^d: (~ b)), (# 4^d: ~ (~ b))))) => c)).'],
  ['([(~  a), (Pm b)],c)','f((((~ a),(((* 1^d: b), (* 2^d: ~ b)))) => c)).'],
  ['([(~  a), (Pm^1 b)],c)','f((((~ a),(((* 3^d: b), (* 4^d: ~ b)))) => c)).'],
  ['([a,(b; d)],c)', 'f(((a,(b;d)) => c)).'],
  ['([a,(b, d)],c)', 'f(((a,(b,d)) => c)).'],
  ['([a,(b => d)],c)', 'f(((a,(b=>d)) => c)).'],
  ['([a,(b <=> d)],c)', 'f(((a,(b<=>d)) => c)).'],
  ['([(~  a), (b O> d)],c)', 'f((((~ a),(((b => ((# 1^d: d), (# 2^d: ~ d))),((# 1^d: ((# 1^d: b), (# 2^d: ~ b))) => (# 1^d: ((# 1^d: d), (# 2^d: ~ d))))))) => c)).'],
  ['([(~  a), (b P> d)],c)','f((((~ a),(((b => ((* 1^d: d), (* 2^d: ~ d))),((# 1^d: ((* 1^d: b), (* 2^d: ~ b))) => (# 1^d: ((* 1^d: d), (* 2^d: ~ d))))))) => c)).'],
  ['([(~  a), (b O>^1 d)],c)', 'f((((~ a),(((b => ((# 3^d: d), (# 4^d: ~ d))),((# 3^d: ((# 3^d: b), (# 4^d: ~ b))) => (# 3^d: ((# 3^d: d), (# 4^d: ~ d))))))) => c)).'],
  ['([(~  a), (b P>^1 d)],c)','f((((~ a),(((b => ((* 3^d: d), (* 4^d: ~ d))),((# 3^d: ((* 3^d: b), (* 4^d: ~ b))) => (# 3^d: ((* 3^d: d), (* 4^d: ~ d))))))) => c)).'],
  ['([(~  a), (b O>^2 d)],c)', 'f((((~ a),(((b => ((# 5^d: d), (# 6^d: ~ d))),((# 5^d: ((# 5^d: b), (# 6^d: ~ b))) => (# 5^d: ((# 5^d: d), (# 6^d: ~ d))))))) => c)).'],
  ['([(~  a), (b P>^2 d)],c)','f((((~ a),(((b => ((* 5^d: d), (* 6^d: ~ d))),((# 5^d: ((* 5^d: b), (* 6^d: ~ b))) => (# 5^d: ((* 5^d: d), (* 6^d: ~ d))))))) => c)).'],
  ['([(~  a), (b F> d)],c)', 'f((((~ a),(((b => ((# 1^d: (~ d)), (# 2^d: ~ (~ d)))),((# 1^d: ((# 1^d: (~ b)), (# 2^d: ~ (~ b)))) => (# 1^d: ((# 1^d: (~ d)), (# 2^d: ~ (~ d)))))))) => c)).'],
  ['(c)', 'f((c)).'],
  ['([((Ob X) => (Ob^1 X))],c)','f(((((((# 1^d: X__var), (# 2^d: ~ X__var)))=>(((# 3^d: X__var), (# 4^d: ~ X__var))))) => c)).'],
  ['([((Ob X) => (Ob^[x,y] X))],c)','f(((((((# 1^d: X__var), (# 2^d: ~ X__var)))=>(((# 2661^d: X__var), (# 2662^d: ~ X__var))))) => c)).'],
  ['([  a    ,   b   ] , c     )', 'f(((a,b) => c)).']
];

describe("Query parser", function(){
  it(`should parse the strings in ${pairs} correctly`, function(done){
    for(var i = 0 ; i < pairs.length; i++) {
      assert.equal(parser.parse(pairs[i][0]), pairs[i][1]);
    }
    done();
  });
})

