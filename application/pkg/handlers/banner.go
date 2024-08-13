package handlers

import "github.com/gofiber/fiber/v2"

func HandleBanner(c *fiber.Ctx) error {
	social := c.Params("social")

	return c.Render("individual_banner", fiber.Map{
		"social": social,
	})
}
