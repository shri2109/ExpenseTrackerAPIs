const bodyParser = require('body-parser')
const express = require('express')
const mongoose = require('mongoose')
const { Expense } = require('./schema.js')
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

/**
 * 200 - ok
 * 201 - created
 * 401 - unauthorized
 * 404 - page not found
 * 500 - internal server error
 */

const app = express()
app.use(bodyParser.json())

async function connectToDb() {
    try {
        await mongoose.connect('mongodb+srv://shri:1234@cluster0.ojhi76l.mongodb.net/ExpenseTracker?retryWrites=true&w=majority&appName=Cluster0')
        console.log('DB connection established ;)')
        app.listen(8000, function() {
            console.log('Listening on port 8000...')
        })
    } catch(error) {
        console.log(error)
        console.log('Cloudn\'t establish connection :(')
    }
}
connectToDb()

app.post('/add-expense', async function(request, response) {
    try {
        await Expense.create({
            "amount" : request.body.amount,
            "category" : request.body.category,
            "date" : request.body.date
        })
        response.status(201).json({
            "status" : "success",
            "message" : "entry created"
        })
    } catch(error) {
        response.status(500).json({
            "status" : "failure",
            "message" : "entry not created",
            "error" : error
        })
    }
})

app.get('/get-expenses', async function(request, response) {
    try {
        const expenseDetails = await Expense.find()
        response.status(200).json(expenseDetails)
    } catch(error) {
        response.status(500).json({
            "status" : "failure",
            "message" : "could not fetch data",
            "error" : error
        })
    }
})
