package routes

import (
	"github.com/gofiber/fiber/v2"
	"github.com/lgomez-dev/bannerbro/pkg/handlers"
)

func Setup(app *fiber.App) {
	utilRoutes(app)
	routeDefault(app)
}

func utilRoutes(app *fiber.App) {
	app.Static("/static", "./public")
}

func routeDefault(app *fiber.App) {
	app.Get("/", handlers.HandleIndex)
}
