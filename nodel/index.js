const elasticsearch = require('elasticsearch')
const client = new elasticsearch.Client({
  host: 'elasticsearch:9200',
  log: 'trace'
})

const util = require('util')
const execFile = util.promisify(require('child_process').execFile)

let pinger = setInterval(() => {
  client.ping({
    requestTimeout: 1000
  }, async function (error) {
    if (error) {
      console.trace('elasticsearch cluster is down!')
    } else {
      console.log('All is well')
      clearTimeout(pinger)

      let res = client.cat.indices()
      console.log(res)
      if (res && res.includes('books')) {
        const { stdout } = await execFile('./putDocs', [])
        console.log(stdout)
      }
    }
  })
}, 10000)
