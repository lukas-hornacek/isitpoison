import express from 'express'

export const canteen_router = express.Router()

// get list of all canteens
canteen_router.get('/', (_req, res) => {
    res.status(418).send('Not implemented yet')
})

// add a new canteen
canteen_router.post('/', (_req, res) => {
    res.status(418).send('Not implemented yet')
})

// modify an existing canteen 
canteen_router.put('/', (_req, res) => {
    res.status(418).send('Not implemented yet')
})

// delete an existing canteen
canteen_router.delete('/', (_req, res) => {
    res.status(418).send('Not implemented yet')
})
