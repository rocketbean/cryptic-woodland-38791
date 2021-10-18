module.exports = {
  host: checkout(process.env.dbhost, 'dev'),

  /**
   * if [bootWithDB] property is enabled,
   * it will return an error, 
   * if the runtime is not able to connect
   * on the specified DB.
   * [error will break the chasi instance startup]
   */

  bootWithDB: false,  
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