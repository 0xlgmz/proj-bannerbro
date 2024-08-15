package database

import (
	"time"

	"github.com/lgomez-dev/bannerbro/pkg/models"
	"github.com/lgomez-dev/bannerbro/pkg/utils"
	"gorm.io/gorm"
)

// RecordClick increments the click count for the current month and adds a click record with the location
func CreateBannerClickData(location string, banner string) error {
	analytics, err := getOrCreateBannerAnalytics(banner)
	if err != nil {
		return err
	}

	err = incrementClickAmount(&analytics)
	if err != nil {
		return err
	}

	err = addBannerClickData(analytics.ID, location)
	if err != nil {
		return err
	}

	return nil
}

// GetOrCreateBannerAnalytics finds or creates the BannerAnalytics entry for the current month
func getOrCreateBannerAnalytics(bannerName string) (models.BannerAnalytics, error) {
	var analytics models.BannerAnalytics
	now := time.Now()
	firstDayOfMonth := time.Date(now.Year(), now.Month(), 1, 0, 0, 0, 0, now.Location())

	err := utils.DB.Where("month >= ? AND month < ?", firstDayOfMonth, firstDayOfMonth.AddDate(0, 1, 0)).
		FirstOrCreate(&analytics, models.BannerAnalytics{Month: firstDayOfMonth, BannerName: bannerName}).Error
	if err != nil {
		return analytics, err
	}

	return analytics, nil
}

// IncrementClickAmount increments the ClickAmount for the given BannerAnalytics entry
func incrementClickAmount(analytics *models.BannerAnalytics) error {
	return utils.DB.Model(analytics).Update("click_amount", gorm.Expr("click_amount + ?", 1)).Error
}

// AddBannerClick creates a new BannerClick entry with the given location
func addBannerClickData(analyticsID uint, location string) error {
	now := time.Now()
	click := models.BannerClick{
		BannerAnalyticsID: analyticsID,
		Date:              now,
		Location:          location,
	}
	return utils.DB.Create(&click).Error
}
