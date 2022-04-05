import React, {useEffect, useState} from "react";
import Usercentrics, { UI_LAYER, UI_VARIANT } from '@usercentrics/cmp-browser-sdk';
import {useSettingsContext} from "../../contexts/SettingsContext";
import {useCategoryContext} from "../../contexts/CategoryContext";
import Banner from "../Banner";
import PrivacyButton from "../PrivacyButton";
import { Redirect, useLocation, useNavigate } from "react-router-dom";

// After "settingsId" add a comma and add the following empty arrow funtion:
// interactionCallback = () => {}
// For more information, search on confluence for "CMP in separate domain" to read more about this
// Not needed to make the SDK to work.

export const UsercentricsCmp = ({settingsId}) => {
    const {setSettings} = useSettingsContext();
    const {categories, setCategories} = useCategoryContext();
    const [view, setView] = useState(UI_LAYER.NONE);
    const UC = new Usercentrics(settingsId);
    
    // This Component serves to create the Consent Redirection.
    // For more information, search on confluence for "CMP in separate domain" to read more about this
    // Not needed to make the SDK to work.
    // const location = useLocation();
    // const navigate = useNavigate()
    
    useEffect(() => {
        UC.init().then((initialUIValues) => {
            console.log(UC);
            // getSettings() returns all Usercentrics settings you need for your custom solution
            const settings = UC.getSettings();
            console.log(settings)
            setSettings(settings)
            // getCategories() returns all categories' and data processing services' information
            const categories = UC.getCategoriesBaseInfo()

            // Proccess on how to create "public" API on the console.
            // In this example you can call myUC.showFirstLayer() which will set the view to the FIRST_LAYER
            // For other functions, you will need to create your logic using existing UC API
            // Which is totally different from UC_UI. For more read the NPM Browser SDK docs.
            window["myUC"] = {
                "showFirstLayer": () => setView(UI_LAYER.FIRST_LAYER)
            }

            if (initialUIValues.variant === UI_VARIANT.DEFAULT) {
                if(initialUIValues.initialLayer === UI_LAYER.FIRST_LAYER){
                    setView(UI_LAYER.FIRST_LAYER);
                } else if (initialUIValues.initialLayer === UI_LAYER.PRIVACY_BUTTON) {
                    setView(UI_LAYER.PRIVACY_BUTTON);
                } else {
                    setView(UI_LAYER.NONE);
                }
            }

        });
    }, [setCategories, setSettings]);

    const onAcceptAllHandler = () => {
        UC.acceptAllServices().then(() => {
        // Remember to fetch the now updated categories
        const categories = UC.getCategories();
        setCategories(categories);
        setView(UI_LAYER.PRIVACY_BUTTON);
        
        // This Component serves to create the Consent Redirection.
        // For more information, search on confluence for "CMP in separate domain" to read more about this
        // Not needed to make the SDK to work.

        //interactionCallback()
        });
    };

    const onDenyAllHandler = () => {
        UC.denyAllServices().then(() => {
        // Remember to fetch the now updated categories
        const categories = UC.getCategories();
        setCategories(categories);
        setView(UI_LAYER.PRIVACY_BUTTON);

        // This Component serves to create the Consent Redirection.
        // For more information, search on confluence for "CMP in separate domain" to read more about this
        // Not needed to make the SDK to work.
        
        //interactionCallback()
        });
    };

    const onSaveHandler = (userDecisions) => {
        // UserDecisions needs to include all the user choices for each service that were made in your UI
        UC.updateServices(userDecisions).then(() => {
        // Remember to fetch the now updated categories
        const categories = UC.getCategories();
        
        // This Component serves to create the Consent Redirection.
        // For more information, search on confluence for "CMP in separate domain" to read more about this
        // Not needed to make the SDK to work.
        
        //interactionCallback()
        });
    };
    const onPrivacyButtonClick = () => {
        //navigate("consent", {replace: true, state: {from: location}})
        setView(UI_LAYER.FIRST_LAYER)
    };
    switch (view) {
        case UI_LAYER.FIRST_LAYER:
            console.log("1st layer")
            return (
                <Banner
                    onAcceptAll={onAcceptAllHandler}
                    onDenyAll={onDenyAllHandler}
                />
            );
        case UI_LAYER.PRIVACY_BUTTON:
            console.log("button")
            // Show privacy button
            return <PrivacyButton onClick={onPrivacyButtonClick}/>;
        case UI_LAYER.NONE:
            console.log("None")
            return null;
        default:
            // Show nothing
            return <React.Fragment/>;
        }
    }