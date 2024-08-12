package routes

import (
	"template/pkg/handlers"

	"github.com/gofiber/fiber/v2"
)

func Setup(app *fiber.App) {
	routeDefault(app)
}

func routeDefault(app *fiber.App) {
	app.Get("/", handlers.HandleIndex)
}
