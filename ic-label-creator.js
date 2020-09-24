/**
 * (C) Klemens Ullmann-Marx / www.ull.at
 * License: GPLv3
 */

/**
  * Draw Chip by name
  */
function drawChip(chipName) {
  
  console.log('=== ' + chipName);
  
  var chip = chips[chipName];
  if (!chip) {
        chip = nixieChips[chipName];
  }
  var numPins = Object.keys(chip.pins).length;
  var chipWidth = numPins / 2 * globals.pinDistance + 1;
  var chipHeightPins = ('heigthPins' in chip) ? chip.heigthPins : 3;
  var chipHeight = chipHeightPins * globals.pinDistance;
  
  var $page = $('#page');
  
  // CREATE BASE SVG ELEMENT FOR CHIP
  // jQuery won't render svg elements without namespace url
  var svgChip = $(document.createElementNS("http://www.w3.org/2000/svg", 'svg')).attr({
    width: chipWidth + 'mm',
    height: chipHeight + 'mm',
    x: globals.chipPositionX + 'mm',
    y: globals.chipPositionY + 'mm',
  });
  
  // DRAW CHIP OUTLINE
  svgChip.append($(document.createElementNS("http://www.w3.org/2000/svg", 'rect')).attr({
    x : globals.svgStrokeOffset + 'mm',
    y : globals.svgStrokeOffset + 'mm',
    width: chipWidth - globals.svgStrokeOffset + 'mm',
    height: chipHeight - globals.svgStrokeOffset + 'mm',
    stroke: 'silver',
    'stroke-width': globals.svgStrokeWidth + 'mm',
    fill: 'white'
  }));
  
  // DRAW HALFCIRCLE MARKER
  svgChip.append($(document.createElementNS("http://www.w3.org/2000/svg", 'circle')).attr({
    cx : 0,
    cy : '50%',
    r  : '1.2mm',
    fill: 'grey'
  }));
  
  // DRAW CHIP MODEL + DESCRIPTION
  svgChip.append($(document.createElementNS("http://www.w3.org/2000/svg", 'text'))
    .html('&nbsp;&nbsp;' + chipName + ' ' + chip.description)
    .attr({
      x : '50%',
      y : chipHeight / 2 + .2  + 'mm',
      'dominant-baseline': 'middle',
      'text-anchor': 'middle',
      'font-family' : 'sans-serif',
      'font-size' : '1.6mm',
      'font-weight' : 'bold',
      fill: chipColor(chip.type),
    })
  );
  
  // DRAW PINS
  var x = globals.pinDistance / 2 + .5;
  jQuery.each(chip.pins, function (pinNum, pinName) {
    
    // bottom side
    if (pinNum <= numPins/2 ) {
      svgChip.append($(document.createElementNS("http://www.w3.org/2000/svg", 'text'))
        .html(pinName)
        .attr({
          x : 0,
          y : 0,    
          'dominant-baseline': 'baseline',
          'text-anchor': 'start',
          'font-family' : 'sans-serif',
          'font-size' : fontSize(pinName, chipHeightPins),
          style: 'transform: rotate(270deg) translate(-' +  (chipHeight - .2) + 'mm, ' + (x + .6) + 'mm);',
        })
      );          
      x += globals.pinDistance;
    
    // top side
    } else {
      x = x - globals.pinDistance;
      svgChip.append($(document.createElementNS("http://www.w3.org/2000/svg", 'text'))
        .html(pinName)
        .attr({
          x : 0,
          y : 0,              
          'dominant-baseline': 'baseline',
          'text-anchor': 'end',
          'font-family' : 'sans-serif',
          'font-size' : fontSize(pinName, chipHeightPins),
          style: 'transform: rotate(270deg) translate(-.3mm, ' + (x + .7) + 'mm);',
       })
     );
    }
    
  }); // end of for each pin
  
  // DRAW CURRENT CHIP TO page
  $('#page').append(svgChip);
  
  // UPDATE POSITION FOR NEXT CHIP
  globals.chipPositionY += chipHeight + 4;
  
  // Begin new column
  if (globals.chipPositionY + 10 > globals.pageHeight) {
    globals.chipPositionY = 0;
    globals.chipPositionX += 50;
  }
}

