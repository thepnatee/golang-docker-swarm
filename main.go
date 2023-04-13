package main

import (
	"docker-swarm/util"
	"encoding/json"
	"fmt"
	"log"
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/joho/godotenv"
)

func main() {

	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	app := fiber.New()

	// Start Connect SQS
	fmt.Println("SQSConnect Connecting..")
	go util.SQSConnect()
	fmt.Println("SQSConnect Connected ✅")
	// Start Consume
	go util.Read()
	fmt.Println("SQSConnect Start")

	var count = 0

	app.Post("/count", func(c *fiber.Ctx) error {
		response := make(map[string]int)
		count += 1
		response["count"] = count
		return c.JSON(response)
	})
	app.Post("/push", func(c *fiber.Ctx) error {

		body := make(map[string]interface{})
		json.Unmarshal([]byte(c.Body()), &body)

		// _, err := util.Push(body)
		// response := make(map[string]interface{})
		// response["message"] = err

		return c.JSON(body)
	})

	app.Post("/push-queue", func(c *fiber.Ctx) error {

		body := make(map[string]interface{})
		json.Unmarshal([]byte(c.Body()), &body)

		info, _ := json.Marshal(body)

		go util.SQSWriter(string(info))

		response := make(map[string]interface{})

		response["message"] = "success"

		return c.JSON(response)
	})

	app.Use(func(c *fiber.Ctx) error {
		return c.SendString("Not found.")
	})

	port := os.Getenv("PORT")
	app.Listen(":" + port)
}
