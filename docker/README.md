# Docker
Docker is to run software applications inside of a "container", which is like a lightweight OS running your software application. This is useful because it's a pain having
to build an app on one machine and having to mimic that environment on another machine, especially if it's a different OS.

Install the Docker Desktop app, which includes the Docker engine that runs containers here: https://hub.docker.com/

## Container vs Virtual Machine
A container is just a set of processes that are isolated from the rest of the system, running from a distinct "image" that provides all files necessary to support the processes. You can have multiple containers in a parent OS, and the parent kernel is used to manage all of these containers. Since containers share the same kernel, it's much faster to load up and doesn't require much setup. For instance, let's say we run Docker on my MacOS laptop, and I have it running 3 containers. There are 3 separate virtualized operating systems running on my MacOS laptop. One of these containers can be a Ubuntu hosting my front-end React app, another can be Ubuntu running my NodeJS API service, and another can be Debian running my MySQL database. All 3 containers are being controlled by the MacOS kernel, but they each share their own user space.

In contrast, a virtual machine is a OS with a kernal associated with it. The VM has to be setup by a developer, and it may take a long time to load because it's a large process with its own separate kernel.

![Container vs Virtual Machine](images/Docker-containers-are-not-lightweight-virtual-machines.png)
Source: https://www.nakivo.com/blog/docker-vs-kubernetes/

## Dockerfile
The benefit of Docker is that it allows for developers to always run the same type of process with the same type of setup in any computer. This is done thanks to a Dockerfile, which specifies the base Docker image, the dependencies, and the commands to build a new Docker image that runs on a container.

# Docker Tutorial
To pull an image and run a container, run `docker container run -p <PROXY_PORT>:<PORT> <IMAGE NAME>`

To check the containers running in our system, run `docker container ls`  
If you want to check the containers in our system, whether they're running or not, run `docker container ls -a`  or short-hand `docker ps`  
To delete the container, run `docker container rm <CONTAINER ID>`  
To force delete the container even if it's running, run `docker container rm -f <CONTAINER ID>`

To check the images in our system, run `docker images`  
To delete the image, run `docker image rm <IMAGE ID>`  
To get back the image, run `docker pull <IMAGE NAME>`; for example, `docker pull nginx`

## 1. Creating your first container
Run the command `docker container run -it -p 80:80 nginx` to run an Nginx web-server on port 80. Go to `localhost:80` and you can see the nginx server running in our container! Since we ran the command using the `-it` parameter (interactive mode), you can see the logs showing up on the console that ran the command. Here is the image that we ran https://hub.docker.com/_/nginx in our container.

## 2. Running a container in the background
Sometimes it's annoying having to have an open terminal for our container, so instead we can run a container in the background. Run the command `docker container run -d -p 80:80 nginx` to run nginx in port 80 on the background. The `-d` (detached) parameter runs the nginx server in the background.

## 3. Run multiple containers
Run `docker container run -d -p 8080:80 --name pravat-nginx nginx` to run nginx on port 8080 in a new container with the name "pravat-nginx"
    - The container is running the service on port 80, but it's being proxied to our computer in port 8080
    - Go to `localhost:8080` to view the nginx server

Run `docker container run -d -p 8081:80 --name pravat-apache httpd` to run apache on port 8081 in a new container with the name "pravat-apache"
    - The container is running the service on port 80, but it's being proxied to our computer in port 8081
    - Go to `localhost:8081` to view the apache server

## 4. Environment variables for a docker container
https://hub.docker.com/_/mysql the mysql image uses environment variables, as noted in their README file on DockerHub.

Run `docker container run -d -p 3306:3306 --name mysql --env MYSQL_ROOT_PASSWORD=123456 mysql` to create a mysql server on port 3306 with environment variable MYSQL_ROOT_PASSWORD of 123456. If you're getting an error with pulling the image on an M1 mac because of linux/arm64, then run `docker pull --platform linux/amd64` and then run the command.

## 5. How to enter your container
You can bash into your containers, such as the nginx container. Run `docker container exec -it pravat-nginx bash`. The container is using the debian OS, so once you've entered the container, you can Linux commands in there!

cd into `/usr/share/nginx/html` in the container, and you can see the index.html file that is the front-end for the nginx server.

## 6. Bind mount
Bind mounting is helpful if you want to run your local files in a docker container.

cd into the `bind-mount` folder of this repository, and run `docker container run -d -p 8080:80 -v $(pwd):/usr/share/nginx/html --name pravat-nginx nginx` to run your local web-server in the nginx container. The `pwd` part means to use the directory we run this command on, so that is the directory to the `bind-mount` folder which in my case is `/Users/pravatbhusal/Desktop/devops-archives/docker/bind-mount`.

## 7. Creating an image from a Dockerfile
I created a Dockerfile defined in `bind-mount/Dockerfile`. To run the Dockerfile, cd into the `bind-mount` folder and run `docker image build -t shadowsych/pravat-nginx .` where shadowsych is my DockerHub username.

Now if you run `docker images`, you'll see the new shadowsych/pravat-nginx image! Now we can create a container from that image by running `docker container run -d -p 8080:80 shadowsych/pravat-nginx`. Now if you go to `localhost:8080`, you can see it's using the files from the `bind-mount` folder because that's what our Dockerfile does for us.

If you want to push this new image into DockerHub, you can run `docker push shadowsych/pravat-nginx`. If you get a message about authentication, just do `docker login` to login to DockerHub. Now you can see your image published on DockerHub https://hub.docker.com/r/shadowsych/pravat-nginx.

# Docker Compose
Docker compose is a container orchestration framework to run multi-container Docker apps. This is a more lightweight version of Kubertnetes, where Kubernetes runs containers over a number of computers while Docker compose just runs on a single computer.

The `compose` folder has a sample NodeJS and MongoDB application that we use with Docker Compose to run and manage multiple containers.

## 1. docker-compose.yml
The `docker-compose.yml` defines the services that make up our entire app. It can define the containers to run, from what image to run those containers, what ports to use, and what containers are linked together.

## 2. .dockerignore
Excludes files that are not necessary when Docker builds the image from the Dockerfile. This is like the .gitignore file used by GitHub.

## 3. docker-compose up
Run `docker-compose up` to run the `docker-compose.yml` file, once this finishes running go to `localhost:80` and you can see the app! If you want to run
it in the background, you can run `docker compose up -d`.

## 4. docker-compose down
You can either Ctrl + C on the terminal command `docker-compose up` or run `docker-compose down` to remove the running containers.