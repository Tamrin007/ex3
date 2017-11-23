package main

import (
	"fmt"
	"net/http"
	"os"
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

	r.POST("/:name/:num", func(c *gin.Context) {
		name := c.Param("name")
		num := c.Param("num")
		data, err := c.GetRawData()
		if err != nil {
			fmt.Fprintln(os.Stderr, err)
			return
		}

		p, err := filepath.Abs(filepath.Join("result", name, num))
		if err != nil {
			fmt.Fprintln(os.Stderr, err)
			return
		}

		err = os.MkdirAll(p, os.ModePerm)
		if err != nil {
			fmt.Fprintln(os.Stderr, err)
			return
		}

		f, err := os.Create(filepath.Join(p, "result.json"))
		if err != nil {
			fmt.Fprintln(os.Stderr, err)
			return
		}
		defer f.Close()
		f.Write([]byte(data))

		c.String(http.StatusOK, string(data))
	})

	r.Run(":8080")
}
