# Comtravo Challenge

This project hosts the solution for Comtravo's Backend Challenge :)

In it I will describe the process of how I decided to solve the problem, the technologies that I used and also the PRs and Testing.

Feel free to use the project as you like and to switch to any PR to see the development of any particular feature, if there is any question feel free to hit me up.

![Evenito](/public/demo.gif)

## Objective:

Your service should get flights from these 2 routes, merge them, remove duplicates and send to the
client.
As an identity of the flight can be used the combination of flight numbers and dates.
Note that discovery-stub service is not stable, i.e. it can sometimes fail or reply after couple of
seconds.
The response time of your service shouldn't take longer than 1 second.
Please write tests for your implementation. Also would be great to avoid usage of Nest.js framework.

# Tech stack

- Express
- Swagger
- Jest
- Superagent
- Cors
- Husky

# How to run the program?

```shell


```

- Typescript: Used for better type checks and cleaner code read
- Global state: In order to share the state of the application between the components
- JEST for **testing** and ensuring the **quality** of the code
- Cypress.io for E2E tests

# Pull requests

Since this a personal project I needed extra help to develop it! In this case someone special was in charge of reviewing my PRs so I did not mess anything up :)

## Who reviewed my PR's ?

My friend's dog was in charge with the mission of reviewing my PRs in exchange for food.

![Doggo](/public/doggo.jpg)

# How to execute in your local machine?

```
git clone https://github.com/Rodolfoarv/DrawingCanvas.git
cd DrawingCanvas
yarn install
yarn start
```

Open http://localhost:3000 in your browser

# How to run Tests?

React Testing Library was used for Unit Testing. Cypress.io was used for E2E tests.

Execute the following command to run tests:

```
yarn test
```

# Sample I/O

## Command: N 20 4

![1](/public/1.png)

## Command: L 1 2 6 2

![Doggo](/public/2.png)

## Command: L 6 3 6 4

![Doggo](/public/3.png)

## Command: R 16 1 20 3

![Doggo](/public/4.png)

## Command: C O

## Command: B 10 3

![Doggo](/public/5.png)

# Thank you
