package handlers

import (
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/log"
	"github.com/lgomez-dev/bannerbro/pkg/database"
)

func HandleBanner(c *fiber.Ctx) error {
	bannerName := c.Params("social")
	// Record a click with location
	location := c.Get("CF-IPCountry")
	if location == "" {
		location = "Gibraltar"
	}
	// Create in DB
	err := database.CreateBannerClickData(location, bannerName)
	if err != nil {
		log.Error(err)
	}

	// Render Page
	return c.Render("individual_banner", fiber.Map{
		"social": bannerName,
	})
}
