# Docker - A Beginner's Guide

This is a beginner's guide to Docker. It is meant to be a quick reference for Docker commands and concepts. It is not meant to be a comprehensive guide to Docker. For more information, please refer to the [official documentation](https://docs.docker.com/).

## What is Docker?

Docker is a tool that allows you to run applications in containers. Containers are similar to virtual machines, but they are more portable, more resource-friendly, and more dependent on the host operating system. Virtual machines have their own operating system but containers share the host operating system.

## Why use Docker?

Let's say your app uses a specific version of Nodejs. Now if your teammates want to use the app, they'd need to install the same version of Nodejs. But what if they have a different operating system? What if they have a different version of Nodejs?

Also, Node is just one dependency. What if your app uses 10 different dependencies? What if your app uses 100 different dependencies? What if your app uses 1000 different dependencies?

Docker solves this problem by allowing you to run your app in a container. This container will have all the dependencies your app needs. Now when your app needs to run, you can just run the container. This way, you don't have to worry about installing dependencies on your machine.

## Installing Docker

To install Docker, please refer to the [official documentation](https://docs.docker.com/install/).

Installing Docker on Mac or Linux is really straightforward but installing docker on windows is a bit complicated. To use docker on windows, we need **WSL (Windows Subsystem for Linux)**.

WSL allows us to run a Linux environment on Windows without a virtual machine. To install WSL, please refer to the [official documentation](https://learn.microsoft.com/en-us/windows/wsl/install-manual).

Once WSL is installed and setup, restart your computer and install Docker for Windows. You can check if Docker is installed by running the following command:

```bash
docker --version
```

Once installed, just open up docker desktop and you should be good to go.

## Images and Containers

There are some key terminologies you need to know before you can start using Docker. These are **images** and **containers**.

### Docker Images

They are like the blueprints for containers. They contain the following information inside them -

- Runtime Environment
- Application Code
- Application Dependencies
- Extra Configuration (eg. Environment Variables)
- Commands

Now images don't actually run these things inside them. They are just blueprints. To run an image, we need to create a container.

Images are read only. Once an image is created, it cannot be modified. If you want to modify an image, you need to create a new image.

### Docker Containers

Containers are running instances of an image. They are created when an images is run. Containers run our application exactly as outlined in the image.

Containers are also known as isolated environments. This means that they are completely isolated from the host operating system. They have their own file system, their own networking, their own processes, etc.

This means that we can just share the docker image with anyone and they can run it on their machine without worrying about installing dependencies.

![Docker Image and Docker Container](https://res.cloudinary.com/dds18bzdy/image/upload/v1690733388/random%20storage/docker_img_containers_xtm3vn.png)

## Parent Images and DockerHub

Images are made up of several **layers** where each layer adds something to the images incrementally. For example, the first layer might be the operating system, the second layer might be the runtime environment, the third layer might be the application code, and so on.

The first layer is called the **parent image**. It is the base image that all other layers are built on top of. It is also known as the **base image**. It usually contains the operating system and runtime environment.

### DockerHub

Where does the parent image come from? Well, it comes from **DockerHub**. DockerHub is a repository of docker images. It contains thousands of images that you can use for your application.

Let's say you want to run a Nodejs application. You can just search for Nodejs on DockerHub and you'll find a bunch of images. You can then use one of these images as the parent image for your application.

The images can be pulled with the following command:

```bash
docker pull <image-name>
```

On the docker hub page for the image, you'll find the tags for the image. These tags are used to specify the version of the image and the Linux distribution. For example, the following command will pull the Nodejs image with the tag `12.18.3-alpine3.12`:

```bash
docker pull node:17-alpine
```

If we don't specify a tag, Docker will pull the image with the default `latest` tag.

## The Dockerfile

It is like a set of instructions for Docker to create an image. It lists all the commands to create those different layers. It also specifies the parent image.

The Dockerfile is usually placed in the root directory of the application. It is named `Dockerfile`. The name is case sensitive. Each instruction in the file should be on a different line. Each line represents a different layer of the image.

Now let's see how to write a _Dockerfile_.

#### Step 1: Specify the parent image

The first line should always be the parent image. For example, the following Dockerfile will create an image with the Nodejs 12.18.3 Alpine image as the parent image:

```Dockerfile
FROM node:17-alpine
```

This will download the Nodejs 12.18.3 Alpine image from DockerHub and use it as the parent image. The `FROM` keyword is used to specify the parent image.

#### Step 2: Specify the working directory

The next step is to specify the working directory. For example, the following Dockerfile will set the working directory to `/app`:

```Dockerfile
FROM node:17-alpine

WORKDIR /app
```

Here `WORKDIR` is used to set the working directory. So this will set the working directory to `/app`. If we don't specify the working directory, Docker will use the root directory as the working directory which will be `/` in this case. It will affect us in step 4.

#### Step 3: Copy the application code

The next step is to copy the application code into the image. For example, the following Dockerfile will copy the application code into the `/app` directory of the image:

```Dockerfile
FROM node:17-alpine

WORKDIR /app

COPY ./api .
```

Here `./api` represents the current directory. So this will copy all the files and folders from the current directory into the `/app` directory of the image. The `COPY` keyword is used to copy files and folders into the image.

Remember that the docker images have their own file system. So the `/app` directory is inside the image, not on the host operating system.

#### Step 4: Install dependencies

The next step is to install the application dependencies. For example, the following Dockerfile will install the application dependencies:

```Dockerfile
FROM node:17-alpine

WORKDIR /app

COPY ./api .

RUN npm install
```

Here `RUN` is used to run commands inside the image. So this will run the `npm install` command inside the image. Note that we don't have to specify the `WORKDIR` here because we already specified it in step 2 otherwise the `npm install` command would have been run in the root directory.

#### Step 5: Expose the port

The next step is to expose the port. For example, the following Dockerfile will expose port 5000:

```Dockerfile
FROM node:17-alpine

WORKDIR /app

COPY ./api .

RUN npm install

EXPOSE 5000
```

Here `EXPOSE` is used to expose the port. So this will expose port 5000. This will be the port inside the container and not on the host operating system.

This is an optional step. If we run our app from the command line, we don't have to expose the port.

#### Step 6: Specify the startup command

The last step is to specify the startup command. For example, the following Dockerfile will specify the startup command:

```Dockerfile
FROM node:17-alpine

WORKDIR /app

COPY ./api .

RUN npm install

EXPOSE 5000

CMD ["npm", "start"]
```

Here `CMD` is used to specify the startup command. So this will run the `npm start` command when the container is started. `CMD` is used to specify the command to run when the container is started.

> Why didn't we write `RUN npm start`?
>
> The `RUN` command is used to run commands when the image is being built. So if we write `RUN npm start`, it will run the `npm start` command when the image is being built. But we want to run the `npm start` command when the container is started. So we use the `CMD` command instead.

#### Final Step: Building the image

Now that we have written the Dockerfile, we can build the image. Move to the directory where the Dockerfile is located and run the following command:

```bash
docker build -t <image-name> .
```

Here `docker build` is used to build the image. `-t` is used to specify the image name. `.` is the relative path to the Dockerfile from the current directory we are in.

So this will build the image with the name `<image-name>`.

## dockerignore

The `.dockerignore` file is used to specify the files and folders that we don't want to copy into the image. It is similar to the `.gitignore` file. It is also placed in the root directory of the application.

For example, the following `.dockerignore` file will ignore the `node_modules` folder:

```dockerignore
node_modules
```

If we don't specify the `.dockerignore` file, Docker will copy all the files and folders into the image. This will increase the size of the image, the time it takes to build the image, and may occasionally overwrite node_modules from the system's to the container's.

## Starting and Stopping Containers

We can run the docker image to create a container out of it. It can either be done using Docker Desktop or the command line.

### Docker Desktop

While running the image from Docker Desktop, we get some options in the GUI to set the _Container Name_, _Port Mapping_, _Environment Variables_, etc. We can also set these options using the command line.

> Docker allows us to map a port from local host to the one running inside the container. So if we expose port 5000 inside the container, we can map it to port 8000 on the local host. This will allow us to access the application running inside the container from the browser on port 8000.

_Note: We can only map a port that is exposed inside the container. So basically, we can only do it if we have specified the `EXPOSE` command in the Dockerfile._

### Command Line

#### Getting the image name

To run any image, we need its name or id. We can get the name of the image using the following command:

```bash
docker images
```

This will list all the images. We can get the name of the image from here.

#### Running the image

To run the image, we can use the following command:

```bash
docker run --name <container-name> -p <host-port>:<container-port> -d -e <environment-variables> <image-name>
# docker run --name my-container -p 8000:5000 -d -e PORT=5000 <image-name>
```

Here `docker run` is used to run the image. `--name` is used to specify the container name. `-p` is used to specify the port mapping. `-d` is used to detach the container so it doesn't block our terminal. `-e` is used to specify the environment variables. `<image-name>` is the name of the image.

If we don't specify any port mapping, we won't be able to access the application running inside the container from the browser. We will get a `connection refused` error.

#### Stopping a container

To stop a container, we can use the following command:

```bash
docker stop <container-name>
# docker stop my-container
```

Here `docker stop` is used to stop the container. `<container-name>` is the name of the container.

#### Starting a container

To start a container, we can use the following command:

```bash
docker start <container-name>
# docker start my-container
```

Here `docker start` is used to start the container. `<container-name>` is the name of the container. This time we don't have to specify the port mapping, environment variables, etc. because we have already specified them while running the image.

## Managing Images and Containers

Here are all the commands to manage images and containers.

#### List all the images:

```bash
docker images
```

#### List all the containers:

```bash
docker ps -a
```

#### List all the running containers:

```bash
docker ps
```

#### Remove an image:

```bash
docker image rm <image-name>
  # or
docker rmi <image-name>
```

_Note: We can't remove an image if there's a container is created from it. We have to remove the container first._

#### Remove an image forcefully (if there's a container created from it):

```bash
docker image rm -f <image-name>
  # or
docker rmi -f <image-name>
```

Now the alternate way to remove an image which has a container created from it is to remove the container first and then remove the image.

#### Remove a container:

```bash
docker container rm <container-name>
  # or
docker rm <container-name>
```

#### Remove multiple containers:

```bash
docker container rm <container-name-1> <container-name-2> <container-name-3>
  # or
docker rm <container-name-1> <container-name-2> <container-name-3>
```

#### Remove all the images, containers, and volumes:

```bash
docker system prune -a
```

`-a` is used to remove all the images, containers, and volumes. if we don't specify `-a`, it will only remove the unused images, containers, and volumes.

## Layer Caching

At every step of the Dockerfile, Docker creates a layer and at every layer it caches the images till that layer. So if we change something in the Dockerfile for step 4, Docker will only rebuild the image from step 4 and not from step 1. This is called layer caching.

This happens because when image was built initially, it was saved after each layer. So the image up until the step 3 would already be saved. So when we change something in step 4, Docker will only rebuild the image from step 4 and not from step 1.

This saves a lot of time while building the image.

For example, let's say the initial steps were:

```Dockerfile
FROM node:17-alpine # cached till layer 1

WORKDIR /app # images cached till layer 1 & 2

COPY ./api . # images cached till layer 1, 2 & 3

RUN npm install # images cached till layer 1, 2, 3 & 4
```

Here, each step will create a new layer in image and take some time. But now if we change something in step 3, Docker will only rebuild the image from step 3 and not from step 1. So the new steps will be:

```Dockerfile
FROM node:17-alpine

WORKDIR /app # cached image (till layer 1 & 2) will be used

COPY ./api ./app # changes will be made from here

RUN npm install # reruns since layers are built on top of each other
```

So, Docker will the use cached image for the first 2 layers and then rebuild the image from the 3rd layer.

#### Refactoring the Dockerfile

In the above example, whenever we make a change in the code, Docker will rebuild the image from the 3rd layer and hence the `npm install` command will run again and again. This will take a lot of time. So we can refactor the Dockerfile to make the `npm install` command run only when the `package.json` file changes.

```Dockerfile
FROM node:17-alpine

WORKDIR /app

COPY ./api/package.json ./app/package.json # copy only package.json

RUN npm install # run npm install

COPY ./api ./app
```

Now an image for the first 4 layers will be cached and can be reused again and again if there's no change in package.json. So if we make a change in the code, Docker will only rebuild the image from the 5th layer and not from the 1st layer.

## Tagging Images

We can create different versions of an image by using tags. By default, Docker will tag an image as `latest`. We can specify our own tag while building the image.

```bash
docker build -t <image-name>:<tag> .
  # docker build -t my-image:1.0 .
```

Now if we want to run this image, we can use the following command:

```bash
docker run --name <container-name> -p <host-port>:<container-port> -d -e <environment-variables> <image-name>:<tag>
  # docker run --name my-container -p 8000:5000 -d -e PORT=5000 my-image:1.0
```
