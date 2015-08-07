const DIRECTIONS = {
  UP: 1,
  RIGHT: 2,
  DOWN: -1,
  LEFT: -2
}

const KEY_TO_DIRECTION = {
  37: DIRECTIONS.LEFT,
  38: DIRECTIONS.UP,
  39: DIRECTIONS.RIGHT,
  40: DIRECTIONS.DOWN
}

export default class Game {
  constructor (context, options) {
    options = options || {}
    this.context = context
    this.canvas = context.canvas
    this.cellSize = options.cellSize || 15
    this.initialLength = options.initialLength || 10
    this.diff = null
    this.reset()
  }
  reset () {
    this.direction = DIRECTIONS.RIGHT
    this.food = this.createFood()
    this.snake = this.createSnake()
  }
  createFood () {
    return {
      x: ~~(Math.random() * (this.canvas.width - this.cellSize) / this.cellSize),
      y: ~~(Math.random() * (this.canvas.height - this.cellSize) / this.cellSize)
    }
  }
  createSnake () {
    return Array.apply(null, Array(this.initialLength)).map((_, i) => { return { x: i, y: 0 }}).reverse()
  }
  get maxX () {
    return ~~(this.canvas.width / this.cellSize)
  }
  get maxY () {
    return ~~(this.canvas.height / this.cellSize)
  }
  step (diff) {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)

    var nx = this.snake[0].x
    var ny = this.snake[0].y

    switch (this.direction) {
      case DIRECTIONS.RIGHT:
        nx++
        break
      case DIRECTIONS.LEFT:
        nx--
        break
      case DIRECTIONS.UP:
        ny--
        break
      case DIRECTIONS.DOWN:
        ny++
    }

    if (nx <= -1 || nx >= this.maxX || ny <= -1 || ny >= this.maxY || this.checkCollision(nx, ny, this.snake)) {
      return this.reset()
    }

    var tail

    if (nx === this.food.x && ny === this.food.y) {
      tail = {x: nx, y: ny}
      this.score++
      this.food = this.createFood()
    } else {
      tail = this.snake.pop()
      tail.x = nx
      tail.y = ny
    }

    this.snake.unshift(tail)

    this.paintSnake()
    this.paintFood()

    var score_text = 'Score: ' + (this.snake.length - this.initialLength)
    this.context.fillText(score_text, 5, this.canvas.height - 5)
  }
  paintSnake (x, y) {
    this.snake.forEach(cell => {
      this.context.fillStyle = '#333'
      this.context.fillRect(cell.x * this.cellSize, cell.y * this.cellSize, this.cellSize, this.cellSize)
    })
  }
  paintFood () {
    this.context.fillStyle = '#3D9970'
    this.context.fillRect(this.food.x * this.cellSize, this.food.y * this.cellSize, this.cellSize, this.cellSize)
  }
  checkCollision (x, y, array) {
    for (var i = 0; i < array.length; i++) {
      if (array[i].x === x && array[i].y === y) return true
    }
    return false
  }
  onKeydown (e) {
    if (KEY_TO_DIRECTION[e.which] && KEY_TO_DIRECTION[e.which] !== -this.direction) {
      this.direction = KEY_TO_DIRECTION[e.which]
    }
  }
}
