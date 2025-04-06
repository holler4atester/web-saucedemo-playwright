# web-saucedemo-playwright

A demo of web automation against Swag Lab's saucedemo site, using Playwright

## Applicant Details 
Holly Marshall - Snr Quality Engineer application

## Prerequisites
[Node.js](https://nodejs.org/) installed

## Setup
1. Clone the project from the repo 
```
git clone https://github.com/holler4atester/web-saucedemo-playwright.git
```
2. Change directory to the project root
```
cd web-saucedemo-playwright
```
3. Install project dependencies (node packages)
```
npm install
```

## Run smoke tests

```
npm run test:smoke
```

## Contribute and maintain

The project is set up with Husky pre commit hooks to Git repo, where validation checks will be run on commit. 

The validation will check for pretty format & lint issues based on some rudimentary rules. 

If error, please use `lint:fix` or `format:fix` to resolve any highlighted issues. 



