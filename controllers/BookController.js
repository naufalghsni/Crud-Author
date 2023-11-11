const mysql = require('mysql2')
const dbConfig = require('../config/database')
const {
    responseNotFound,
    responseSuccess
} = require('../traits/ApiResponse')
const { connect } = require('../routes/author')
const pool = mysql.createPool(dbConfig)

const getBooks = (req, res) => {
    const query = "SELECT * FROM book"

    pool.getConnection((err, connection) => {
        if(err) throw err

        connection.query(query, (err, results) => {
            if(err) throw err
            
            responseSuccess(res, results, 'Books succesfully fetched')
        })

        connection.release()
    })
}

const getBook = ((req, res) => {
    const id = req.params.id

    const query = `SELECT * FROM book WHERE id=${id}`

    pool.getConnection((err,connection) => {
        if(err) throw err

        connection.query(query, (err, results) => {
            if(err) throw err

            if(results.length == 0){
                responseNotFound(res)
                return
            }
            responseSuccess(res, results, 'Book successfully fetcher')
        })

        connection.release()
    })
})

const addBook = (req,res) => {
    const data = {
        nama: req.body.nama,
        email: req.body.email,
        alamat: req.body.alamat,
        umur: req.body.umur,
        media_sosial: req.body.media_sosial
    }

    const query = 'INSERT INTO book SET ?'

    pool.getConnection((err, connection) => {
        if(err) throw err

        connection.query(query, [data], (err, results) => {
            if(err) throw err

            responseSuccess(res, results, 'Book successfully added')
        })

        connection.release()
    })
}

const updateBook = (req, res) => {
    const id = req.params.id

    const data ={
        nama: req.body.nama,
        author: req.body.author,
        publisher: req.body.publisher,
        year: req.body.year,
        page_count: req.body.page_count
    }

    const query = `UPDATE book SET ? WHERE id=${id}`

    pool.getConnection((err, connection) => {
        if(err) throw err

        connection.query(query, [data], (err, results) => {
            if(err) throw err

            if(results.affectedRows == 0){
                responseNotFound(res)
                return
            }

            responseSuccess(res, results, 'Book succcessully updated')
        })

        connection.release()
    })
}

const deleteBook = (req, res) => {
    const id = req.params.id 

    const query = `DELETE FROM book WHERE id=${id}`

    pool.getConnection((err, connection) => {
        if(err) throw err

        connection.query(query, (err, results) => {
            if(err) throw err

            if(results.affectedRows == 0) {
                responseNotFound(res)
                return
            }

            responseSuccess(res, results, 'Book successfully delete ')
        })
        connection.release()
    })
}


module.exports = {
    getBooks,
    getBook,
    addBook,
    updateBook,
    deleteBook
}