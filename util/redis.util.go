package util

import (
	"os"

	"github.com/go-redis/redis"
)

func Redis(key string, value string) {
	// Create a new Redis client
	client := redis.NewClient(&redis.Options{
		Addr:     os.Getenv("REDIS_ADDR"),
		Password: os.Getenv("REDIS_PASSWORD"),
		DB:       0,
	})

	// Set a key-value pair in Redis
	err := client.Set(key, value, 0).Err()
	if err != nil {
		panic(err)
	}

	// Close the Redis client when finished
	err = client.Close()
	if err != nil {
		panic(err)
	}
}
