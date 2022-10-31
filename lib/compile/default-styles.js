// Based on Firefox defaults resource://gre-resources/html.css
const rootStyles = {
  fontColor: "#0b0c0c",
  fontFamily: "sans-serif",
  fontWeight: "normal",
  fontSize: "1em",
  lineHeight: 1.5,
};

const headingStyles = {
  fontWeight: "bold",
  lineHeight: 1.2,
};

export const defaultStyles = {
  root: {
    ...rootStyles,
    margin: "2em",
  },
  H1: {
    ...rootStyles,
    ...headingStyles,
    fontSize: "2em",
    margin: "0.67em",
  },
  H2: {
    ...rootStyles,
    ...headingStyles,
    fontSize: "1.5em",
    margin: "0.83em",
  },
  H3: {
    ...rootStyles,
    ...headingStyles,
    fontSize: "1.17em",
    margin: "1em",
  },
  H4: {
    ...rootStyles,
    ...headingStyles,
    fontSize: "1em",
    margin: "1.33em",
  },
  H5: {
    ...rootStyles,
    ...headingStyles,
    fontSize: "0.83em",
    margin: "1.67em",
  },
  H6: {
    ...rootStyles,
    ...headingStyles,
    fontSize: "0.67em",
    margin: "2.33em",
  },
  P: {
    ...rootStyles,
    margin: "1em",
  },
  Link: {
    ...rootStyles,
    margin: "1em",
    fontColor: "#1d70b8",
  },
  L: {
    ...rootStyles,
    margin: "1em",
  },
  Figure: {
    ...rootStyles,
    margin: "1em",
    width: "80%",
  },
};

export const baseFontSize = 16;
