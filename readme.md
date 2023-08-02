# Docker 101 - Introduction to Docker

Welcome to the **Docker 101** repository! This repository serves as an introduction to Docker, providing beginners with fundamental knowledge and practical examples to get started with Docker containers.

## What is Docker?

[Docker](https://www.docker.com/) is an open-source platform that allows you to automate the deployment, scaling, and management of applications using containerization. Containers enable developers to package applications and their dependencies together into a single unit, ensuring consistency and portability across different environments.

## Repository Contents

This repository contains the following:

- [Dockerfile](Dockerfile): A **Dockerfile** is a text document that contains all the commands a user could call on the command line to assemble an image. This Dockerfile is used to build a Docker image that runs a simple Nodejs server.
- [dockerignore](.dockerignore): A **.dockerignore** file is used to exclude files and directories from the context of the build. This file is used to exclude the `README.md` file from the build context.
- [api directory](api): This directory contains the source code for the Nodejs server.
- [The Docker Guide](guide.md): This guide provides a brief introduction to Docker and walks you through the process of building and running a Docker image.

## Getting Started

To get started with Docker and this repository, follow these steps:

1. **Installation** - Install Docker on your machine. Visit [Docker's website](https://docs.docker.com/get-docker/) for platform-specific installation instructions.
2. **Clone the repository** - Clone this repository to your local machine using the following command:

   ```bash
   git clone https://github.com/yodkwtf/docker-101.git
   ```

## Contributions

Contributions to this repository are welcome! If you find issues or want to add more examples, feel free to create a pull request.

## ToDo's

- [ ] Read more about volumes
