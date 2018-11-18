import React from 'react';
import { StoreProvider, createStore } from 'easy-peasy';
import { ThemeProvider } from 'emotion-theming'

import { model } from './store/store'
import theme from './theme/theme';
import Layout from './layout/Layout';
import Nav from './nav/Nav';
import Canvas from './canvas/Canvas';

const store = createStore(model);

const App = () => (
  <StoreProvider store={store}>
    <ThemeProvider theme={theme}>
      <Layout
        nav={() => <Nav />}
        main={() => <Canvas />}
      />
    </ThemeProvider>
  </StoreProvider>
);

export default App;
