package main

import (
    "log"
    "os"
    "github.com/gin-gonic/gin"
    "github.com/joho/godotenv"
    "back/models"
    "back/routes"
)

func main() {
    r := gin.Default()

    err := godotenv.Load()
    if err != nil {
        log.Fatal("Error loading .env file")
    }

    // Configure database connection
    config := models.Config{
        Host:     os.Getenv("DB_HOST"),
        Port:     os.Getenv("DB_PORT"),
        User:     os.Getenv("DB_USER"),
        Password: os.Getenv("DB_PASSWORD"),
        DBName:   os.Getenv("DB_NAME"),
        SSLMode:  os.Getenv("DB_SSLMODE"),
    }
    models.InitDB(config)

    // CORS middleware
    r.Use(enableCORS)

    // Define routes
    routes.AuthRoutes(r)


    r.Static("/uploads", "./uploads")

    // Run server
    r.Run(":8080")
}

// CORS middleware function
func enableCORS(c *gin.Context) {
    c.Header("Access-Control-Allow-Origin", "*")
    c.Header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
    c.Header("Access-Control-Allow-Headers", "Origin, Content-Type, Authorization")

    // Handle OPTIONS method
    if c.Request.Method == "OPTIONS" {
        c.AbortWithStatus(200)
        return
    }

    c.Next()
}
