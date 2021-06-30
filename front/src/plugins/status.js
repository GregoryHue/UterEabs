
function statusConvertToString(status) {
    if (status == 0) {
        return "Waiting for validation";
      } else if (status == 1) {
        return "In preparation";
      } else if (status == 2) {
        return "Waiting for pick up from the delivery service";
      } else if (status == 3) {
        return "Delivering to the cilent";
      } else if (status == 100) {
        return "Delivered";
      } else if (status == 11) {
        return "Canceled during validation";
      } else if (status == 12) {
        return "Canceled during preparation";
      } else if (status == 13) {
        return "Canceled during picking up";
      } else if (status == 14) {
        return "Canceled during Delivery";
      } else {
        return "Error";
      }
}

function statusConvertToColor(status) {
    if (status == 0) {
        return "blue lighten-5";
      } else if (status == 1) {
        return "blue lighten-4";
      } else if (status == 2) {
        return "blue lighten-3";
      } else if (status == 3) {
        return "blue lighten-2";
      } else if (status == 100) {
        return "teal lighten-2";
      } else if (status == 11) {
        return "red lighten-3";
      } else if (status == 12) {
        return "bred lighten-3";
      } else if (status == 13) {
        return "red lighten-3";
      } else if (status == 14) {
        return "red lighten-3";
      } else {
        return "Error";
      }
}

export { statusConvertToString, statusConvertToColor }