<<<<<<< HEAD
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home/Home";
import Login from "./Login/Login";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="home" element={<Home />} />
          <Route path="login" element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
=======
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { DataProvider } from 'store';
import { ApiProvider } from './services';
import { RoutesProvider } from './routing';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

const root = createRoot(document.getElementById('root') as HTMLElement); 
root.render(
  <StrictMode>
    <ApiProvider>
      <DataProvider>
          <RoutesProvider />
      </DataProvider>
    </ApiProvider>
  </StrictMode>
>>>>>>> dfbe8e8b21d5940d8bf0b97bfa003815fc288a0e
);

serviceWorkerRegistration.register();
