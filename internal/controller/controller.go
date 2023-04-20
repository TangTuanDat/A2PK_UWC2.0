package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func NewExampleController(g *gin.Engine, path string) {
	router := g.Group(path)
	router.GET("/get", ExampleController)
}

func ExampleController(ctx *gin.Context) {
	ctx.JSON(http.StatusOK, gin.H{"message": "can't"})
}
