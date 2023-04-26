package main

import (
	"encoding/json"
	"fmt"
	"github.com/gin-gonic/gin"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"log"
	"net/http"
	"strconv"
	"time"
)

type User struct {
	UserID      int    `json:"user_id" gorm:"column:user_id;"`
	Username    string `json:"username" gorm:"collumn:username;"`
	FirstName   string `json:"first_name" gorm:"collumn:first_name;"`
	LastName    string `json:"last_name" gorm:"collumn:last_name;"`
	Role        string `json:"role" gorm:"collumn:role;"`
	IsAvailable bool   `json:"is_available" gorm:"column:is_available;"`
}
type UserCreation struct {
	Username  string `json:"username" gorm:"collumn:username;"`
	FirstName string `json:"first_name" gorm:"collumn:first_name;"`
	LastName  string `json:"last_name" gorm:"collumn:last_name;"`
	Role      string `json:"role" gorm:"collumn:role;"`
}

func (UserCreation) TableName() string { return "users" }

type UserUpdate struct {
	IsAvailable *bool `json:"is_available" gorm:"is_available;"`
}

func (UserUpdate) TableName() string { return "users" }

type Vehicle struct {
	VehicleID int     `json:"vehicle_id" gorm:"column:vehicle_id;"`
	IsFree    bool    `json:"is_free" gorm:"column:is_free;"`
	Fuel      float64 `json:"fuel" gorm:"column:fuel;"`
	Capacity  float64 `json:"capacity" gorm:"column:capacity;"`
}

type Troller struct {
	TrollerID int     `json:"troller_id" gorm:"column:troller_id;"`
	IsFree    bool    `json:"is_free" gorm:"column:is_free;"`
	Capacity  float64 `json:"capacity" gorm:"column:capacity;"`
}

type MCP struct {
	MCPID    int     `json:"mcp_id" gorm:"column:mcp_id;"`
	Name     string  `json:"name" gorm:"column:name;"`
	Location string  `json:"location" gorm:"column:location;"`
	Capacity float64 `json:"capacity" gorm:"column:capacity;"`
	Used     float64 `json:"used" gorm:"column:used;"`
	IsFull   bool    `json:"is_full" gorm:"column:is_full;"`
}
type Task struct {
	TaskID           int        `json:"task_id" gorm:"task_id;"`
	FromUserID       int        `json:"from_user_id" gorm:"from_user_id;"`
	ToUserID         int        `json:"to_user_id" gorm:"to_user_id;"`
	Method           string     `json:"method" gorm:"method;"`
	CurrentWorkerLoc string     `json:"curr_worker_location" gorm:"curr_worker_location;"`
	MCPLocation      string     `json:"mcp_location" gorm:"mcp_location;"`
	Created_at       *time.Time `json:"created_at" gorm:"created_at;"`
	Completed_at     *time.Time `json:"complete_at,omitempty" gorm:"completed_at;"`
	Worker_role      string     `json:"worker_role" gorm:"worker_role;"`
}
type TaskCreation struct {
	FromUserID       int    `json:"from_user_id" gorm:"from_user_id;"`
	ToUserID         int    `json:"to_user_id" gorm:"to_user_id;"`
	Method           string `json:"method" gorm:"method;"`
	CurrentWorkerLoc string `json:"curr_worker_location" gorm:"curr_worker_location;"`
	MCPLocation      string `json:"mcp_location" gorm:"mcp_location;"`
	Worker_role      string `json:"worker_role" gorm:"worker_role;"`
}

func (TaskCreation) TableName() string { return "task" }

type TaskUpdate struct {
	Completed_at *time.Time `json:"complete_at,omitempty" gorm:"completed_at;"`
}

func (TaskUpdate) TableName() string { return "task" }

