do ->
parrot.$ ->
  initialize = ->
    parser = new UAParser().getResult()
    delete parser.ua
    parser.cpu = parser.cpu.architecture if parser.cpu.architecture?
    delete parser.cpu
    _device = parser.device
    delete parser.device
    parser[property] = value for property, value of _device when value?
    parrot.device = parser

    # screen
    w = screen.width
    h = screen.height
    size = if (h > w and w < 480) or (h < w and h < 480) then 'small' else 'normal'
    orientation = if ((h / w) < 1) then 'landscape' else 'portrait'
    # fix desktop detection
    parrot.device.type = 'desktop' if not parrot.device.type? and size is 'normal'

    parrot.device.screen =
      width       : w
      height      : h
      size        : size
      orientation : orientation
      aspectRatio : require('aspect-ratio')(w,h)

    parrot.device.screen.pixelRatio = devicePixelRatio if devicePixelRatio?

    parrot.device.detection = do ->
      el = document.body
      device = parrot.device
      el.dataset.lang        = parrot.language
      el.dataset.os          = device.os.name.toLowerCase()
      el.dataset.device      = device.type
      el.dataset.orientation = device.screen.orientation
      el.dataset.screen      = device.screen.size
      el.dataset.retina      = (if device.screen.pixelRatio is 1 then false else true)

    parrot.device.noDetection = ->
      el = document.body
      for property in ['lang', 'os', 'device', 'orientation', 'screen', "retina"]
        delete el.dataset[property]

  do initialize
  parrot.$(window).on 'resize', initialize
  parrot.$(window).on 'orientationchange', initialize
