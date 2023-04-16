package main

import (
	"docker-swarm/util"
	"encoding/json"
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

	var app_env = os.Getenv("APP_ENV")
	if app_env != "DEV" {
		go util.SQSConnect()
		go util.Read()
	}

	var count = 0

	app.Get("/count", func(c *fiber.Ctx) error {
		response := make(map[string]int)
		count += 1
		response["count"] = count
		return c.JSON(response)
	})

	app.Post("/push", func(c *fiber.Ctx) error {

		body := make(map[string]interface{})
		json.Unmarshal([]byte(c.Body()), &body)

		response := make(map[string]interface{})
		response["message"] = body

		return c.JSON(response)
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
		return c.SendString("Hello Example Golang Handdle Scale with Message Queue")
	})

	port := os.Getenv("PORT")
	app.Listen(":" + port)
}
