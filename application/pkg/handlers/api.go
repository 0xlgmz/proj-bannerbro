package handlers

import (
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/log"
	"github.com/lgomez-dev/bannerbro/pkg/database"
)

func MobileContentHandler(c *fiber.Ctx) error {
	banners, _ := database.LoadAllBannerData()
	bannerName := c.Params("social")
	for _, j := range banners {
		if j.Type == bannerName {
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

			clicksData, _ := database.GetBannerAnalyticsOrderedByClicks()
			// Render Page
			return c.Render("individual_banner", fiber.Map{
				"social":    bannerName,
				"Banners":   banners,
				"ClickData": clicksData,
				"title":     bannerName + "Banner Generator",
			})
		}
	}
	return c.Render("error/error", nil)
}

func DesktopContentHandler(c *fiber.Ctx) error {
	banners, _ := database.LoadAllBannerData()
	bannerName := c.Params("social")
	for _, j := range banners {
		if j.Type == bannerName {
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

			clicksData, _ := database.GetBannerAnalyticsOrderedByClicks()
			// Render Page
			return c.Render("individual_banner", fiber.Map{
				"social":    bannerName,
				"Banners":   banners,
				"ClickData": clicksData,
				"title":     bannerName + "Banner Generator",
			})
		}
	}
	return c.Render("error/error", nil)
}
