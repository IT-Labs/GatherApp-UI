# GatherApp – SPA

## Table of Contents

1. [Introduction](#introduction)
2. [Accessing the Application](#accessing-the-application)
3. [Setup](#setup)
4. [Component Documentation](#component-documentation)
5. [How to Contribute to the Project](#how-to-contribute-to-the-project)

---

**IMPORTANT: Credit where credit is due. This app is the end product of the amazing work put in by the participants in our latest Internship program – showing off their amazing technical skills, but also ability to truly cooperate and collaborate!**

## Introduction

GatherApp is a platform aimed at enabling companies to create, encourage, and nurture an environment where employees can create and share social events. This empowers employees to have greater control over their work-life balance by distinguishing work-related priorities from other social events.

Users can create various types of events, such as online events for a select group of colleagues or on-site company events for all employees. This document pertains to the front-end part of the GatherApp project.

The back-end part of this project can be found [here](https://github.com/IT-Labs/GatherApp-.NET).

## Accessing the Application

To access the frontend:

1. Set up the backend with .NET.
2. Create an Azure Enterprise application if Single Sign-On (SSO) is used.
3. Update the necessary information in a `.env` file with the following variables:
   - `REACT_APP_API_BASE_URL`: URL of the backend API, typically `localhost:7003` for local development.
   - `REACT_APP_REDIRECT_URL`: URL where the application is hosted, default is `localhost:3000` or your personal domain.
   - `REACT_APP_CLIENT_ID`: Client ID obtained from Azure enterprise details for Microsoft SSO and Graph API access.
   - `REACT_APP_AUTHORITY`: URL of the identity provider for user authentication and token issuance.
   - `REACT_APP_PLACEHOLDER_EVENT_BANNER_URL`: URL to a default banner image.
4. Optionally, create a `.env.local` file for local API and REDIRECT URLs.
5. Ensure users have the necessary roles set up in the Azure Portal for application access.

## Setup

To start the application:

1. Ensure Node.js and npm are installed.
2. Open the terminal and run:
   ```
   npm install
   npm start
   ```

## Component Documentation

The way we can access the component documentation is with Storybook, which isolates our components so we can test them and add comments on what that specific component does. To run, just type in

```
npm run storybook
```

## How to Contribute to the Project

To contribute to the project:

1. Fork this repository.
2. Clone your forked repository.
3. Make your changes.
4. Commit and push your changes.
5. Create a pull request.
6. Star this repository.
7. Wait for the pull request to be merged.
