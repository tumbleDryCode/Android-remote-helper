// -----------------------  start js_spinner.js  ---------------------


var spinTextDiv = document.createElement("div");
var currSpinText = "noQvalue";
var currSpinType = "small";
var currSpinHtml = "noQvalue";
var currSpinTarget = "noQvalue";
spinTextDiv.innerHTML = "loading..";
var currSHTMLObj = {};


/**
 * Copyright (c) 2011-2013 Felix Gnass
 * Licensed under the MIT license
 */
(function(root, factory) {

  /* CommonJS */
  if (typeof exports == 'object')  module.exports = factory()

  /* AMD module */
  else if (typeof define == 'function' && define.amd) define(factory)

  /* Browser global */
  else root.Spinner = factory()
}
(this, function() {
  "use strict";

  var prefixes = ['webkit', 'Moz', 'ms', 'O'] /* Vendor prefixes */
    , animations = {} /* Animation rules keyed by their name */
    , useCssAnimations /* Whether to use CSS animations or setTimeout */

  /**
   * Utility function to create elements. If no tag name is given,
   * a DIV is created. Optionally properties can be passed.
   */
  function createEl(tag, prop) {
    var el = document.createElement(tag || 'div')
      , n

    for(n in prop) el[n] = prop[n]
    return el
  }

  /**
   * Appends children and returns the parent.
   */
  function ins(parent /* child1, child2, ...*/) {
    for (var i=1, n=arguments.length; i<n; i++)
      parent.appendChild(arguments[i])

    return parent
  }

  /**
   * Insert a new stylesheet to hold the @keyframe or VML rules.
   */
  var sheet = (function() {
    var el = createEl('style', {type : 'text/css'})
    ins(document.getElementsByTagName('head')[0], el)
    return el.sheet || el.styleSheet
  }())

  /**
   * Creates an opacity keyframe animation rule and returns its name.
   * Since most mobile Webkits have timing issues with animation-delay,
   * we create separate rules for each line/segment.
   */
  function addAnimation(alpha, trail, i, lines) {
    var name = ['opacity', trail, ~~(alpha*100), i, lines].join('-')
      , start = 0.01 + i/lines * 100
      , z = Math.max(1 - (1-alpha) / trail * (100-start), alpha)
      , prefix = useCssAnimations.substring(0, useCssAnimations.indexOf('Animation')).toLowerCase()
      , pre = prefix && '-' + prefix + '-' || ''

    if (!animations[name]) {
      sheet.insertRule(
        '@' + pre + 'keyframes ' + name + '{' +
        '0%{opacity:' + z + '}' +
        start + '%{opacity:' + alpha + '}' +
        (start+0.01) + '%{opacity:1}' +
        (start+trail) % 100 + '%{opacity:' + alpha + '}' +
        '100%{opacity:' + z + '}' +
        '}', sheet.cssRules.length)

      animations[name] = 1
    }

    return name
  }

  /**
   * Tries various vendor prefixes and returns the first supported property.
   */
  function vendor(el, prop) {
    var s = el.style
      , pp
      , i

    if(s[prop] !== undefined) return prop
    prop = prop.charAt(0).toUpperCase() + prop.slice(1)
    for(i=0; i<prefixes.length; i++) {
      pp = prefixes[i]+prop
      if(s[pp] !== undefined) return pp
    }
  }

  /**
   * Sets multiple style properties at once.
   */
  function css(el, prop) {
    for (var n in prop)
      el.style[vendor(el, n)||n] = prop[n]

    return el
  }

  /**
   * Fills in default values.
   */
  function merge(obj) {
    for (var i=1; i < arguments.length; i++) {
      var def = arguments[i]
      for (var n in def)
        if (obj[n] === undefined) obj[n] = def[n]
    }
    return obj
  }

  /**
   * Returns the absolute page-offset of the given element.
   */
  function pos(el) {
    var o = { x:el.offsetLeft, y:el.offsetTop }
    while((el = el.offsetParent))
      o.x+=el.offsetLeft, o.y+=el.offsetTop

    return o
  }

  // Built-in defaults

  var defaults = {
    lines: 11,            // The number of lines to draw
    length: 7,            // The length of each line
    width: 2,             // The line thickness
    radius: 0,           // The radius of the inner circle
    rotate: 0,            // Rotation offset
    corners: 0,           // Roundness (0..1)
    color: '#005B5B',         // #rgb or #rrggbb
    direction: 1,         // 1: clockwise, -1: counterclockwise
    speed: 1,             // Rounds per second
    trail: 100,           // Afterglow percentage
    opacity: 1/4,         // Opacity of the lines
    fps: 10,              // Frames per second when using setTimeout()
    zIndex: 2e9,          // Use a high z-index by default
    className: 'spinner', // CSS class to assign to the element
    top: 'auto',          // center vertically
    left: 'auto',         // center horizontally
    position: 'relative'  // element position
  }

  /** The constructor */
  function Spinner(o) {
    if (typeof this == 'undefined') return new Spinner(o)
    this.opts = merge(o || {}, Spinner.defaults, defaults)
  }

  // Global defaults that override the built-ins:
  Spinner.defaults = {}

  merge(Spinner.prototype, {

    /**
     * Adds the spinner to the given target element. If this instance is already
     * spinning, it is automatically removed from its previous target b calling
     * stop() internally.
     */
    spin: function(target) {
      this.stop()

      var self = this
        , o = self.opts
        , el = self.el = css(createEl(0, {className: o.className}), {position: o.position, width: 0, zIndex: o.zIndex})
        , mid = o.radius+o.length+o.width
        , ep // element position
        , tp // target position

      if (target) {
        target.insertBefore(el, target.firstChild||null)
        // target.insertBefore(linkText, target.firstChild||null)

if((currSpinText == null) || (currSpinText == "noQvalue")){
} else {
	var tpnd = target.parentNode;
	var tpand = tpnd.parentNode;
	spinTextDiv.className = "spintable txtBold";
	spinTextDiv.innerHTML = currSpinText;
	tpand.appendChild(spinTextDiv);

	currSpinText = "noQvalue";
}

        tp = pos(target)
        ep = pos(el)
        css(el, {
          left: (o.left == 'auto' ? tp.x-ep.x + (target.offsetWidth >> 1) : parseInt(o.left, 10) + mid) + 'px',
          top: (o.top == 'auto' ? tp.y-ep.y + (target.offsetHeight >> 1) : parseInt(o.top, 10) + mid)  + 'px'
        })
      }

      el.setAttribute('role', 'progressbar')
      self.lines(el, self.opts)

      if (!useCssAnimations) {
        // No CSS animation support, use setTimeout() instead
        var i = 0
          , start = (o.lines - 1) * (1 - o.direction) / 2
          , alpha
          , fps = o.fps
          , f = fps/o.speed
          , ostep = (1-o.opacity) / (f*o.trail / 100)
          , astep = f/o.lines

        ;(function anim() {
          i++;
          for (var j = 0; j < o.lines; j++) {
            alpha = Math.max(1 - (i + (o.lines - j) * astep) % f * ostep, o.opacity)

            self.opacity(el, j * o.direction + start, alpha, o)
          }
          self.timeout = self.el && setTimeout(anim, ~~(1000/fps))
        })()
      }
      return self
    },

    /**
     * Stops and removes the Spinner.
     */
    stop: function() {
      var el = this.el
      if (el) {
        clearTimeout(this.timeout)
        if (el.parentNode) el.parentNode.removeChild(el)
        if (spinTextDiv.parentNode) spinTextDiv.parentNode.removeChild(spinTextDiv)
        this.el = undefined
      }
      return this
    },

    /**
     * Internal method that draws the individual lines. Will be overwritten
     * in VML fallback mode below.
     */
    lines: function(el, o) {
      var i = 0
        , start = (o.lines - 1) * (1 - o.direction) / 2
        , seg

      function fill(color, shadow) {
        return css(createEl(), {
          position: 'absolute',
          width: (o.length+o.width) + 'px',
          height: o.width + 'px',
          background: color,
          boxShadow: shadow,
          transformOrigin: 'left',
          transform: 'rotate(' + ~~(360/o.lines*i+o.rotate) + 'deg) translate(' + o.radius+'px' +',0)',
          borderRadius: (o.corners * o.width>>1) + 'px'
        })
      }

      for (; i < o.lines; i++) {
        seg = css(createEl(), {
          position: 'absolute',
          top: 1+~(o.width/2) + 'px',
          transform: o.hwaccel ? 'translate3d(0,0,0)' : '',
          opacity: o.opacity,
          animation: useCssAnimations && addAnimation(o.opacity, o.trail, start + i * o.direction, o.lines) + ' ' + 1/o.speed + 's linear infinite'
        })

        if (o.shadow) ins(seg, css(fill('#000', '0 0 4px ' + '#000'), {top: 2+'px'}))

        ins(el, ins(seg, fill(o.color, '0 0 1px rgba(0,0,0,.1)')))
      }
      return el
    },

    /**
     * Internal method that adjusts the opacity of a single line.
     * Will be overwritten in VML fallback mode below.
     */
    opacity: function(el, i, val) {
      if (i < el.childNodes.length) el.childNodes[i].style.opacity = val
    }

  })


  function initVML() {

    /* Utility function to create a VML tag */
    function vml(tag, attr) {
      return createEl('<' + tag + ' xmlns="urn:schemas-microsoft.com:vml" class="spin-vml">', attr)
    }

    // No CSS transforms but VML support, add a CSS rule for VML elements:
    sheet.addRule('.spin-vml', 'behavior:url(#default#VML)')

    Spinner.prototype.lines = function(el, o) {
      var r = o.length+o.width
        , s = 2*r

      function grp() {
        return css(
          vml('group', {
            coordsize: s + ' ' + s,
            coordorigin: -r + ' ' + -r
          }),
          { width: s, height: s }
        )
      }

      var margin = -(o.width+o.length)*2 + 'px'
        , g = css(grp(), {position: 'absolute', top: margin, left: margin})
        , i

      function seg(i, dx, filter) {
        ins(g,
          ins(css(grp(), {rotation: 360 / o.lines * i + 'deg', left: ~~dx}),
            ins(css(vml('roundrect', {arcsize: o.corners}), {
                width: r,
                height: o.width,
                left: o.radius,
                top: -o.width>>1,
                filter: filter
              }),
              vml('fill', {color: o.color, opacity: o.opacity}),
              vml('stroke', {opacity: 0}) // transparent stroke to fix color bleeding upon opacity change
            )
          )
        )
      }

      if (o.shadow)
        for (i = 1; i <= o.lines; i++)
          seg(i, -2, 'progid:DXImageTransform.Microsoft.Blur(pixelradius=2,makeshadow=1,shadowopacity=.3)')

      for (i = 1; i <= o.lines; i++) seg(i)
      return ins(el, g)
    }

    Spinner.prototype.opacity = function(el, i, val, o) {
      var c = el.firstChild
      o = o.shadow && o.lines || 0
      if (c && i+o < c.childNodes.length) {
        c = c.childNodes[i+o]; c = c && c.firstChild; c = c && c.firstChild
        if (c) c.opacity = val
      }
    }
  }

  var probe = css(createEl('group'), {behavior: 'url(#default#VML)'})

  if (!vendor(probe, 'transform') && probe.adj) initVML()
  else useCssAnimations = vendor(probe, 'animation')

  return Spinner

}));



