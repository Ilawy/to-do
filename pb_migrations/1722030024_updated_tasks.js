/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("fpsh6vez66z7vfj")

  collection.name = "todo_tasks"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("fpsh6vez66z7vfj")

  collection.name = "tasks"

  return dao.saveCollection(collection)
})
