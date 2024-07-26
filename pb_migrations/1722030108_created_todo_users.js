/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "i64uglu4r4aa4in",
    "created": "2024-07-26 21:41:48.781Z",
    "updated": "2024-07-26 21:41:48.781Z",
    "name": "todo_users",
    "type": "auth",
    "system": false,
    "schema": [],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {
      "allowEmailAuth": true,
      "allowOAuth2Auth": true,
      "allowUsernameAuth": true,
      "exceptEmailDomains": null,
      "manageRule": null,
      "minPasswordLength": 8,
      "onlyEmailDomains": null,
      "onlyVerified": false,
      "requireEmail": false
    }
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("i64uglu4r4aa4in");

  return dao.deleteCollection(collection);
})
