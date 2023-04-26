package controller

import (
	"net/http"

	"A2PK_UWC2.0/internal/entity"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func NewTrollerController(g *gin.Engine, db *gorm.DB) {
	router := g.Group("/troller")
	router.GET("/", getListOfTroller(db))
}

func getListOfTroller(db *gorm.DB) func(c *gin.Context) {
	return func(c *gin.Context) {
		var trollies []entity.Troller
		if err := db.Table("troller").Find(&trollies).Error; err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": err.Error(),
			})
			return
		}
		c.JSON(http.StatusOK, trollies)
	}
}
