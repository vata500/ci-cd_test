
'use strict'

module.exports = async function (fastify, opts) {
    fastify.post('/', async function (req, reply) {
        const order = this.mongo.db.collection('order')

        const restaurants = this.mongo.db.collection('restaurants')
        const restaurant = await restaurants.findOne({ '_id': this.mongo.ObjectId(req.body.restaurantId) })
        const orderedMenu = req.body.menu.map(m => {
            const { name, price } = m
            return {
                name,
                price,
                quantity: 1
            }
        })

        const orderItem = {
            restaurant: {
                name: restaurant.name,
                address: restaurant.address
            },
            deliveryInfo: {
                status: "preparing",
                assignedCourier: "박배송",
                estimatedDeleveryTime: 40
            },
            orderedMenu
        }

        await order.insertOne(orderItem)
        return orderItem
    })
}