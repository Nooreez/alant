package models

import "gorm.io/gorm"

type User struct {
	gorm.Model
	Name        string `json:"name"`
	Username    string `json:"username" gorm:"unique"`
	Surname     string `json:"surname"`
	Email       string `json:"email" gorm:"unique"`
	Password    string `json:"password"`
	Role        string `json:"role"`
	DOB         string `json:"dob"`
	Institution string `json:"institution"`
	MediaURL    string `json:"media_url"`
}
