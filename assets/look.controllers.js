'use strict'

var eyes = {}

 function deleteEyes() {
  Look.remove(eyes.left, Look.getBy.id('left-eye'))
  Look.remove(eyes.right, Look.getBy.id('right-eye'))
 }

function drawEyes () {
  document.body.removeEventListener('mousemove')

  eyes.leftIris = eyes.left.firstChild
  eyes.rightIris = eyes.right.firstChild

  var positions = {
    eyes: {
      left: {
        left: {
          min: eyes.left.offsetLeft,
          max: eyes.left.offsetLeft + eyes.size
        },
        top: {
          min: eyes.left.offsetTop,
          max: eyes.left.offsetTop + eyes.size
        }
      },
      right: {
        left: {
          min: eyes.right.offsetLeft,
          max: eyes.right.offsetLeft + eyes.size
        },
        top: {
          min: eyes.right.offsetTop,
          max: eyes.right.offsetTop + eyes.size
        }
      }
    }
  }

  positions.eyes.leftIris = {
    left: eyes.leftIris.offsetLeft,
    top: eyes.leftIris.offsetTop
  }

  positions.eyes.rightIris = {
    left: eyes.rightIris.offsetLeft,
    top: eyes.rightIris.offsetTop,
  }

  function getPosition (eye, position, coord) {
    if ((eye[coord].min <= position[coord]) && (eye[coord].max >= position[coord])) {
      return position[coord] + 'px'
    }
    if (eye[coord].min <= position[coord]) {
      return eye[coord].max + 'px'
    }

    if (eye[coord].max >= position[coord]) {
      return eye[coord].min + 'px'
    }
  }

  function setPosition (position) {
    Look.style.set(eyes.leftIris, 'left', getPosition(positions.eyes.left, position, 'left'))
    Look.style.set(eyes.leftIris, 'top', getPosition(positions.eyes.left, position, 'top'))
    Look.style.set(eyes.rightIris, 'left', getPosition(positions.eyes.right, position, 'left'))
    Look.style.set(eyes.rightIris, 'top', getPosition(positions.eyes.right, position, 'top'))
  }

  var position = {
    left: 0,
    right: 0
  }

  document.body.addEventListener('mousemove', function (mouse) {
    position.left = mouse.x
    position.top = mouse.y
    setPosition(position)
  })
}

function initEyes() {
  deleteEyes()
  eyes = {
    left: Look.createFromComponent('Eye', Look.getBy.id('left-eye')),
    right: Look.createFromComponent('Eye', Look.getBy.id('right-eye'))
  }

  eyes.size = eyes.left.clientHeight - 20

  drawEyes()
}

initEyes()

window.onresize = initEyes
