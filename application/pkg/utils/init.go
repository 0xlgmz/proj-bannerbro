package utils

import (
	"fmt"
	"os"

	"github.com/lgomez-dev/bannerbro/pkg/models"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func ConnectToDatabase() {

	dsn := fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=5432 sslmode=disable",
		os.Getenv("DB_IP"), os.Getenv("DB_USER"), os.Getenv("DB_PASSWD"), os.Getenv("DB_NAME"))
	var err error
	DB, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		panic("failed to connect to database")
	}
}

func SyncDB() {
	DB.AutoMigrate(
		&models.BannerAnalytics{},
		&models.BannerClick{},
		&models.BannerTypes{},
		&models.Images{},
	)
	if DB.Migrator().HasTable(&models.BannerTypes{}) {
		bannerType := []models.BannerTypes{
			{Type: "twitter", Width: uint(1500), Height: uint(500)},
			{Type: "facebook", Width: uint(851), Height: uint(315)},
			{Type: "youtube", Width: uint(2560), Height: uint(1440)},
			{Type: "linkedin", Width: uint(1584), Height: uint(396)},
		}
		for _, bannerType := range bannerType {
			DB.FirstOrCreate(&bannerType, bannerType)
		}
	}
}
