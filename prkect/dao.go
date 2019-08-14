package main

/* Importamos las dependencias */
import (
	"database/sql"
	"log"
		_"github.com/go-sql-driver/mysql"		
)




/* Declaramos la variable global con la conexión a la BBDD */
var db *sql.DB

func main() {


	var err error

	/* Nos conectamos a la BBDD */
	db, err = sql.Open("mysql", "root:@/test")
	if err != nil {
		panic(err)
	}

	// Execute the query
	results, err := db.Query("SELECT titulo FROM videos")
	if err != nil {
		panic(err.Error()) // proper error handling instead of panic in your app
	}

	for results.Next() {

		var titulo string
		// for each row, scan the result into our tag composite object
		err = results.Scan(&titulo)
		if err != nil {
			panic(err.Error()) // proper error handling instead of panic in your app
		}
		// and then print out the tag's Name attribute
		log.Printf(titulo)
	}
}
