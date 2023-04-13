
## GO
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


## Curl Load Test
````
ab -n 10000 -c 100 http://localhost:3001/
````
----------

### Command Restart Init
````
docker rm -f go-example:v1.0
docker service rm go-example-swarm:v1.0
docker build -t go-docker-image:v1.0 -f Dockerfile.dev .     
docker build -t go-docker-swarm:v1.0 -f Dockerfile.swarm .   
docker run -d --name go-example -p 3000:3001 go-docker-image:v1.0
docker service create --replicas 10 --name go-example-swarm --publish 3001:3001  go-docker-swarm:v1.0 
````