// CRUD
func main() {
	dsn := "root:uwc@tcp(127.0.0.1:3306)/uwc?charset=utf8mb4&parseTime=True&loc=Local"
	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatalln(err)
	}
	fmt.Println(db)
	fmt.Println("Hello")
	//now := time.Now().UTC()
	khang := User{
		UserID:      6,
		Username:    "kagtgi",
		FirstName:   "Ta",
		LastName:    "Khang",
		Role:        "Back Officer",
		IsAvailable: true,
	}
	jsonData, err := json.Marshal(khang)
	if err != nil {
		fmt.Println(err)
		return
	}
	fmt.Println(string(jsonData))
	jsonStr := "{\"user_id\":6,\"username\":\"kagtgi\",\"first_name\":\"Ta\",\"last_name\":\"Khang\",\"role\":\"Back Officer\",\"is_available\":true}"
	var khang2 User
	if err := json.Unmarshal([]byte(jsonStr), &khang2); err != nil {
		fmt.Println(err)
		return
	}

	router := gin.Default()

	v1 := router.Group("/v1")
	{
		v1.POST("/users", createUser(db))              // create user
		v1.POST("/tasks", createTask(db))              // create task
		v1.GET("/janitors", getListOfJanitors(db))     // list users
		v1.GET("/collectors", getListOfCollectors(db)) // list users
		v1.GET("/tasks", getListOfTasks(db))           // list tasks
		v1.GET("/vehicle", getListOfVehicle(db))
		v1.GET("/troller", getListOfTroller(db))
		v1.GET("/users/:id", readUserById(db)) // get an item by ID
		v1.GET("/tasks/:id", readTaskById(db)) // read tasks by id
		v1.PUT("/users/:id", editUserById(db)) // edit an item by ID
		v1.PUT("/tasks/:id", editTaskById(db)) // edit an item by ID
	}

	router.Run()
}
func createUser(db *gorm.DB) func(ctx *gin.Context) {
	return func(c *gin.Context) {
		var data UserCreation
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
func createTask(db *gorm.DB) func(ctx *gin.Context) {
	return func(c *gin.Context) {
		var data TaskCreation
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
func getListOfJanitors(db *gorm.DB) func(c *gin.Context) {
	return func(c *gin.Context) {
		var janitors []User
		if err := db.Table("users").Order("id desc").Where("role = ?", "Janitor").Find(&janitors).Error; err != nil {
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
		var collectors []User
		if err := db.Table("users").Where("role = ?", "Collector").Find(&collectors).Error; err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": err.Error(),
			})
			return
		}
		c.JSON(http.StatusOK, collectors)
	}
}
func getListOfTasks(db *gorm.DB) func(c *gin.Context) {
	return func(c *gin.Context) {
		var tasks []Task
		if err := db.Table("task").Find(&tasks).Error; err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": err.Error(),
			})
			return
		}
		c.JSON(http.StatusOK, tasks)
	}
}
func getListOfVehicle(db *gorm.DB) func(c *gin.Context) {
	return func(c *gin.Context) {
		var vehicles []Vehicle
		if err := db.Table("vehicle").Find(&vehicles).Error; err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": err.Error(),
			})
			return
		}
		c.JSON(http.StatusOK, vehicles)
	}
}

func getListOfTroller(db *gorm.DB) func(c *gin.Context) {
	return func(c *gin.Context) {
		var trollies []Troller
		if err := db.Table("troller").Find(&trollies).Error; err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": err.Error(),
			})
			return
		}
		c.JSON(http.StatusOK, trollies)
	}
}
func readUserById(db *gorm.DB) func(c *gin.Context) {
	return func(c *gin.Context) {
		var user User
		id, err := strconv.Atoi(c.Param("id"))
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": err.Error(),
			})
		}
		if err := db.Table("users").Where("id = ?", id).First(&user).Error; err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": err.Error(),
			})
			return
		}
		c.JSON(http.StatusOK, user)
	}
}

func readTaskById(db *gorm.DB) func(c *gin.Context) {
	return func(c *gin.Context) {
		var task Task
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
func editUserById(db *gorm.DB) func(c *gin.Context) {
	return func(c *gin.Context) {
		var user UserUpdate
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
		if err := db.Table("users").Where("id = ?", id).Updates(&user).Error; err != nil {
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
func editTaskById(db *gorm.DB) func(c *gin.Context) {
	return func(c *gin.Context) {
		var data TaskUpdate
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
