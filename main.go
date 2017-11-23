package main

import (
	"path/filepath"

	"github.com/gin-contrib/static"
	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()

	public, err := filepath.Abs("./public")
	if err != nil {
		return
	}
	r.Use(static.Serve("/", static.LocalFile(public, true)))

	r.Run(":8080")
}
