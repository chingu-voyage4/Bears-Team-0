const mongodb       = require("mongodb");
const mongoClient   = require("mongodb").MongoClient;
const util          = require('util')
const config        = require('../../config')
const User          = require('./User')

const log   = require('debug')('api:mongodb-user')
const error = require('debug')('api:error')

let db;

const MONGO_URL         = config.MONGO_USERS_URL;
const DATABASE_NAME     = config.MONGO_USERS_DBNAME;
const COLLECTION_NAME   = 'users'

/*
DB Connection Handler
If connected returns connection else grabs connection from mLab
*/
exports.connectDb = function connectDb () {
    return new Promise((resolve, reject) => {
        if (db) return resolve(db)
        mongoClient.connect(MONGO_URL, (err, _db) => {
            if (err) return reject(err)
            db = _db.db(DATABASE_NAME)
            log('Mongo connected ' + util.inspect(db.databaseName))
            resolve(db)
        })
    })
}

exports.read = function read(key) {
    return exports.connectDb().then(_db => {
        let collection = _db.collection(COLLECTION_NAME)
        let objectID = new mongodb.ObjectId(key)
        return collection.findOne({_id: objectID})
            .then(doc => {
                const user = new User(
                    doc.username
                )
                log(`User found ${util.inspect(user)}`)
                return user
            })
    })
}

exports.create = function create(user) {
    return exports.connectDb().then(_db => {
        let collection = _db.collection(COLLECTION_NAME)
        let newUser = new User(user.username, user.roles, user.password)
        return newUser.encryptPw().then(() => {
            log('Mongo new user: ' + util.inspect(newUser))
            return collection.insertOne(newUser).then(result => {
                log('Mongo new user inserted: ' + util.inspect(result.ops[0]))
                return {result: result.ops[0], result_id: result.insertedId}
            })
        })

    })
}

exports.readAll = function readAll() {
    return exports.connectDb().then(_db => {
        let collection = _db.collection(COLLECTION_NAME)
        return collection.find().toArray().then(data => {
            return data
        })
    })
}
