module.exports = {
  host: checkout(process.env.dbhost, 'dev'),
  bootWithDB: false, // if set to "true", will return an error runtime wasn't able to connect to database
  options: {
    dev: {
      url: checkout(process.env.dbConStringDev, 'mongodb://localhost:27017/'),
      db: checkout(process.env.databaseName, 'resman'),
      params: '?authSource=admin',
      options: {
          useNewUrlParser: true,
          useUnifiedTopology: true
      }
    },
    local: {
      url: checkout(process.env.dbConStringLocal),
      db: checkout(process.env.databaseName),
      options: {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }
    }
  }
}