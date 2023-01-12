# How to run:

## Prerequisites
**0.0** Assuming you have npm and node installed in your machine. Verify this by running:
```
npm -v
node -v
```
If not, go to https://nodejs.org/en/download/ for installation instructions/
**0.1** Install yarn:
```
npm install --global yarn
```
**0.2** verify yarn installation by running
```
yarn -v
```
Note: we're using yarn because it is significantly faster to install than npm. Yarn installs in parallel while npm installs in sequential

## Build the API
**1.** Navigate to where package.json is located

**2.** Install the packages:
```
yarn install
```
**3.** run as dev or prod (prod will not have apidocs)
```
yarn run start:dev
or
yarn run start:prod
```
**4.** access swagger here: http://localhost:3000/api-docs/