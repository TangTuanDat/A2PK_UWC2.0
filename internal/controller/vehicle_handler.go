package controller

import (
	"net/http"

	"A2PK_UWC2.0/internal/entity"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func NewVehicleController(g *gin.Engine, db *gorm.DB) {
	router := g.Group("/vehicle")
	router.GET("/", getListOfVehicle(db))
}

func getListOfVehicle(db *gorm.DB) func(c *gin.Context) {
	return func(c *gin.Context) {
		var vehicles []entity.Vehicle
		if err := db.Table("vehicle").Find(&vehicles).Error; err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": err.Error(),
			})
			return
		}
		c.JSON(http.StatusOK, vehicles)
	}
}
