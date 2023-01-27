import { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import App from './App'
// import reportWebVitals from './reportWebVitals';

//router
import { BrowserRouter } from 'react-router-dom'
//store

import { Provider } from 'react-redux'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

//reducer
import { store } from './store'

import './i18n'

ReactDOM.render(
  <StrictMode>
    <BrowserRouter basename="/">
      <Provider store={store}>
        <App />
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </Provider>
    </BrowserRouter>
  </StrictMode>,
  document.getElementById('root'),
)
