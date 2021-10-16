module.exports = {
  host: checkout(process.env.dbhost, 'dev'),
  bootWithDB: false,
  options: {
    dev: {
      url: checkout(process.env.dbConStringDev, 'mongodb://monkeydobus:KamoteQue123@34.126.130.234:27017/'),
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