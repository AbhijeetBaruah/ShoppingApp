# ShoppingApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.1.2.
## Production Server:To Deploy on firebase

Run `firebase deploy` for production server. Navigate to `https://shoppingapp-b68b6.web.app/` to checkout.
### firebase tool required for deployment
npm install -g firebase-tools
project version is 9.21.0
#### Some series of important Commands to deploy a new project
firebase --version        (to check firebase-tool version)
firebase login            (login to access the firebase on command line)
firebase init             (initializes the firebase in current project and demands some information for deployment)
ng build --prod           (builds the deployable project)
firebase deploy           (deploys the project on the firebase)

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Useful Installations
 1) Firebase module used is 6.x . Its is preferred as it is stable right now. To install a particular version -> 
    ng add @angular/fire@6.1.5
    the above is compatible with Firebase version "^7.0 || ^8.0"
    npm install firebase@7.24.0
 2) npm install -g firebase-tools
    this project version is 9.21.0 (to check run -> firebase --version)
 3) ng add @ng-bootstrap/ng-bootstrap
 4) npm i bootstrap@4.6.0
    
    

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
