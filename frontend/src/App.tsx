import React from 'react';

import AppProvider from './hooks';
import GlobalStyle from './styles/global';
import SignIn from './pages/SignIn/';

const App: React.FC = () => (
  <>
    <AppProvider>
      <SignIn />
    </AppProvider>
    <GlobalStyle />
  </>
);

export default App;
