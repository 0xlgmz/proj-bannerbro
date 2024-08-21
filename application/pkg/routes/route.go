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
	app.Get("/banner/:social/desktop-content", handlers.DesktopContentHandler)
	app.Get("/banner/:social/mobile-content", handlers.MobileContentHandler)
}

func routeDefault(app *fiber.App) {
	app.Get("/", handlers.HandleIndex)
	app.Get("/banner/:social", handlers.HandleBanner)
}
