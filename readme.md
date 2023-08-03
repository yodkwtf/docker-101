# Docker 101 - Introduction to Docker

Welcome to the **Docker 101** repository! This repository serves as an introduction to Docker, providing beginners with fundamental knowledge and practical examples to get started with Docker containers.

## What is Docker?

[Docker](https://www.docker.com/) is an open-source platform that allows you to automate the deployment, scaling, and management of applications using containerization. Containers enable developers to package applications and their dependencies together into a single unit, ensuring consistency and portability across different environments.

## Repository Contents

This repository contains the following:

- [Dockerfile](Dockerfile): A **Dockerfile** is a text document that contains all the commands a user could call on the command line to assemble an image. This Dockerfile is used to build a Docker image that runs a simple Nodejs server.
- [dockerignore](.dockerignore): A **.dockerignore** file is used to exclude files and directories from the context of the build.
- [api directory](api): This directory contains the source code for the Nodejs server.
- [The Docker Guide](guide.md): This guide provides a brief introduction to Docker and walks you through the process of building and running a Docker image.

## Getting Started

To get started with Docker and this repository, follow these steps:

1. **Installation** - Install Docker on your machine. Visit [Docker's website](https://docs.docker.com/get-docker/) for platform-specific installation instructions.
2. **Clone the repository** - Clone this repository to your local machine using the following command:

   ```bash
   git clone https://github.com/yodkwtf/docker-101.git
   ```

3. **Build the Docker image** - Navigate to the root directory of the repository and run the following command to build the Docker image:

   ```bash
   docker build -t docker-101 .
   ```

4. **Run the Docker image** - Run the following command to run the Docker image:

   ```bash
   docker run --name docker-101-container -p 5000:5000 docker-101
   ```

5. **Test the application** - Open your browser and navigate to `http://localhost:5000`. You should see the following json data:

   ```json
   [
     {
       "id": "1",
       "title": "Book Review: The Bear & The Nightingale"
     },
     {
       "id": "2",
       "title": "Game Review: Pokemon Brillian Diamond"
     },
     {
       "id": "3",
       "title": "Show Review: Alice in Borderland"
     }
   ]
   ```

## Contributions

Contributions to this repository are welcome! If you find issues or want to add more examples, feel free to create a pull request.

## ToDo's

- [ ] Read more about volumes
- [ ] Why port mapping is a list in docker-compose
