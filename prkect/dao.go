package main

/* Importamos las dependencias */
import (
	"fmt"
	"database/sql"
	"amqp"
	"log"
	_"go-sql-driver/mysql"

)


/* Declaramos la variable global con la conexión a la BBDD */
var db *sql.DB


func failOnError(err error, msg string) {
	if err != nil {
		log.Fatalf("%s: %s", msg, err)
	}
}

func main() {

	var registro string
	var err error

	/* BBDD */
	db, err = sql.Open("mysql", "root:@/test")
	if err != nil {
		panic(err)
	}

	// Execute the query
	results, err := db.Query("SELECT titulo FROM videos WHERE id_genero = 1")
	if err != nil {
		panic(err.Error())
	}

	for results.Next() {
		var titulo string
		err = results.Scan(&titulo)

		
		if err != nil {
			panic(err.Error())
		}
		registro = registro + ";" + titulo
		fmt.Printf(registro)
	}


	/* INIT RABBIT */
	fmt.Println ( "Conectando a RabbitMQ ..." )
	conn, err := amqp.Dial("amqp://admin:Password123@159.65.220.217:5672")
	failOnError(err, "Failed to connect to RabbitMQ")
	defer conn.Close()

	ch, err := conn.Channel()
	failOnError(err, "Failed to open a channel")
	defer ch.Close()

	q, err := ch.QueueDeclare(
		"comedias", // name
		false,   // durable
		false,   // delete when unused
		false,   // exclusive
		false,   // no-wait
		nil,     // arguments
	)
	failOnError(err, "Failed to declare a queue")
	
	body := registro
	err = ch.Publish(
		"",     // exchange
		q.Name, // routing key
		false,  // mandatory
		false,  // immediate
		amqp.Publishing {
			ContentType: "text/plain",
			Body:        []byte(body),
		})
	log.Printf(" [x] Sent %s", body)
	failOnError(err, "Failed to publish a message")

	/* FIN RABBIT */
}
