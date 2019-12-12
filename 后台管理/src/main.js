import React from 'react';
import {render} from 'react-dom';
import {BrowserRouter} from 'react-router-dom'
import {HashRouter} from 'react-router-dom'
import {Provider} from 'react-redux'
import store from './store'
import App from './APP'
render(
  <Provider store={store}>
    {/* <HashRouter> */}
    <BrowserRouter>
      {/* <Route component={App}/> */}
        <App/>
        </BrowserRouter>
    {/* </HashRouter> */}
    </Provider>,
    document.querySelector('#app')
)