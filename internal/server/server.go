package server

import (
	"A2PK_UWC2.0/internal/controller"
	"github.com/gin-gonic/gin"
)

type Server interface {
	Start() error
	Stop() error
	RegisterEndpoint(string)
}

type server struct {
	gin  *gin.Engine
	port string
}

func NewServer(port string) Server {
	return &server{
		port: port,
		gin:  gin.Default(),
	}
}

func (s *server) Start() error {
	return s.gin.Run(s.port)
}

func (s *server) Stop() error {
	return nil
}

func (s *server) RegisterEndpoint(path string) {
	controller.NewExampleController(s.gin, path)
}
