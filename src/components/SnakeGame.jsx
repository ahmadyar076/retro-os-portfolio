import { useState, useEffect, useRef } from 'react'

/**
 * SnakeGame — standalone classic Snake (core logic step).
 *
 * 20x20 grid. State (useState): snake body (array of {x,y}, head first), food
 * coordinate, movement direction, score, isGameOver. A useEffect drives the
 * game loop (move every SPEED ms); another listens for arrow keys and prevents
 * reversing into the snake's own neck. Collisions with the walls or the body
 * end the game.
 *
 * Styling is intentionally bare (plain colored squares) so the logic can be
 * verified. NOT wired into the window manager yet.
 */
const GRID_SIZE = 20
const CELL = 20 // px
const SPEED = 150 // ms per move
const INITIAL_SNAKE = [
  { x: 10, y: 10 },
  { x: 9, y: 10 },
  { x: 8, y: 10 },
]
const INITIAL_DIRECTION = { x: 1, y: 0 } // moving right

const ARROWS = {
  ArrowUp: { x: 0, y: -1 },
  ArrowDown: { x: 0, y: 1 },
  ArrowLeft: { x: -1, y: 0 },
  ArrowRight: { x: 1, y: 0 },
}

/** Pick a random empty cell (not occupied by the snake). */
function spawnFood(snake) {
  const occupied = new Set(snake.map((s) => `${s.x},${s.y}`))
  let cell
  do {
    cell = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    }
  } while (occupied.has(`${cell.x},${cell.y}`))
  return cell
}

export default function SnakeGame() {
  const [snake, setSnake] = useState(INITIAL_SNAKE)
  const [food, setFood] = useState(() => spawnFood(INITIAL_SNAKE))
  const [direction, setDirection] = useState(INITIAL_DIRECTION)
  const [score, setScore] = useState(0)
  const [isGameOver, setIsGameOver] = useState(false)

  // Refs let the interval/keydown read the latest values without stale
  // closures. `directionRef` is the COMMITTED travel direction (updated only on
  // a tick); `nextDirectionRef` is the queued direction from the keyboard.
  const directionRef = useRef(INITIAL_DIRECTION)
  const nextDirectionRef = useRef(INITIAL_DIRECTION)
  const snakeRef = useRef(snake)
  const foodRef = useRef(food)

  useEffect(() => {
    snakeRef.current = snake
  }, [snake])
  useEffect(() => {
    foodRef.current = food
  }, [food])

  function reset() {
    setSnake(INITIAL_SNAKE)
    snakeRef.current = INITIAL_SNAKE
    const f = spawnFood(INITIAL_SNAKE)
    setFood(f)
    foodRef.current = f
    setDirection(INITIAL_DIRECTION)
    directionRef.current = INITIAL_DIRECTION
    nextDirectionRef.current = INITIAL_DIRECTION
    setScore(0)
    setIsGameOver(false)
  }

  // Keyboard: change direction (no reversing into the neck); restart on game over.
  useEffect(() => {
    function onKeyDown(e) {
      if (isGameOver && (e.key === 'Enter' || e.key === ' ')) {
        e.preventDefault()
        reset()
        return
      }
      const dir = ARROWS[e.key]
      if (!dir) return
      e.preventDefault()
      // Validate against the committed travel direction so two quick presses
      // in one tick can't sneak a 180° reversal.
      const cur = directionRef.current
      if (dir.x === -cur.x && dir.y === -cur.y) return
      nextDirectionRef.current = dir
      setDirection(dir)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [isGameOver])

  // Game loop.
  useEffect(() => {
    if (isGameOver) return
    const id = setInterval(() => {
      const dir = nextDirectionRef.current
      directionRef.current = dir // commit this tick's direction

      const prev = snakeRef.current
      const head = { x: prev[0].x + dir.x, y: prev[0].y + dir.y }

      // Wall collision.
      if (
        head.x < 0 ||
        head.x >= GRID_SIZE ||
        head.y < 0 ||
        head.y >= GRID_SIZE
      ) {
        setIsGameOver(true)
        return
      }

      const ate = head.x === foodRef.current.x && head.y === foodRef.current.y
      const newSnake = [head, ...prev]
      if (!ate) newSnake.pop() // grow only when eating

      // Self collision (head vs the rest of the body).
      for (let i = 1; i < newSnake.length; i++) {
        if (newSnake[i].x === head.x && newSnake[i].y === head.y) {
          setIsGameOver(true)
          return
        }
      }

      setSnake(newSnake)
      if (ate) {
        setScore((s) => s + 1)
        setFood(spawnFood(newSnake))
      }
    }, SPEED)
    return () => clearInterval(id)
  }, [isGameOver])

  // ── Render — CRT-monitor styling ─────────────────────────────────────────
  const headKey = `${snake[0].x},${snake[0].y}`
  const bodySet = new Set(snake.slice(1).map((s) => `${s.x},${s.y}`))

  const cells = []
  for (let y = 0; y < GRID_SIZE; y++) {
    for (let x = 0; x < GRID_SIZE; x++) {
      const key = `${x},${y}`
      let cls = 'bg-green-950' // empty
      if (key === headKey) cls = 'bg-green-400 shadow-[0_0_6px_#4ade80]'
      else if (bodySet.has(key)) cls = 'bg-green-500'
      else if (food.x === x && food.y === y) cls = 'bg-red-500'
      cells.push(
        <div
          key={key}
          className={`border border-green-900/40 ${cls}`}
          style={{ width: CELL, height: CELL }}
        />,
      )
    }
  }

  return (
    <div className="flex h-full select-none flex-col items-center justify-center gap-3 bg-black p-3 font-mono">
      {/* Scoreboard */}
      <div className="text-xl font-bold tracking-widest text-green-400 [text-shadow:0_0_6px_#22c55e]">
        SCORE: {String(score).padStart(3, '0')}
      </div>

      {/* CRT screen — inset 3D frame around the dark-green grid. */}
      <div className="win95-inset relative bg-green-950 p-1">
        <div
          className="grid"
          style={{
            gridTemplateColumns: `repeat(${GRID_SIZE}, ${CELL}px)`,
          }}
        >
          {cells}
        </div>

        {/* GAME OVER overlay */}
        {isGameOver && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black/75">
            <p className="animate-pulse text-3xl font-bold tracking-widest text-red-500">
              GAME OVER
            </p>
            <p className="animate-pulse text-sm tracking-widest text-green-400">
              PRESS SPACE TO RESTART
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
