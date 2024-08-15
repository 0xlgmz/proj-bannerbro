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
		&models.Colors{},
		&models.Fonts{},
	)
	// if DB.Migrator().HasTable(&models.BannerTypes{}) {
	// 	bannerAnalytics := []models.
	// }
}
