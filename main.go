package main

import (
	"log"

	"A2PK_UWC2.0/internal/server"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

func main() {
	// connect to database
	dsn := "root:uwc@tcp(127.0.0.1:3306)/uwc?charset=utf8mb4&parseTime=True&loc=Local"
	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatalln(err)
	}
	// server
	server := server.NewServer("localhost:8080")
	server.RegisterEndpoint(db)
	server.Start()
}
