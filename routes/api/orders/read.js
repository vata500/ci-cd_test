'use strict'

module.exports = async function (fastify, opts) {
  fastify.get('/', async function (req, reply) {
    const order = this.mongo.db.collection('order')
    const cursor = order.find()
    return cursor.toArray()
  })
}