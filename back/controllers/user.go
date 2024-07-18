package controllers

import (
	"back/models"
	"github.com/gin-gonic/gin"
	"net/http"
    "path/filepath"
)

func Profile(c *gin.Context) {
	var user models.User
	username := c.Param("username")
	result := models.DB.Where("username = ?", username).First(&user)
	if result.Error != nil {
		c.JSON(404, gin.H{"error": "User not found"})
		return
	}
	c.JSON(200, gin.H{"success": user})
}

func UploadMedia(c *gin.Context) {
    username := c.Param("username")
    file, err := c.FormFile("file")
    if err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "No file is received"})
        return
    }

    // Define the path to save the file
    filePath := filepath.Join("uploads", username, file.Filename)

    // Save the file to disk
    if err := c.SaveUploadedFile(file, filePath); err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Unable to save the file"})
        return
    }

    // Update the user's media URL in the database
    var user models.User
    result := models.DB.Where("username = ?", username).First(&user)
    if result.Error != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
        return
    }

    user.MediaURL = filePath
    models.DB.Save(&user)

    c.JSON(http.StatusOK, gin.H{"success": "File uploaded successfully", "media_url": filePath})
}
func UserList(c *gin.Context) {
    var users []models.User
    result := models.DB.Find(&users)
    if result.Error != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Unable to fetch user list"})
        return
    }
    c.JSON(http.StatusOK, gin.H{"success": users})
}