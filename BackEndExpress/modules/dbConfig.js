const db = require("monk")(process.env.DB);
const trash = db.get("trash");

//Add data in Collection
async function addData(collectionName, data) {
  const collection = db.get(collectionName);
  await collection.insert(data);
}

//Get all data in Collection
async function getData(collectionName, projection = null, skip = 0, limit = null) {
  const collection = db.get(collectionName);
  const count = await collection.count();
  let data = await collection.find({}, { projection, sort: { date: -1 }, limit, skip });
  return { data, count };
}

//Search on Collection
async function searchData(collectionName, data, count = null, projection = null, skip = 0, limit = null) {
  const collection = db.get(collectionName);
  if (count) count = await collection.count(data);
  else count = 0;
  let result = await collection.find(data, { projection, sort: { date: -1 }, limit, skip });
  return { data: result, count };
}

//Remove data from Collection
async function removeData(collectionName, id) {
  const collection = db.get(collectionName);
  collection.remove({ _id: id });
}

//Expire a document after some time
trash.createIndex({ createdAt: 1 }, { expireAfterSeconds: 604800 }); //One Week
async function addToTrash(data) {
  await trash.insert({
    data: data,
  });
}

module.exports = { addData, getData, searchData, removeData, addToTrash };
