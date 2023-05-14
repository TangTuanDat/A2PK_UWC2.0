package controller

import (
	"fmt"
	"net/http"
	"strconv"

	"A2PK_UWC2.0/internal/entity"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func NewUserController(g *gin.Engine, db *gorm.DB) {
	router := g.Group("/users")
	router.POST("/", createUser(db))                   // create user
  router.GET("/", getUser(db))
	router.GET("/:id", readUserById(db))               // get an item by ID
	router.PUT("/:id", editUserById(db))               // edit an item by ID
	router.GET("/janitors", getListOfJanitors(db))     // list users
	router.GET("/collectors", getListOfCollectors(db)) // list users
}

func getUser(db *gorm.DB) func(c *gin.Context) {
	return func(c *gin.Context) {
		var users []entity.User
		if err := db.Table("users").Find(&users).Error; err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": err.Error(),
			})
			return
		}
		c.JSON(http.StatusOK, users)
	}
}
func createUser(db *gorm.DB) func(ctx *gin.Context) {
	return func(c *gin.Context) {
		var data entity.UserCreation
		if err := c.ShouldBind(&data); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": err.Error(),
			})
			return
		}
		if err := db.Create(&data).Error; err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": err.Error(),
			})
			return
		}
		c.JSON(http.StatusOK, gin.H{
			"new_user": data.Username,
		})
	}
}

func readUserById(db *gorm.DB) func(c *gin.Context) {
	return func(c *gin.Context) {
		var user entity.User
		id, err := strconv.Atoi(c.Param("id"))
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": err.Error(),
			})
		}
		if err := db.Table("users").Where("user_id = ?", id).First(&user).Error; err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": err.Error(),
			})
			return
		}
    c.Header("Access-Control-Allow-Origin", "*")
    fmt.Println(c.GetHeader("Content-Type"))
		c.JSON(http.StatusOK, user)
	}
}

func editUserById(db *gorm.DB) func(c *gin.Context) {
	return func(c *gin.Context) {
		var user entity.UserUpdate
		id, err := strconv.Atoi(c.Param("id"))
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": err.Error(),
			})
		}
		if err := c.ShouldBind(&user); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": err.Error(),
			})
			return
		}
		if err := db.Table("users").Where("user_id = ?", id).Updates(&user).Error; err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": err.Error(),
			})
			return
		}
		c.JSON(http.StatusOK, gin.H{
			"data": true,
		})
	}
}

func getListOfJanitors(db *gorm.DB) func(c *gin.Context) {
	return func(c *gin.Context) {
		var janitors []entity.User
		if err := db.Table("users").Where("role = ?", "Janitor").Find(&janitors).Error; err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": err.Error(),
			})
			return
		}
		c.JSON(http.StatusOK, janitors)
	}
}

func getListOfCollectors(db *gorm.DB) func(c *gin.Context) {
	return func(c *gin.Context) {
		var collectors []entity.User
		if err := db.Table("users").Where("role = ?", "Collector").Find(&collectors).Error; err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": err.Error(),
			})
			return
		}
		c.JSON(http.StatusOK, collectors)
	}
}
