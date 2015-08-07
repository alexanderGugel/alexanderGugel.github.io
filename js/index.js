import Game from './Game'
import fit from 'canvas-fit'
import loop from 'raf-loop'
import throttle from 'lodash.throttle'

var isTouchDevice = 'ontouchstart' in document.documentElement

if (!isTouchDevice) {
  let canvas = document.createElement('canvas')
  let context = canvas.getContext('2d')
  let game = new Game(context)

  document.body.appendChild(canvas)

  loop(throttle(() => game.step(), (1 / 0.06) * 2)).start()

  window.addEventListener('resize', fit(canvas), false)
  window.addEventListener('resize', () => game.reset(), false)

  document.addEventListener('keydown', (e) => game.onKeydown(e))
}