var sspinopts = {
lines: 7, // The number of lines to draw
length: 14, // The length of each line
width: 1, // The line thickness
radius: 8, // The radius of the inner circle
corners: 1, // Corner roundness (0..1)
rotate: 0, // The rotation offset
direction: 1, // 1: clockwise, -1: counterclockwise
color: '#000', // #rgb or #rrggbb or array of colors
speed: 1, // Rounds per second
trail: 60, // Afterglow percentage
shadow: false, // Whether to render a shadow
hwaccel: false, // Whether to use hardware acceleration
className: 'spinsmalldiv', // The CSS class to assign to the spinner
zIndex: 2e9, // The z-index (defaults to 2000000000)
top: 'auto', // Top position relative to parent in px
left: 'auto' // Left position relative to parent in px
};


var aspinopts = {
lines: 7, // The number of lines to draw
length: 8, // The length of each line
width: 1, // The line thickness
radius: 4, // The radius of the inner circle
corners: 1, // Corner roundness (0..1)
rotate: 0, // The rotation offset
direction: 1, // 1: clockwise, -1: counterclockwise
color: '#000', // #rgb or #rrggbb or array of colors
speed: 1, // Rounds per second
trail: 60, // Afterglow percentage
shadow: false, // Whether to render a shadow
hwaccel: false, // Whether to use hardware acceleration
className: 'spinsmalldiv', // The CSS class to assign to the spinner
zIndex: 2e9, // The z-index (defaults to 2000000000)
top: 'auto', // Top position relative to parent in px
left: 'auto' // Left position relative to parent in px
};


