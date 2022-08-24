'use strict'

module.exports = async function (fastify, opts) {

  fastify.get('/', async function (req, reply) {
    const restaurants = this.mongo.db.collection('restaurants')
    const cursor = restaurants.find()
    return cursor.toArray()
  })

}
