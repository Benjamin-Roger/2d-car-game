import React, { useEffect, useState, useRef } from "react";

import IconButton from "@material-ui/core/IconButton";
import DoubleArrowRoundedIcon from "@material-ui/icons/DoubleArrowRounded";
import KeyboardArrowDownRoundedIcon from "@material-ui/icons/KeyboardArrowDownRounded";
import KeyboardArrowLeftRoundedIcon from "@material-ui/icons/KeyboardArrowLeftRounded";
import KeyboardArrowRightRoundedIcon from "@material-ui/icons/KeyboardArrowRightRounded";

import { blueGrey,orange, teal } from "@material-ui/core/colors";

import theme from "@/libs/theme";

const styles = {
  button: {
    color: theme.palette.getContrastText(blueGrey[900]),
    margin: theme.spacing(1),
    backgroundColor: blueGrey[900],
    "&:hover": {
      backgroundColor: blueGrey[700],
    },
    outline:'none'
  },

  buttonAccelerate: {
    background:`linear-gradient(${teal[900]},${teal[500]})`
  },

  icon: {
    width: theme.spacing(4),
    height: theme.spacing(4),
  },

  iconLarge: {
    width: theme.spacing(6),
    height: theme.spacing(6),
    transform: "rotate(-90deg)",
  },
};

const ControlButton = (props) => {
  const { action, ...otherProps } = props;

  let icon = "";

  switch (action) {
    case "accelerate":
      icon = <DoubleArrowRoundedIcon style={styles.iconLarge} />;
      break;

    case "decelerate":
      icon = <KeyboardArrowDownRoundedIcon style={styles.icon} />;
      break;

    case "go left":
      icon = <KeyboardArrowLeftRoundedIcon style={styles.icon} />;
      break;

    case "go right":
      icon = <KeyboardArrowRightRoundedIcon style={styles.icon} />;
      break;

    default:
      icon = <p>No icon </p>;
  }

  return (
    <IconButton
      style={
        action == "accelerate"
          ? {
              ...styles.button,
              ...styles.buttonAccelerate,
            }
          : { ...styles.button }
      }
      color="primary"
      aria-label={action}
      {...otherProps}
    >
      {icon}
    </IconButton>
  );
};

export default ControlButton