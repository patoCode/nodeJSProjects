package DAO

import (
	"encoding/json"
	"fmt"
	_"strings"
	"log"
	//"github.com/streadway/amqp"
	"amqp"
	"database/sql"	
	_"go-sql-driver/mysql"
	// CUSTOM
	_"DAO/JsonVideo"
	_"DAO/Video"
)
/* DATOS MI APP - VIDEO*/


/* Declaramos la variable global con la conexión a la BBDD */
var db *sql.DB


func failOnError(err error, msg string) {
	if err != nil {
		log.Fatalf("%s: %s", msg, err)
	}
}

func main() {
	//var registro Video
	var err error
	var video_list []Video

	/* BBDD */
	db, err = sql.Open("mysql", "root:@/test")
	if err != nil {
		panic(err)
	}

	var titulo, anio, duracion, genero, tags, protagonista, controlParental, director []byte
	results, err := db.Query("SELECT titulo, anio, duracion,g.nombre as genero, tags, protagonista, controlParental, director FROM videos v JOIN genero g on g.id =  v.id_genero WHERE v.id_genero = 1")
	if err != nil {
		panic(err.Error())
	}
	
	for results.Next() {		
		err = results.Scan(&titulo, &anio, &duracion, &genero, &tags, &protagonista, &controlParental, &director)
		if err != nil {
			panic(err.Error())
		}
		video_reg := Video{
			Titulo: string(titulo),
			Anio: string(anio),
			Duracion: string(duracion),
			Tags: string(tags),
			Protagonista: string(protagonista),
			Control: string(controlParental),
			Director : string(director),
			Genero : string(genero),
		}
		video_list = append(video_list, video_reg)		
	}

	lista := Lista{
		IdList: "COMEDIA",
		VideosList: video_list,
	}
	crear_json, _ := json.Marshal(lista)
	cadena_body := string(crear_json)
	//fmt.Println(convertir_a_cadena)

}
