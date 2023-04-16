



## Init Project

````
mv .env.example .env
````
#### Get AWS credentials

````
cat ~/.aws/credentials
````
````
copy value AWS Credential Access key and Credential Secret key
````

### Edit 

````
CUSTOM_AWS_ACCESS_KEY_ID=<AWS Credential Access key>
CUSTOM_AWS_SECRET_ACCESS_KEY=<AWS Credential Secret key>
AWS_QUEUE_NAME=<AWS SQS Service URL Queue>
````
### Start Project

````
go get .
````
````
go run .
````


## Docker dev

````
docker build -t go-docker-image:v1.0 -f Dockerfile.dev .                                                                                                                                                            
````

````
docker run -d --name go-example:v1.0 -p 3000:3001 go-docker-image
````

------------------------


## Docker swarm

````
docker build -t go-docker-swarm -f Dockerfile.swarm .                                                                                                                                                                 
````

## Docker swarm cluster

````
docker service init                                                                                                                                         
````

````
docker service create --replicas 10 --name go-example-swarm --publish 3001:3001  go-docker-swarm                                                                                                                                         
````
-----------

## Docker Service list

````
docker service ls
````

## Docker Service Scale
````
docker service scale <service_name>=<number of worker>
````

## Docker Service Remove
````
docker service rm <service_name>
````

## Monitor
````
docker run -it -d -p 8080:8080 -v /var/run/docker.sock:/var/run/docker.sock dockersamples/visualizer
````


## K6Load Test

Install for MacOS
````
brew install k6
````

Run Load Test
````
k6 run loadtest-demo-docker-swarm.js
k6 run loadtest-demo.js
````
----------

### Command Restart
````
docker rm -f go-example
docker service rm go-example-swarm
docker build -t go-docker-image:v1.0 -f Dockerfile.dev .     
docker build -t go-docker-swarm:v1.0 -f Dockerfile.swarm .   
docker run -d --name go-example -p 3000:3001 go-docker-image:v1.0
docker service create --replicas 10 --name go-example-swarm --publish 3001:3001  go-docker-swarm:v1.0 
````