// This Component serves to create the Consent Redirection.
// For more information, search on confluence for "CMP in separate domain" to read more about this.
// Not needed to make the SDK to work.

import React from 'react';
import {
    useLocation,
    useNavigate
  } from "react-router-dom";
import {UsercentricsCmp} from "../components/UsercentricsCmp/UsercentricsCmp";

const Consent = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const interactionCallback = () => {
        navigate(location.state.from, {replace: true})
    }
    return (
        <main style={{ padding: "1rem 0" }}>
            <h2>consent page</h2>
            <UsercentricsCmp interactionCallback={interactionCallback} settingsId={'lGqePJA75'}/>
        </main>
    )
  
  }
  
  export default Consent
