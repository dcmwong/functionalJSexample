/* global define */
define([
  'jquery'
, 'ramda'
, 'pointfree'
, 'maybe'
, 'player'
, 'io'
, 'bacon'
, 'http'
], function($, _, P, Maybe, Player, io, bacon, http) {
  'use strict';
  io.extendFn();

  // HELPERS ///////////////////////////////////////////
  var compose = P.compose;
  var map = P.map;
  var log = function(x) { console.log(x); return x; }
  var fork = _.curry(function(f, future) { return future.fork(log, f); })
  var setHtml = _.curry(function(sel, x) { return $(sel).html(x); });
  var getData = _.curry(function(name, elt) { return $(elt).data(name); });
  var last = function(ar) { return ar[ar.length - 1]; };

  // PURE //////////////////////////////////////////////////
  var listen = _.curry(function(type, elt) {
     return bacon.fromEventTarget(elt, type);
  });

  var getDom = $.toIO();
  
  //keyPressStream :: Dom -> EventStream DomEvent
  var keypressStream = listen('keyup'); 

  // Dom -> String
  var eventValue = compose(_.get('value'),_.get('target'));
 



  var valueStream = compose(map(eventValue), keypressStream);
  // IMPURE ////////////////////////////////////////////////
  
  getDom("#search").map(valueStream).runIO().onValue(log); 
});
