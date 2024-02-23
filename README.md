# instamint

- Jackson ANTHONIPILLAI (Jackson93150) <anthonipillaijackson@gmail.com>
- Emmanuel TCHATCHOUANG (etchatchouang) <tchatchouangemmanuelandrel@gmail.com>
- Thomas Roux (thomasRouxGithub) <thomas.roux.cesi@gmail.com>
- Dhia BEN AHMED (dhia1599) <mohamed-dhia.ben-ahmed@supdevinci-edu.fr>

## Resume
As a developer in a dynamic digital agency, we're diving into a project to create a unique social sharing platform for NFTs. This platform will blend the essence of Instagram with web3 technologies. We're utilizing React Nest to bring this vision to life, ensuring a seamless integration of NFT features with an intuitive user interface. Our goal is to exceed expectations and deliver a pioneering platform that revolutionizes social sharing in the NFT space.

## Getting Started

To get started with development, follow these steps:

1. Clone this repository to your local machine.
2. Navigate to the root directory of the cloned repository.

## Setting up Pre-Commit and Pre-Push Hooks

Before you start making changes, it's important to set up the pre-commit and pre-push hooks by executing the `hook.sh` script. This script automates some checks to ensure code quality and consistency.

To set up the hooks, run the following command in your terminal:

```bash
./hook.sh
```
This command will configure the necessary hooks to run before each commit and push operation. <strong>YOU ONLY NEED TO RUN THIS COMMANDE ONCE</strong>

## Node.js Installation
To work with this project, you'll need to have Node.js installed on your machine. You can either install Node.js version 18 directly or use Node Version Manager (NVM) to manage multiple Node.js versions.

### Installing Node.js version 18
Using NVM (Recommended)
If you prefer using NVM for managing Node.js versions, follow these steps:

- Install NVM by following the instructions on the [NVM GitHub repository](https://github.com/nvm-sh/nvm).
- Once NVM is installed, you can install Node.js version 18 by running:
```bash
nvm install 18
```
- After installation, you can set Node.js version 18 as the default by running:

```bash
nvm use 18
```

This will ensure that Node.js version 18 is used for this project.

### Direct Installation
Alternatively, you can download and install Node.js version 18 from the official Node.js website. Follow the installation instructions provided there for your operating system.

## Installing Dependencies
### Backend
To install dependencies for the backend, navigate to the **back** directory and run:

```bash
cd back
npm install
```
This will install all required dependencies for the backend.

### Frontend
To install dependencies for the frontend, navigate to the **front** directory and run:

```bash
cd ../front
npm install
```
This will install all required dependencies for the frontend.

## Visual Studio Code Setup
If you're using Visual Studio Code for development, we recommend installing the following extensions for a smoother experience:

- **ESLint**: This extension provides ESLint integration for Visual Studio Code, helping maintain code quality and consistency.
- **React/Redux/React-Native snippets**: Provides a collection of React, Redux, and React Native snippets for faster development.
- **TypeScript Import Sorter**: Automatically sorts and organizes imports in TypeScript files for better readability.

These extensions can be installed directly from the Visual Studio Code marketplace.

## Branching Strategy
When working on new features, bug fixes, or tests, it's important to follow a consistent branch naming convention. Here's how to name your branches:

- Feature branches: Start the branch name with `feat/.`
Example: **feat/add-authentication**

- Bug fix branches: Start the branch name with `fix/.`
Example: **fix/resolve-login-issue**

- Test branches: Start the branch name with `test/.`
Example: **test/add-unit-tests**

Using these prefixes will help maintain clarity and organization within the repository.

## Pull Requests
When creating pull requests, it's recommended to keep them focused on specific tasks. Avoid creating large pull requests that encompass multiple features or fixes.

For feature development, it's advisable to create an initial pull request for backend modifications before proceeding with frontend changes. This sequential approach facilitates a more systematic review and merging process.

Before creating a pull request, ensure you rebase your branch on the branch you initially based your feature branch on. You can accomplish this by executing the following command:

```bash
# if you created your branch from dev
git pull --rebase origin dev
```
This ensures that your pull request includes the most up-to-date changes from the main branch.
