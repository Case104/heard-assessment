 # Heard Assessment

Welcome to my submission for the [heard-technical-assessment](https://github.com/Heard-Mental-Health/heard-technical-assessment)! This project aims to give us a jumping off point for demonstating my technical ability. I've implemented a basic structure and I look forward to discussing the technical decisions and coding aspects of this project.

## Prerequisites

- Node.js

## Setup

1. Clone the repository: `git clone https://github.com/Case104/heard-assessment.git`
2. Install dependencies: `npm i`
3. Setup ENV: `mv .env.example .env`
4. Set up the database: `npx prisma db push`
5. Update Linter: `npm i`
6. Start the development server: `npm run dev`

## Project Structure

The project uses a Next, tRPC, and Prisma to perform CRUD operations on Transactions. Proceedures are defined on the server side and called from the client.

## Tech Choices

For this project, I chose [create-t3-app](https://create.t3.gg/) for initial setup, aligning my technology stack closely with Heard's environment and industry standards. This stack includes React, Next.js, t3, Prisma, and other related technologies. My selection was twofold: to align with the tools used at Heard and to enhance my personal skill set in these areas. I debated the choice between a minimalistic approach and the more comprehensive solution that I landed on, but I ended up with a product that I really enjoy.

## Challenges and Learnings

- I am familiar with Typescript, but it is much slower working with it in a new project, rather than an established code base.
- I would likely reach for many of these technologies again. The APIs and documentation were clear and intuitive.
