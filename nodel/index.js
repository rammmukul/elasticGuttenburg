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

      let res = await client.cat.indices()
      if (!res || (res.includes instanceof Function && !res.includes('books'))) {
        console.log('putting Books')
        await execFile('./putDocs')
          .then(res => console.log(Object.keys(res)))
          .catch(res => console.error(res.cmd, res.stderr))
      }
    }
  })
}, 10000)
