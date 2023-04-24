import { Config } from "damnkit";

export const uiConfig: Config = {
  colors: {
    primary: "#16161A",
    white: "#ffffff",
    grey: "#737376",
    green: "#18C35C",
    darkGrey: "rgba(87, 87, 103, .4)",
    red: "#FF6243",
    lightGrey: "rgba(22, 22, 26, .04)"
  },
  mixes: {
    primary: {
      background: "primary",
      color: "white",
      borderRadius: "12px",
      padding: "12px 24px",
    },
    input: {
      borderRadius: "12px",
      padding: "12px 24px",
    }
  },
};
