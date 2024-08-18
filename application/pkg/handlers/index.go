package handlers

import (
	"github.com/gofiber/fiber/v2"
	"github.com/lgomez-dev/bannerbro/pkg/database"
)

func HandleIndex(c *fiber.Ctx) error {
	banners, _ := database.LoadAllBannerData()

	return c.Render("index", fiber.Map{
		"banners": banners,
		"title":   "Home",
	})
}
