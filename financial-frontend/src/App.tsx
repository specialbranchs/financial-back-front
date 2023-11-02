import React from 'react';
import { Provider, useSelector } from 'react-redux'
import { RootState } from './state/reducer';
import { persistor, store } from './state';
import { PersistGate } from 'redux-persist/integration/react';
import NavMainScreen from './modules/navDir';


function App() {
  // const user=useSelector((state:RootState)=>state.currentUser)
  // console.log('user',user)
  
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavMainScreen/>
      </PersistGate>
    </Provider>
  );
}

export default App;
