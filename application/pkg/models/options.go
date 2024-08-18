package models

type BannerTypes struct {
	ID     uint   `gorm:"primarykey"`
	Type   string `json:"type"`
	Width  uint   `json:"width"`
	Height uint   `json:"height"`
}

type Images struct {
	ID        uint
	URL       string
	Thumbnail string
}
