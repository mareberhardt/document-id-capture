# veriff-document-id-capture

## Description
This project is a React-based application designed for capturing and processing user documents. The application involves navigating through several steps to capture a photo, preview it, and confirm submission. It includes a series of pages with conditional navigation based on user actions.

Tech Stack
React: A JavaScript library for building user interfaces.
TypeScript: A superset of JavaScript that adds static types.
React Router: A library for routing in React applications.
Jest: A JavaScript testing framework.
React Testing Library: A set of utilities for testing React components.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Installation

Clone the repository
  ### `git clone <repository-url>`

Navigate to the project directory
  ### `cd <project-directory>`

Install dependencies
  ### `npm install`

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Folder Structure
- src/: Contains the main source code of the application.
  - assets/: images, icons, fonts.
  - components/: global shared/reusable components, such as layout (wrappers, navigation), form components, buttons.
    - forms/
    - layout/
  - views/: Here's where the main part of my app will live. Any page/screen in my app is a view
pages/: Page components representing different views of the application.
public/: Public assets and the main HTML file.s
