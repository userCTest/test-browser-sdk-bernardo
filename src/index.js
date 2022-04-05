import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {CategoryContextProvider} from "./contexts/CategoryContext";
import {SettingsContextProvider} from "./contexts/SettingsContext";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Navigate
} from "react-router-dom";
import Consent from "./routes/consent";

const rootElement = document.getElementById("root");

/* 
// This Component serves to create the Consent Redirection.
// For more information, search on confluence for "CMP in separate domain" to read more about this
// Not needed to make the SDK to work.
const PrivacyProtectedRoute = ({children}) => {
  let location = useLocation();
  const hasGivenConsent = localStorage.uc_user_interaction //Adicionar aqui a verificacao se deu consents ou nao
  console.log(hasGivenConsent)
  if(!hasGivenConsent) {
    return <Navigate to="consent" state={{ from: location }} replace />
  }

  return children

} 
*/

ReactDOM.render(
  <BrowserRouter>
    <SettingsContextProvider>
        <CategoryContextProvider>
          <Routes>
          <Route index element={<App />} /> 
            {/* 
              // This Component serves to create the Consent Redirection.
              // For more information, search on confluence for "CMP in separate domain" to read more about this
              // Not needed to make the SDK to work.

              // Change the top route for this one:
              <Route index element={<PrivacyProtectedRoute><App /></PrivacyProtectedRoute>} /> 
            */}
            <Route path="/consent" element={<Consent />} />
          </Routes>
        </CategoryContextProvider>
    </SettingsContextProvider>
  </BrowserRouter>,
  rootElement
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
