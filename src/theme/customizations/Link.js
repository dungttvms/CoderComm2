function Link() {
  return {
    // set underline to hover only, by changing theme default props of Link component
    MuiLink: {
      defaultProps: {
        underline: "",
      },
    },
  };
}

export default Link;