var ajxspinopts = {
lines: 7, // The number of lines to draw
length: 5, // The length of each line
width: 1, // The line thickness
radius: 4, // The radius of the inner circle
corners: 1, // Corner roundness (0..1)
rotate: 0, // The rotation offset
direction: 1, // 1: clockwise, -1: counterclockwise
// color: '#000', // #rgb or #rrggbb or array of colors
color: '#FFFFFF', // #rgb or #rrggbb or array of colors

speed: 1, // Rounds per second
trail: 60, // Afterglow percentage
shadow: false, // Whether to render a shadow
hwaccel: false, // Whether to use hardware acceleration
className: 'spinsmalldiv', // The CSS class to assign to the spinner
zIndex: 2e9, // The z-index (defaults to 2000000000)
top: 8, // Top position relative to parent in px
left: -20 // Left position relative to parent in px
};



var spinner = new Spinner(sspinopts);
var smlspinner = new Spinner(aspinopts);
var ajxspinner = new Spinner(ajxspinopts);

function doSpin(theObjId, theSpnrType) {
var starget = document.getElementById(theObjId);
if(theSpnrType == "small") {
smlspinner.spin(starget);
} else {
spinner.spin(starget);
}
}

function stopNuSpin(theObjId) {
try { 
spinner.stop();
smlspinner.stop();
document.getElementById(theObjId).innerHTML = currSHTMLObj[theObjId];
} catch(e) { 
alert("stopNuSpin: " + e); 
}
}


