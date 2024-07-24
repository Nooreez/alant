package routes

import (
	"back/controllers"

	"github.com/gin-gonic/gin"
)

func AuthRoutes(r *gin.Engine) {
	//authorization
	r.POST("/login", controllers.Login)
	r.POST("/signup", controllers.Signup)
	r.GET("/logout", controllers.Logout)
	
	r.GET("/profile/:username", controllers.Profile)
    r.GET("/users", controllers.UserList)

	r.PUT("/profile/:username", controllers.UpdateProfile)

}