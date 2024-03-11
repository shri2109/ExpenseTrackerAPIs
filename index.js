const express = require('express')
const mongoose = require('mongoose')
/** 
 * Expense Tracker
 * 
 * Adding a new expense -> /add-expense
 * post : expenses details
 * 
 * displaying existing records -> /get-expenses
 * get
 * 
 * delete an expense -> /delete-expense
 * post : id of the entry
 * 
 * updating an existing an one -> update-expense
 * post : id of the entry, expenses details
*/

/**
 * Database Schema
 * amount, category, date
 */

const app = express()

async function connectToDb() {
    try {
        await mongoose.connect('mongodb+srv://shri:1234@cluster0.ojhi76l.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
        console.log('DB connection established ;)')
        app.listen(8000, function() {
            console.log('Listening on port 4000...')
        })
    } catch(error) {
        console.log(error)
        console.log('Cloudn\'t establish connection :(')
    }
}
connectToDb()
