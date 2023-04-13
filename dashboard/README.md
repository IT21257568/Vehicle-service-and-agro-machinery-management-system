## How to install
1. Run `npm install --legacy-peer-deps` to install all matching dependencies

## Adding a new route
1. In the `routes.js` file, add the route with the below syntax

  `{
    path: "/<path-to-page-or-component>",
    name: "<Name>",
    icon: "<icon> <color>",
    component: <ComponentName>,
    layout: "/<layout>",
  },`