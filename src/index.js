import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import App from "./component/App/index";
import { BrowserRouter as Router } from "react-router-dom";
import { DataProvider } from "./Context/DataContext";
import { ModalProvider } from "./Context/ModelContext";
import { ToastProvider } from "./Context/ToastContext";
import { AuthProvider } from "./Context/AuthProvider";

ReactDOM.render(
    <React.StrictMode>
        <AuthProvider>
            <ModalProvider>
                <DataProvider>
                    <ToastProvider>
                        <Router>
                            <App />
                        </Router>
                    </ToastProvider>
                </DataProvider>
            </ModalProvider>
        </AuthProvider>
    </React.StrictMode>,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
