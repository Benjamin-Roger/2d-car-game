import { createMuiTheme } from '@material-ui/core/styles';

import { blueGrey,orange } from "@material-ui/core/colors";


const theme = createMuiTheme({
  palette: {
    primary: {
      main: blueGrey[800],
    },
    secondary: {
      main: orange[900],
    },
  },
  
});

export default theme