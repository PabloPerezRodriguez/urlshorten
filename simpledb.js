const fs = require('fs').promises

class SimpleDB {
  constructor (file) {
    this.file = file
    this.data = {}
  }

  async set (item, val) {
    this.data[item] = val
    await this.save()
  }
  get (item) {
    return this.data[item]
  }
  async del (item) {
    delete this.data[item]
    await this.save()
  }

  async save () {
    await fs.writeFile(this.file, JSON.stringify(this.data), 'utf-8')
  }
  async load () {
    try {
      this.data = JSON.parse(await fs.readFile(this.file, 'utf-8'))
    } catch (e) {
      if (e.code === 'ENOENT') {
        await this.save()
      } else {
        throw e
      }
    }
  }
}

module.exports = SimpleDB
