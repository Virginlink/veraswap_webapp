## Veraswap Interface

Table of contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Project structure](#project-structure)
  - [Misc](#misc)

---

### Description

Interface for Veraswap built with [Create React App](https://github.com/facebook/create-react-app)

### Built with

- [React](https://reactjs.org/) - JavaScript library for building user interfaces
- [Material UI](https://material-ui.com/) - React UI framework
- [Ant Design for React](https://ant.design/docs/react/introduce) - React UI library that contains a set of high quality components and demos for building rich, interactive user interfaces
- [Styled Components](https://styled-components.com/) - CSS in JS tool used for theming the interface

# Getting Started

### Prerequisites

To run this project on your machine, the following need to have installed:

- [Node.Js](https://nodejs.org/) - JavaScript runtime built on Chrome's V8 JavaScript engine
- npm - Default package manager for Node.Js

### Installation

Step by step instructions on setting up the project and running it

1. Clone the repo
   ```
   git clone https://github.com/Virginlink/veraswap_webapp.git
   ```
2. Install dependencies
   ```
   npm install
   ```
3. Start development server
   ```
   npm start
   ```

### Project structure

1. Project's static assets (Fonts, Icons, Images) can be found at [src/assets](./src/assets)
2. JSX components are created page specific as well as based on functionality under [src/components](./src/components). Page specific components are found under [src/pages/components](./src/pages/components)
3. Pages are located under [src/pages](./src/pages).

   > Note: Each new component that is created has to be added to the exports in index.js at the root of each component sub directory if an index file is present ([src/pages/index.js](./src/pages/index.js) incase of new page). These exports will be imported throughout the codebase.

4. Global styles are declared in [globalStyles.js](./src/components/globalStyles.js). CSS that requires dynamic theming can be found here. Other static css files can be found along with the respective component's JSX file.
5. Theme specific css variables can be updated at [Themes.js](./src/components/Themes.js)
6. Certain parts of the app's state are maintained through React Context named as AppContext. Global state's initial values can be updated [here](./src/state/AppContext.js)

7. Smart contract declarations (addresses and ABI), helper functions and global API calls are located under [src/utils](./src/utils). More definitive information on files under [src/utils](./src/utils) as follows,
   - [appTokens.js](./src/utils/appTokens.js) - Contains the default tokens available for swap and pool on the interface
   - [contracts.js](./src/utils/contracts.js) - Contains essential smart contract addresses and ABI declarations (Presale, Factory, and Router contracts)
   - [helpers.js](./src/utils/helpers.js) - Core smart contract calls related to swap and pool exported as global functions
   - [staked.js](./src/utils/staked.js) - Contains the available staking pools on the interface
   - [tokens.js](./src/utils/tokens.js) - Contains tokens required for the staking page

### Misc

1. Prettier configuration can be updated at .prettierrc at project root directory (Prettier VS code extension is required. Extension id - esbenp.prettier-vscode)
