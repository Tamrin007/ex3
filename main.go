package main

import (
	"net/http"
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

	r.LoadHTMLGlob("./templates/*")
	r.GET("/:name/:num", func(c *gin.Context) {
		name := c.Param("name")
		num := c.Param("num")
		c.HTML(http.StatusOK, "video.tmpl", gin.H{
			"num":  num,
			"name": name,
		})
	})

	r.Run(":8080")
}
