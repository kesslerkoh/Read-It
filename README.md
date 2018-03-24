# Read It - blogging platform
___________________________

This project runs a blogging platform that enables users to create blog posts and comments. It also enables rating (upvotes and downvotes), editing, and deleting of these posts and comments.

It consists of a frontend server, created by Kessler Koh, and a backend server, provided by the Udacity team (more details below).

Navigation:
- Use the left nav bar (when available; see points of improvement section below)
or by clicking on the heading ("Read It")

Pre-requisites:
1. This project includes the server, "api-server". It should be installed (npm install)
and run (npm start). It is expected to be at http://127.0.0.1:3001/
  - To change the endpoint, edit the baseUrl constant
    at readable-frontend/src/utils/apis.js
2. Run "npm install" inside readable-frontend to install needed packages.

Future points of improvement:
1. On the post detail view, you will need to click on the heading ("Read It")
to navigate back to the homepage and see the left menu.


# Readable API Server

This contains the starter backend server for the final assessment project for Udacity's Redux course where you will build a content and comment web app. Users will be able to post content to predefined categories, comment on their posts and other users' posts, and vote on posts and comments. Users will also be able to edit and delete posts and comments.

This repository includes the code for the backend API Server that you'll use to develop and interact with the front-end portion of the project.

## Start Developing

To get started developing right away:

* Install and start the API server
    - `cd api-server`
    - `npm install`
    - `node server`
* In another terminal window, use Create React App to scaffold out the front-end
    - `create-react-app frontend`
    - `cd frontend`
    - `npm start`

## API Server

Information about the API server and how to use it can be found in its [README file](api-server/README.md).
