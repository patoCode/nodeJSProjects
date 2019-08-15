package main
import (
	"encoding/json"
	"fmt"
	_"strings"
	"log"	
	"amqp"	
	"database/sql"	
	_"go-sql-driver/mysql"
)

/* STRUCT DE DATOS MI APP - VIDEO, LIST*/

type Video struct {
	Titulo string
	Anio string
	Duracion string
	Tags string
	Protagonista string
	Control string
	Director string
	Genero string
}

type Lista struct{
	IdList string
	VideosList []Video
}



var db *sql.DB
func failOnError(err error, msg string) {
	if err != nil {
		log.Fatalf("%s: %s", msg, err)
	}
}

func main() {
	var err error
	var video_list []Video

	/* BBDD */
	db, err = sql.Open("mysql", "root:@/test")
	if err != nil {
		panic(err)
	}

	/* COMEDIAS */
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
	/* END COMEDIAS */


	/* ACCION */
	//var titulo, anio, duracion, genero, tags, protagonista, controlParental, director []byte
	results_accion, err := db.Query("SELECT titulo, anio, duracion,g.nombre as genero, tags, protagonista, controlParental, director FROM videos v JOIN genero g on g.id =  v.id_genero WHERE v.id_genero = 2")
	if err != nil {
		panic(err.Error())
	}
	
	for results_accion.Next() {		
		err = results_accion.Scan(&titulo, &anio, &duracion, &genero, &tags, &protagonista, &controlParental, &director)
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

	listaAcc := Lista{
		IdList: "ACCION",
		VideosList: video_list,
	}
	crear_json_accion, _ := json.Marshal(listaAcc)
	cadena_body_accion := string(crear_json_accion)
	/* END ACCION */


	/* END BBDD */

	/* INIT RABBIT */
	fmt.Println ( "Conectando a RabbitMQ ..." )
	conn, err := amqp.Dial("amqp://admin:Password123@159.65.220.217:5672")
	failOnError(err, "Failed to connect to RabbitMQ")
	defer conn.Close()

	ch, err := conn.Channel()
	failOnError(err, "Failed to open a channel")
	defer ch.Close()

	q, err := ch.QueueDeclare(
		"comedia", // name
		false,   // durable
		false,   // delete when unused
		false,   // exclusive
		false,   // no-wait
		nil,     // arguments
	)
	failOnError(err, "Failed to declare a queue")

	q_accion, err := ch.QueueDeclare(
		"accion", // name
		false,   // durable
		false,   // delete when unused
		false,   // exclusive
		false,   // no-wait
		nil,     // arguments
	)
	failOnError(err, "Failed to declare a queue")


	body := cadena_body
	body_accion := cadena_body_accion


	err = ch.Publish(
		"",     // exchange
		q.Name, // routing key
		false,  // mandatory
		false,  // immediate
		amqp.Publishing {
			DeliveryMode: amqp.Persistent,
			ContentType: "text/plain",
			Body:        []byte(body),
		})

	err = ch.Publish(
		"",     // exchange
		q_accion.Name, // routing key
		false,  // mandatory
		false,  // immediate
		amqp.Publishing {
			DeliveryMode: amqp.Persistent,
			ContentType: "text/plain",
			Body:        []byte(body_accion),
		})

	log.Println(" [x] Sent COMEDIA %s", body)
	log.Println(" [x] Sent ACTION %s", body_accion)
	failOnError(err, "Failed to publish a message")
	/* FIN RABBIT */



}