function stopSpin(theObjId) {
try { 
spinner.stop();
smlspinner.stop();
document.getElementById(theObjId).innerHTML = currSpinHtml;
// alert("stopSpin: " + theObjId + "  :: " + "currSpinHtml: " + currSpinHtml);

currSpinHtml = "noQvalue";
currSpinTarget = "noQvalue";
} catch(e) { 
alert(e); 
}
}


function doNuSpinSet(theObjId, theSpnrType, theSpinTxt, theRetTxt) {
currSpinType = theSpnrType;
spntarget = document.getElementById(theObjId);
currSpinHtml = theRetTxt;
currSHTMLObj[theObjId] = theRetTxt;
// alert("doNuSpinSet: " + theObjId + "  :: " + "theSpnrType: " + theSpnrType + " :: " + "theSpinTxt: " + theSpinTxt + "  :: theRetTxt: " + theRetTxt);
spntarget.innerHTML = "";
currSpinTarget = theObjId;
if(theSpnrType == "small") {
smlspinner.spin(spntarget);
} else if(theSpnrType == "ajx") {
ajxspinner.spin(spntarget);
} else {
spinner.spin(spntarget);
}
}

function doSpinSet(theObjId, theSpnrType, theSpinTxt) {
currSpinType = theSpnrType;
spntarget = document.getElementById(theObjId);
currSpinHtml = document.getElementById(theObjId).innerHTML;
// alert("doSpinSet: " + theObjId + "  :: " + "theSpnrType: " + theSpnrType + " :: " + "theSpinTxt: " + theSpinTxt + "  :: " + currSpinHtml);
spntarget.innerHTML = "";
currSpinTarget = theObjId;
if((theSpinTxt == null) || (theSpinTxt == "noQvalue")){
} else {
currSpinText = theSpinTxt;
currSHTMLObj[theObjId] = theSpinTxt;
}
if(theSpnrType == "small") {
smlspinner.spin(spntarget);
} else {
spinner.spin(spntarget);
}
}


// -----------------------  end js_spinner.js  ---------------------
