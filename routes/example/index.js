'use strict'

module.exports = async function (fastify, opts) {
  fastify.get('/', async function (request, reply) {
    const collection = this.mongo.db.collection("order")
    const result = await collection.find({}).toArray()
    return result
  })
}
