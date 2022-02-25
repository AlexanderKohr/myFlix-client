import React from "react";
import ReactDOM from "react-dom";

import './index.scss';

// Main component (will eventually use all the others)
class MyFlixApplication extends React.Component {
    render() {
        return (
            <div className="my-flix">
                <div>Good Morning</div>
            </div>
        );
    }
}

// Finds the root of the app
const container = document.getElementsByClassName('app-container')[0];

// Tells React ti render the app in the root DOM element
ReactDOM.render(React.createElement(MyFlixApplication), container);