
# GO
````
go get .
````
````
go run .
````


# Docker dev

````
docker build -t go-docker-image -f Dockerfile.dev .                                                                                                                                                            
````

````
docker run -d --name go-example -p 3000:3001 go-docker-image
````


------------------------


# Docker pod



````
docker build -t go-docker-swarm -f Dockerfile.swarm .                                                                                                                                                                 
````

## Docker swarm

````
docker service init                                                                                                                                         
````

````
docker service create --replicas 5 --name go-example-swarm --publish 3001:3001  go-docker-swarm                                                                                                                                         
````
-----------

Docker Service

````
docker service ls
````
````
docker service rm <service id>
````

Monitor
````
docker run -it -d -p 8080:8080 -v /var/run/docker.sock:/var/run/docker.sock dockersamples/visualizer
````



Curl Load Test
````
ab -n 10000 -c 100 http://localhost:3000/
````


#Command Restart Init
````
docker rm -f go-example
docker service rm go-example-swarm
docker build -t go-docker-image -f Dockerfile.dev .     
docker build -t go-docker-swarm -f Dockerfile.swarm .   
docker run -d --name go-example -p 3000:3001 go-docker-image
docker service create --replicas 5 --name go-example-swarm --publish 3001:3001  go-docker-swarm   
````