export const ViewEventStyles = {
  backgroundColor: "var(--primary-color-grey)",
  disabledStyles: {
    backgroundColor: "var(--primary-color-green)",
    transform: "scale(1)",
    transition: "0.3s",
  },
  "@media screen and (min-width: 900px) and (max-width: 1500px)": {
    fontSize: "11px",
    columnGap: "0.5rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
};

const ActionButtonStyles = {
  height: "1.8rem",
  maxWidth: "5rem",
  padding: 0,
  hoverStyles: {},
  "@media screen and (min-width: 900px) and (max-width: 1500px)": {
    fontSize: "11px",
  },
};

const commonGoingStyles = {
  backgroundColor: "var(--primary-color-green)",
  borderColor: "var(--primary-color-green)",
  color: "white",
};

export const GoingButtonStyles = {
  ...ActionButtonStyles,
  hoverStyles: {
    ...commonGoingStyles,
  },
  disabledStyles: {
    ...commonGoingStyles,
  },
};

const commonMaybeStyles = {
  backgroundColor: "#FFC700",
  borderColor: "#FFC700",
  color: "white",
};
export const MaybeButtonStyles = {
  ...ActionButtonStyles,
  hoverStyles: {
    ...commonMaybeStyles,
  },
  disabledStyles: {
    ...commonMaybeStyles,
  },
};

const commonNotGoingStyles = {
  backgroundColor: "#FF0000",
  borderColor: "#FF0000",
  color: "white",
};
export const NotGoingButtonStyles = {
  ...ActionButtonStyles,
  hoverStyles: {
    ...commonNotGoingStyles,
  },
  disabledStyles: {
    ...commonNotGoingStyles,
  },
};
