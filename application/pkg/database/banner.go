package database

import (
	"github.com/lgomez-dev/bannerbro/pkg/models"
	"github.com/lgomez-dev/bannerbro/pkg/utils"
)

func LoadAllBannerData() ([]models.BannerTypes, error) {
	var banners []models.BannerTypes

	if err := utils.DB.Find(&banners).Error; err != nil {
		return nil, err
	}
	return banners, nil
}

func LoadBannerData(bannerName string) (models.BannerTypes, error) {
	var banner models.BannerTypes

	if err := utils.DB.Where("type = ?", bannerName).Find(&banner).Error; err != nil {
		return banner, err
	}
	return banner, nil
}
