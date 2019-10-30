var CONFIG = require('./config.json')
var five = require('johnny-five')

/* eslint-disable-next-line */
new Vue({
  el: '#app',
  data: {
    board: undefined,
    waiting: false,
    boardOnline: false,
    plasticTypes: CONFIG.plasticTypes,
    T: 0,
    V: 0,
    TH: 1,
    W: 0,
    motorLed: undefined
  },
  created: function () {
    var _self = this
    setTimeout(function () { _self.connect() }, 100)
  },
  methods: {
    connect: function () {
      var _self = this
      if (_self.boardOnline || _self.waiting) {
        return
      }

      console.log('checking connection...')
      _self.waiting = true
      _self.board = new five.Board({repl: false})
      _self.board.on('ready', function () {
        _self.boardOnline = true;
        _self.motorLed = five.Led(CONFIG.MOTOR_PIN)
      })
      _self.board.on('fail', function () {
        setTimeout(function () {
          _self.waiting = false
          _self.connect()
        }, 5000)
      })
      _self.board.on('close', function () {
        _self.boardOnline = false
      })
    },
    setPlastic: function (plastic) {
      this.plasticTypes.forEach(function (p) {
        p.selected = p.icon === plastic.icon
      })
      this.T = plastic.T
      this.V = plastic.V
      this.W = this.TH * 10
    },
    start: function () {
      if (!this.boardOnline) {
        return
      }

      this.motorLed.blink(this.V * 100)
    },
    stop: function () {
      this.motorLed.stop().off()
    }
  }
})
