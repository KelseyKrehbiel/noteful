import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

ReactDOM.render(<App />, document.getElementById('root'));

/*
Each route should have a header, main section, and a sidebar section

Every route will have the same header section, the app's title should be a link to the main route

The state will be supplied below in a JSON object and contains an array of folders and an array of notes

Set the state inside the main App component (we'll use an API call to populate this state in a future checkpoint)

*/