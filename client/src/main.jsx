import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import Dashboard from "./pages/Dashboard.jsx";
import { Provider } from "react-redux";
import {store} from './app/store.js'

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    {/* <Dashboard /> */}
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
);
