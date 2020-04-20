const palette = {
  /* teal */
  teal0: '#F3FFFB',
  teal1: '#C3FAE8',
  teal2: '#96F2D7',
  teal3: '#63E6BE',
  teal4: '#38D9A9',
  teal5: '#20C997',
  teal6: '#12B886',
  teal7: '#0CA678',
  teal8: '#099268',
  teal9: '#087F5B',
  /* gray */
  gray0: '#F8F9FA',
  gray1: '#F1F3F5',
  gray2: '#E9ECEF',
  gray3: '#DEE2E6',
  gray4: '#CED4DA',
  gray5: '#ADB5BD',
  gray6: '#868E96',
  gray7: '#495057',
  gray8: '#343A40',
  gray9: '#212529',
  // blue
  blue0: '#e7f5ff',
  blue1: '#d0ebff',
  blue2: '#a5d8ff',
  blue3: '#74c0fc',
  blue4: '#4dabf7',
  blue5: '#339af0',
  blue6: '#228be6',
  blue7: '#1c7ed6',
  blue8: '#1971c2',
  blue9: '#1864ab',

  // indigo
  indigo0: '#edf2ff',
  indigo1: '#dbe4ff',
  indigo2: '#bac8ff',
  indigo3: '#91a7ff',
  indigo4: '#748ffc',
  indigo5: '#5c7cfa',
  indigo6: '#4c6ef5',
  indigo7: '#4263eb',
  indigo8: '#3b5bdb',
  indigo9: '#364fc7',
};

export const buttonColor = {
  lightGray: {
    background: palette.gray2,
    color: palette.gray7,
    hoverBackground: palette.gray1,
  },
  gray: {
    background: palette.gray6,
    color: 'white',
    hoverBackground: palette.gray5,
  },
  darkGray: {
    background: palette.gray8,
    color: 'white',
    hoverBackground: palette.gray6,
  },
  transparent: {
    background: 'none',
    color: palette.gray5,
    hoverBackground: palette.gray1,
  },
  blue: {
    background: palette.teal3,
    color: palette.blue4,
    hoverBackground: palette.blue7,
  },
};

export default palette;
