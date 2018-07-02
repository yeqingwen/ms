let mdl = require('../src')
let client = mdl.client
let MS = require('jm-ms-core')
let ms = new MS()

describe('client', () => {
  test('client', async () => {
    let $ = await client({uri: 'ws://gateway.test.jamma.cn'})
    await $.onReady()
    let doc = await $.request('/acl')
    console.log(doc)
    expect(doc).toBeTruthy()
  })

  test('module', async () => {
    ms.use(mdl)
    let $ = await ms.client({uri: 'ws://gateway.test.jamma.cn'})
    await $.onReady()
    let doc = await $.request('/acl')
    console.log(doc)
    expect(doc).toBeTruthy()
  })
})
