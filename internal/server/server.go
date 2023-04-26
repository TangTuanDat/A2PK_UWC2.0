package server

import (
	"A2PK_UWC2.0/internal/controller"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type Server interface {
	Start() error
	Stop() error
	RegisterEndpoint(*gorm.DB)
}

type server struct {
	gin  *gin.Engine
	port string
}

func NewServer(port string) Server {
	return &server{
		gin:  gin.Default(),
		port: port,
	}
}

func (s *server) Start() error {
	return s.gin.Run(s.port)
}

func (s *server) Stop() error {
	return nil
}

func (s *server) RegisterEndpoint(db *gorm.DB) {
	controller.NewTaskController(s.gin, db)
	controller.NewUserController(s.gin, db)
	controller.NewTrollerController(s.gin, db)
	controller.NewVehicleController(s.gin, db)
}
