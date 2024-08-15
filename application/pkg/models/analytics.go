package models

import (
	"time"
)

// BannerAnalytics represents the analytics data for a specific banner on a specific month
type BannerAnalytics struct {
	ID           uint          `gorm:"primarykey"`
	BannerName   string        // Name of the banner
	Month        time.Time     // Date should be a time.Time type for better date manipulation
	ClickAmount  uint          // Total clicks in the month
	BannerClicks []BannerClick `gorm:"foreignKey:BannerAnalyticsID"` // One-to-many relationship with BannerClick
}

// BannerClick represents an individual click with location data
type BannerClick struct {
	ID                uint `gorm:"primarykey"`
	Date              time.Time
	BannerAnalyticsID uint   // Foreign key to BannerAnalytics
	Location          string // Location of the click
}
