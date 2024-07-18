package controllers

import (
	"back/models"
	"time"
	"back/utils"
	"github.com/dgrijalva/jwt-go"
	"github.com/gin-gonic/gin"
	"net/http"
    "path/filepath"
	"os"
)

var jwtKey = []byte("my_secret_key")

func Login(c *gin.Context) {

	var user models.User

	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}

	var existingUser models.User

	models.DB.Where("username = ?", user.Username).First(&existingUser)

	if existingUser.ID == 0 {
		c.JSON(400, gin.H{"error": "user does not exist"})
		return
	}

	errHash := utils.CompareHashPassword(user.Password, existingUser.Password)

	if !errHash {
		c.JSON(400, gin.H{"error": "invalid password"})
		return
	}

	expirationTime := time.Now().Add(5 * time.Minute)

	claims := &models.Claims{
		Role: existingUser.Role,
		StandardClaims: jwt.StandardClaims{
			Subject:   existingUser.Email,
			ExpiresAt: expirationTime.Unix(),
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	tokenString, err := token.SignedString(jwtKey)

	if err != nil {
		c.JSON(500, gin.H{"error": "could not generate token"})
		return
	}

	c.SetCookie("token", tokenString, int(expirationTime.Unix()), "/", "localhost", false, true)
	c.JSON(200, gin.H{"success": token})
}

func Signup(c *gin.Context) {
    if err := c.Request.ParseMultipartForm(10 << 20); err != nil { // limit to 10MB
        c.JSON(http.StatusBadRequest, gin.H{"error": "Failed to parse multipart form"})
        return
    }

    var user models.User
    user.Username = c.PostForm("username")
    user.Email = c.PostForm("email")
    user.Name = c.PostForm("name")
    user.Surname = c.PostForm("surname")
    user.Password = c.PostForm("password")
    user.Role = c.PostForm("role")

    var existingUser models.User

    models.DB.Where("email = ?", user.Email).First(&existingUser)
    if existingUser.ID != 0 {
        c.JSON(http.StatusBadRequest, gin.H{"error": "User already exists"})
        return
    }

    models.DB.Where("username = ?", user.Username).First(&existingUser)
    if existingUser.ID != 0 {
        c.JSON(http.StatusBadRequest, gin.H{"error": "User already exists"})
        return
    }

    var errHash error
    user.Password, errHash = utils.GenerateHashPassword(user.Password)
    if errHash != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not generate password hash"})
        return
    }

    file, err := c.FormFile("profile_image")
    if err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Failed to receive profile image"})
        return
    }

    // Ensure the directory exists
    userDir := filepath.Join("uploads", user.Username)
    if err := os.MkdirAll(userDir, os.ModePerm); err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create directory"})
        return
    }

    // Save the profile image
    filePath := filepath.Join(userDir, file.Filename)
    if err := c.SaveUploadedFile(file, filePath); err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to save profile image"})
        return
    }

    // Save the image path to the user model
    user.MediaURL = filePath

    models.DB.Create(&user)
    c.JSON(http.StatusOK, gin.H{"success": "User created", "media_url": filePath})
}

func Logout(c *gin.Context) {
	c.SetCookie("token", "", -1, "/", "localhost", false, true)
	c.JSON(200, gin.H{"success": "user logged out"})
}
