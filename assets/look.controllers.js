'use strict'

var eyes = {
  left: Look.createFromComponent('Eye', Look.getBy.id('left-eye')),
  right: Look.createFromComponent('Eye', Look.getBy.id('right-eye'))
}

eyes.leftIris = eyes.left.firstChild
eyes.rightIris = eyes.right.firstChild

var positions = {
  eyes: {
    left: {
      left: {
        min: eyes.left.offsetLeft,
        max: eyes.left.offsetLeft + 100
      },
      top: {
        min: eyes.left.offsetTop,
        max: eyes.left.offsetTop + 100
      }
    },
    right: {
      left: {
        min: eyes.right.offsetLeft,
        max: eyes.right.offsetLeft + 100
      },
      top: {
        min: eyes.right.offsetTop,
        max: eyes.right.offsetTop + 100
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

function isOnRange (eye, position, coord) {
  return ((eye[coord].min <= position[coord]) && (eye[coord].max >= position[coord]))
}

// Example:
// position = {left: 20, top: 30}
// eye = 'left', 'right'
function setPosition (position) {
  if (isOnRange(positions.eyes.left, position, 'left')) {
    eyes.leftIris.style.left = position.left + 'px'
  }

  if (isOnRange(positions.eyes.left, position, 'top')) {
    eyes.leftIris.style.top = position.top + 'px'
  }

  if (isOnRange(positions.eyes.right, position, 'left')) {
    eyes.rightIris.style.left = position.left + 'px'
  }

  if (isOnRange(positions.eyes.right, position, 'top')) {
    eyes.rightIris.style.top = position.top + 'px'
  }
}
var position = {
  left: 0,
  right: 0
}

document.body.addEventListener('mousemove', function (mouse) {
  console.log(eyes.left.offsetRight)
  console.log(eyes.left.offsetBottom)
  position.left = mouse.x
  position.top = mouse.y
  setPosition(position)
})
