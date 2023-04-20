package main

import "A2PK_UWC2.0/internal/server"

func main() {
  server := server.NewServer("localhost:8080")
  server.RegisterEndpoint("/api")
  server.Start()
}
