var CONFIG = require("./config.json");
var five = require("johnny-five");
var board = new five.Board();

var app = new Vue({
  el: '#app',
  data: {
    boardOnline: false,
    plasticTypes: CONFIG.plasticTypes,
    T: 0,
    V: 0,
    TH: 1,
    W: 0,
  },
  created: function () {
    var _self = this;
    board.on("ready", function() {
      _self.boardOnline = true;
    });
    board.on("close", function() {
      _self.boardOnline = false;
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
    },
    start: function() {
      if (!this.boardOnline) {
        return;
      }

      new five
        .Led(CONFIG.MOTOR_PIN)
        .blink(this.V * 100);
    },
    stop: function() {
      new five
        .Led(CONFIG.MOTOR_PIN)
        .stop()
        .off();
    }
  }
})