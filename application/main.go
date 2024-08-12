package main

import (
	"template/pkg/routes"
	"template/pkg/utils"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/template/django/v3"
)

func init() {
	utils.ConnectToDatabase()
	utils.SyncDB()
}

func main() {
	// Setup Django Routes
	engine := django.New("./views", ".django")
	app := fiber.New(fiber.Config{Views: engine})

	// Set up routes
	routes.Setup(app)

	app.Listen(":3000")
}
