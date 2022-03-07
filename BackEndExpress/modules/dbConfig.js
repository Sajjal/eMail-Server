const db = require("monk")(process.env.DB);
const trash = db.get("trash");
const expiredTokens = db.get("expiredTokens");


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

//Update data in Collection
async function updateData(collectionName, id, data) {
    const collection = db.get(collectionName);
    await collection.update({ _id: id }, { $set: data });
    return;
}

//Remove data from Collection
async function removeData(collectionName, id) {
    const collection = db.get(collectionName);
    collection.remove({ _id: id });
}

//Expire a document after some time
trash.createIndex({ createdAt: 1 }, { expireAfterSeconds: 604800 }); //One Week:604800

//Expire a document after some time
expiredTokens.createIndex({ insertedAT: 1 }, { expireAfterSeconds: 7200 }); // Two Hours: 7200
async function expiredToken(token) {
    await expiredTokens.insert({
        insertedAT: new Date(),
        token: token,
    });
}

module.exports = { addData, getData, searchData, updateData, removeData, expiredToken };