# servergrid
UI project to try `react` 16.7 alpha hooks and `easy-peasy` state management with functional components

## Getting Started
* clone this repository
* `cd` into the root folder of this project
* run `yarn` to install all dependencies
* run `yarn start` to start the dev server                      
* open your browser at http://localhost:3000 

## Libraries

### Rendering: `react` `react-dom` `prop-types`
React 16.7-alpha2 is used to enable awesome new features (see below in category `State`).
 
### Styling: `emotion` `emotion-theming` `react-emotion` `polished`
CSS-in-JS styling is flexible and flows nicely with React applications.

Emotion in particular is great because it's possible to write 100% CSS syntax without any quirks.

Polished is a nice set of utils to deal with common styling-related taks. Here it is used for `darken()` and `lighten()` colors. 

### State: `easy-peasy`
Easy-Peasy is a Redux library that requires at least React 16.7 because it relies on hooks. These allow writing functional components while having control over the lifecycle of a component.

### Icons: `react-icons`
Just a quick way to use icons in your app. Here the ever-great Fontawesome icons are used.

### Utility: `react-timeago`
A small utility to display created timestamps as human-readable text.


## Create React App
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Available Scripts

In the project directory, you can run:

#### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

#### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

#### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

#### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

### Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
