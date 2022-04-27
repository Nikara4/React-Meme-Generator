import '../styles/globals.css';
import useStyles from '../styles/indexStyles';
// import '../pages/index.module.css';
import type { AppProps } from 'next/app';
import { Grid, Typography, AppBar, Container, Toolbar } from '@mui/material';
import { Provider } from 'react-redux';

import { store } from '../state/Store';
import { Header } from '../components';
import { Navbar } from '../components';

function MyApp({ Component, pageProps }: AppProps) {
   const classes = useStyles();
  return (
    <Provider store={store}>
       <Header />
      <Container maxWidth='lg' style={{ justifyContent: 'space-evenly' }}>
        <Grid container spacing={2} className={classes.wrapperContainer}>
          <Grid item xs={6} md={3}>
            <Navbar />
          </Grid>
            <Grid item xs={6} md={8} className={classes.mainGridItem}>
              <Component {...pageProps} />
            </Grid>
        </Grid>
      </Container>
    </Provider>
  );
}

export default MyApp;
