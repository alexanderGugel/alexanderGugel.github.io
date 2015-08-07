import Game from './Game'
import fit from 'canvas-fit'
import loop from 'raf-loop'
import throttle from 'lodash.throttle'

let canvas = document.getElementById('game')
let context = canvas.getContext('2d')

let game = new Game(context)

loop(throttle(() => game.step(), (1 / 0.06) * 2)).start()

window.addEventListener('resize', fit(canvas), false)
window.addEventListener('resize', () => game.reset(), false)

document.addEventListener('keydown', (e) => game.onKeydown(e))
