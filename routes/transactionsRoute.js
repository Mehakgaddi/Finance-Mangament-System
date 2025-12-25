const express = require('express')
var moment = require('moment');
const Transaction = require('../models/Transaction')
const router = express.Router()


router.post('/add-transaction', async function (req, res) {

    try {
        console.log('Adding transaction:', req.body)
        const newtransaction = new Transaction(req.body);
        await newtransaction.save();
        console.log('Transaction saved successfully:', newtransaction)
        res.send('Transaction added successfully')

    } catch (error) {
        console.error('Error adding transaction:', error.message)
        res.status(500).json({ message: 'Error adding transaction: ' + error.message })
    }
})

router.post('/edit-transaction', async function (req, res) {

    try {

        await Transaction.findOneAndUpdate({ _id: req.body.transactionId }, req.body.payload)
        res.send('Transaction updated successfully')

    } catch (error) {
        res.status(500).json({ message: 'Error updating transaction' })
    }
})

router.post('/delete-transaction', async function (req, res) {

    try {

        await Transaction.findOneAndDelete({ _id: req.body.transactionId })
        res.send('Transaction updated successfully')

    } catch (error) {
        res.status(500).json({ message: 'Error deleting transaction' })
    }
})

router.post('/get-all-transactions', async (req, res) => {
    const { frequency, selectedRange, type } = req.body
    try {
        console.log('Fetching transactions with:', req.body)
        const transactions = await Transaction.find({
            ...(frequency !== 'custom' ? {
                date: {
                    $gt: moment().subtract(Number(req.body.frequency), 'd').toDate(),
                },
            } : {
                date: {
                    $gte: selectedRange[0],
                    $lte: selectedRange[1],
                }
            }),
            userid: req.body.userid,
            ...(type !== 'all' && { type })
        })
        console.log('Found transactions:', transactions.length)
        res.send(transactions)
    } catch (error) {
        console.error('Error fetching transactions:', error.message)
        res.status(500).json({ message: 'Error fetching transactions: ' + error.message })
    }
})

module.exports = router;