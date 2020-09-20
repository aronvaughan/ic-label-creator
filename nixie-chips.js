//Create Overline Symbols: https://fsymbols.com/generators/overline/
var nixieChips = {
    
    'IN-16' : {
      description : 'IN-16 NIX-I',
      type: 'nixie',
      pins: {
        14 : 'n/a',
        13 : '0',
        12 : '9',
        11 : '8',
        10 : ',',
        9 : '2',
        8 : '6',
        7 : '5',
        6 : '4',
        5 : ',',
        4 : '3',
        3 : '7',
        2 : '1',
        1 : 'a->⏚'
      },
    },

    'K155ID1' : {
        description : 'Nixie Driver',
        type: 'NixieDriver',
        pins: {
            1 : '8',
            2 : '9',
            3 : 'A',
            4 : 'D',
            5 : '+5v',
            6 : 'B',
            7 : 'C',
            8 : '2',

            9 : '3',
            10: '7',
            11: '6',
            12: '⏚',
            13: '4',
            14: '5',
            15: '1',
            16: '0',
        },
    },


    '74HC595' : {
        description : '8b Shift Reg',
        type: 'flipflop',
        pins: {
            1 : 'QB',
            2 : 'QC',
            3 : 'QD',
            4 : 'QE',
            5 : 'QF',
            6 : 'QG',
            7 : 'QH',
            8 : '⏚',

            9 : "QH'-SOut",
            10: 'S̅C̅L̅R̅',
            11: 'SCLK',
            12: 'RCLK',
            13: 'O̅E̅',
            14: 'SER',
            15: 'QA',
            16: '+',
        },
    },


    // empty template
  ' ' : {
    description : '',
    type: '',
    heightPins: 3,
    pins: {
      1 : '',
      2 : '',
      3 : '',
      4 : '',
      5 : '',
      6 : '',
      7 : '',
      8 : '',
      9 : '',
      10: '',
      11: '',
      12: '',
      13: '',
      14: '',
      15: '',
      16: '',
      17: '',
      18: '',
      19: '',
      20: '',
      21: '',
      22: '',
      23: '',
      24: '',        
    },
  },    

};  // end of var "chips"
