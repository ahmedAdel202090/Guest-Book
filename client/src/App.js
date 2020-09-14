import React from 'react';
import './App.scss';
import { Provider } from "react-redux";
import { ConfigureStore } from './redux/ConfigureStore';
import Main from "./Main";
import { BrowserRouter} from "react-router-dom";
const store = ConfigureStore();

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
          <Main/>
      </BrowserRouter>
    </Provider>
  );
}

export default App;