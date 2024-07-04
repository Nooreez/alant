package models

import "gorm.io/gorm"

type User struct {
	gorm.Model
	Name     string  `json:"name"`
	Username string  `json:"username"`
	Surname  string  `json:"surname"`
	Email    string  `gorm:"unique" json:"email"`
	Password string  `json:"password"`
	Role     string  `json:"role"`
}