package models

import "gorm.io/gorm"

type BannerTypes struct {
	gorm.Model
	Type        string `json:"type"`
	Title       string `json:"title"`
	Description string `json:"description"`
	URL         string `json:"url"`
	Width       string `json:"width"`
	Height      string `json:"height"`
}

type Colors struct {
	gorm.Model
	R uint `json:"r"`
	G uint `json:"g"`
	B uint `json:"b"`
}

type Fonts struct {
	gorm.Model
	Name     string `json:"name"`
	FullName string `json:"fullName"`
}
