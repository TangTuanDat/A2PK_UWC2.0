package controller

import (
	"net/http"
	"strconv"

	"A2PK_UWC2.0/internal/entity"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func NewTaskController(g *gin.Engine, db *gorm.DB) {
	router := g.Group("/tasks")
	router.GET("/", getListOfTasks(db))  // list tasks
	router.GET("/:id", readTaskById(db)) // read tasks by id
	router.PUT("/:id", editTaskById(db)) // edit an item by ID
	router.POST("/", createTask(db))     // create task
}

func createTask(db *gorm.DB) func(ctx *gin.Context) {
	return func(c *gin.Context) {
		var data entity.TaskCreation
		if err := c.ShouldBind(&data); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": err.Error(),
			})
			return
		}
		if data.Worker_role == "Janitor" {
			data.Method = "troller"
		} else if data.Worker_role == "Collector" {
			data.Method = "vehicle"
		}
		if err := db.Create(&data).Error; err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": err.Error(),
			})
			return
		}
		c.JSON(http.StatusOK, gin.H{
			"new_task": data.MCPLocation,
		})
	}
}

func getListOfTasks(db *gorm.DB) func(c *gin.Context) {
	return func(c *gin.Context) {
		var tasks []entity.Task
		if err := db.Table("task").Find(&tasks).Error; err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": err.Error(),
			})
			return
		}
		c.JSON(http.StatusOK, tasks)
	}
}

func readTaskById(db *gorm.DB) func(c *gin.Context) {
	return func(c *gin.Context) {
		var task entity.Task
		id, err := strconv.Atoi(c.Param("id"))
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": err.Error(),
			})
		}
		if err := db.Table("task").Where("id = ?", id).First(&task).Error; err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": err.Error(),
			})
			return
		}
		c.JSON(http.StatusOK, task)
	}
}

func editTaskById(db *gorm.DB) func(c *gin.Context) {
	return func(c *gin.Context) {
		var data entity.TaskUpdate
		id, err := strconv.Atoi(c.Param("id"))
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": err.Error(),
			})
		}
		if err := c.ShouldBind(&data); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": err.Error(),
			})
			return
		}
		if err := db.Table("users").Where("id = ?", id).Updates(&data).Error; err != nil {
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
