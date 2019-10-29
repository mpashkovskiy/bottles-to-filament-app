var CONFIG = require("./config.json");
var five = require("johnny-five");
var board = new five.Board();

var app = new Vue({
  el: '#app',
  data: {
    boardStatus: 0,
    plasticTypes: CONFIG.plasticTypes,
    T: 0,
    V: 0,
    TH: 1,
    W: 0,
  },
  created: function () {
    var _self = this;
    board.on("ready", function() {
      _self.boardStatus = 1;
      var led = new five.Led(13);
      led.blink(500);
    });
    board.on("close", function() {
      _self.boardStatus = 0;
    });
  },
  methods: {
    setPlastic: function(plastic) {
      this.plasticTypes.forEach(function(p) {
        p.selected = p.icon === plastic.icon;
      });
      this.T = plastic.T;
      this.V = plastic.V;
      this.W = this.TH * 10;
    }
  }
})