/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("fpsh6vez66z7vfj")

  collection.listRule = "@request.auth.id = owner.id && owner.verified = true"
  collection.viewRule = "@request.auth.id = owner.id && owner.verified = true"
  collection.createRule = "@request.auth.id = owner.id && owner.verified = true"
  collection.updateRule = "@request.auth.id = owner.id && owner.verified = true"
  collection.deleteRule = "@request.auth.id = owner.id && owner.verified = true"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("fpsh6vez66z7vfj")

  collection.listRule = "@request.auth.id = owner.id"
  collection.viewRule = "@request.auth.id = owner.id"
  collection.createRule = "@request.auth.id = owner.id"
  collection.updateRule = "@request.auth.id = owner.id"
  collection.deleteRule = "@request.auth.id = owner.id"

  return dao.saveCollection(collection)
})