function drawWrap(chipName) {

    console.log('=== Wrap' + chipName);

    var chip = chips[chipName];
    if (!chip) {
        chip = nixieChips[chipName];
    }
    var numPins = Object.keys(chip.pins).length;
    var chipWidth = numPins / 2 * globals.pinDistance + 1;
    var chipHeightPins = ('heigthPins' in chip) ? chip.heigthPins : 3;
    var chipHeight = (chipHeightPins * globals.wrapPinDistance);

    var $page = $('#page');

    // CREATE BASE SVG ELEMENT FOR CHIP
    // jQuery won't render svg elements without namespace url
    var svgChip = $(document.createElementNS("http://www.w3.org/2000/svg", 'svg')).attr({
        width: chipWidth + 'mm',
        height: chipHeight + 'mm',
        x: globals.chipPositionX + 'mm',
        y: globals.chipPositionY + 'mm',
    });

    // DRAW CHIP OUTLINE
    svgChip.append($(document.createElementNS("http://www.w3.org/2000/svg", 'rect')).attr({
        x : globals.svgStrokeOffset + 'mm',
        y : globals.svgStrokeOffset + 'mm',
        width: chipWidth - globals.svgStrokeOffset + 'mm',
        height: chipHeight - globals.svgStrokeOffset + 'mm',
        stroke: 'silver',
        'stroke-width': globals.svgStrokeWidth + 'mm',
        fill: 'white'
    }));

    // DRAW HALFCIRCLE MARKER
    svgChip.append($(document.createElementNS("http://www.w3.org/2000/svg", 'circle')).attr({
        cx : 0,
        cy : '50%',
        r  : '1.2mm',
        fill: 'grey'
    }));

    // DRAW CHIP MODEL + DESCRIPTION
    svgChip.append($(document.createElementNS("http://www.w3.org/2000/svg", 'text'))
        .html('&nbsp;&nbsp;' + chipName + ' ' + 'WRAP')
        .attr({
            x : '50%',
            y : chipHeight / 2 + .2  + 'mm',
            'dominant-baseline': 'middle',
            'text-anchor': 'middle',
            'font-family' : 'sans-serif',
            'font-size' : '1.6mm',
            'font-weight' : 'bold',
            fill: chipColor(chip.type),
        })
    );

    // DRAW PINS
    var x = globals.pinDistance / 2 + .5;
    for (var i = numPins; i >= 1; i-- ) {
        console.log('chipPins', chip.pins[i]);
        var pinName = chip.pins[i];
        var pinNum = i

        // bottom side
        if (pinNum <= numPins/2 ) {
            svgChip.append($(document.createElementNS("http://www.w3.org/2000/svg", 'text'))
                .html(pinName)
                .attr({
                    x : 0,
                    y : 0,
                    'dominant-baseline': 'baseline',
                    'text-anchor': 'start',
                    'font-family' : 'sans-serif',
                    'font-size' : fontSize(pinName, chipHeightPins),
                    style: 'transform: rotate(270deg) translate(-' +  (chipHeight - .2) + 'mm, ' + (x + .6) + 'mm);',
                })
            );
            x += globals.pinDistance;

            // top side
        } else {
            x = x - globals.pinDistance;
            svgChip.append($(document.createElementNS("http://www.w3.org/2000/svg", 'text'))
                .html(pinName)
                .attr({
                    x : 0,
                    y : 0,
                    'dominant-baseline': 'baseline',
                    'text-anchor': 'end',
                    'font-family' : 'sans-serif',
                    'font-size' : fontSize(pinName, chipHeightPins),
                    style: 'transform: rotate(270deg) translate(-.3mm, ' + (x + .7) + 'mm);',
                })
            );
        }

    }
    jQuery.each(chip.pins, function (pinNum, pinName) {
        console.log('drawing pin', pinNum, pinName, x);

        // top side
        if (pinNum <= numPins/2 ) {
            console.log('drawing bottom', x);
            svgChip.append($(document.createElementNS("http://www.w3.org/2000/svg", 'text'))
                .html(pinName)
                .attr({
                    x : 0,
                    y : 0,
                    'dominant-baseline': 'baseline',
                    'text-anchor': 'start',
                    'font-family' : 'sans-serif',
                    'font-size' : fontSize(pinName, chipHeightPins), //-2.5mm
                    style: 'transform: rotate(270deg) translate(-2.5mm, ' + (x + .7) + 'mm);',
                                  })
            );
            x += globals.pinDistance;

            // bottom side
        } else {
            x = x - globals.pinDistance;
            console.log('drawing top', x);
            svgChip.append($(document.createElementNS("http://www.w3.org/2000/svg", 'text'))
                .html(pinName)
                .attr({
                    x : 0,
                    y : 0,
                    'dominant-baseline': 'baseline',
                    'text-anchor': 'end',
                    'font-family' : 'sans-serif',
                    'font-size' : fontSize(pinName, chipHeightPins), //2.8
                    style: 'transform: rotate(270deg) translate(-' +  (chipHeight - (chipHeight/2) +.6) + 'mm, ' + (x + .6) + 'mm);',
                })
            );
        }

    }); // end of for each pin

    // DRAW CURRENT CHIP TO page
    $('#page').append(svgChip);

    // UPDATE POSITION FOR NEXT CHIP
    globals.chipPositionY += chipHeight + 4;

    // Begin new column
    if (globals.chipPositionY + 10 > globals.pageHeight) {
        globals.chipPositionY = 0;
        globals.chipPositionX += 50;
    }
}


/**
  * Calculate font size according to pinName string length
  */ 
function fontSize(pinName, chipHeightPins) {
  
  // We don't need font scaling for larger chips
  if (chipHeightPins > 3) {
    return '1.6mm';
  }
  
  // Do some handstands for multibyte chars
  var length = countPinNameChars(pinName);
  
  if (length <=2) {
    return '1.6mm';
  }
  
  if (length <=3) {
    return '1.4mm';
  }
  
  return '1.1mm';
}


/**
  * Count string length without overline multibytes 
  */
function countPinNameChars(pinName) {
  // Escape multibyte chars (and others)
  var uriEncoded = encodeURIComponent(pinName)
  // Remove overline multibyte chars
  var overlineReplaced = uriEncoded.split('%CC%85').join('');
  // Re-decode for other encoded chars like "+", "⏚"
  var uriDecoded = decodeURIComponent(overlineReplaced);
  
  return uriDecoded.length;
}


/**
 * Color chip titel 
 */
function chipColor(type) {
  
  if (globals.gimmeColor == false) {
    return 'black';
  }
  
  if (['ram', 'eeprom', 'register', 'flipflop'].includes(type)) {
    return 'red';
  }
  
  if (['gate'].includes(type)) {
    return 'blue';
  }
  
  if (['mux', 'demux'].includes(type)) {
    return 'green';
  }    
  
  return 'black';
}
