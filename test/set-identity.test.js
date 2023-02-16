// import fs from 'fs'
// import assert from 'assert'
// import rmrf from 'rimraf'
// import OrbitDB from '../src/OrbitDB.js'
// import Identities from 'orbit-db-identity-provider'
// import Keystore from 'orbit-db-keystore'
// import storageAdapter from 'orbit-db-storage-adapter'

// // Include test utilities
// import {
//   config,
//   startIpfs,
//   stopIpfs,
//   testAPIs,
// } from 'orbit-db-test-utils'

// const storage = storageAdapter()

// const keysPath = './orbitdb/identity/identitykeys'
// const dbPath = './orbitdb/tests/change-identity'

// Object.keys(testAPIs).forEach(API => {
//   describe(`orbit-db - Set identities (${API})`, function() {
//     this.timeout(config.timeout)

//     let ipfsd, ipfs, orbitdb, keystore, options
//     let identity1, identity2

//     before(async () => {
//       rmrf.sync(dbPath)
//       ipfsd = await startIpfs(API, config.daemon1)
//       ipfs = ipfsd.api

//       if(fs && fs.mkdirSync) fs.mkdirSync(keysPath, { recursive: true })
//       const identityStore = await storage.createStore(keysPath)

//       keystore = new Keystore(identityStore)
//       identity1 = await Identities.createIdentity({ id: 'test-id1', keystore })
//       identity2 = await Identities.createIdentity({ id: 'test-id2', keystore })
//       orbitdb = await OrbitDB.createInstance(ipfs, { directory: dbPath })
//     })

//     after(async () => {
//       await keystore.close()
//       if(orbitdb)
//         await orbitdb.stop()

//       if (ipfsd)
//         await stopIpfs(ipfsd)
//     })

//     beforeEach(async () => {
//       options = {}
//       options.accessController = {
//         write : [
//           orbitdb.identity.id,
//           identity1.id
//         ]
//       }
//       options = Object.assign({}, options, { create: true, type: 'eventlog', overwrite: true })
//     })

//     it('sets identity', async () => {
//       const db = await orbitdb.open('abc', options)
//       assert.equal(db.identity, orbitdb.identity)
//       db.setIdentity(identity1)
//       assert.equal(db.identity, identity1)
//       await db.close()
//     })

//     it('writes with new identity with access', async () => {
//       const db = await orbitdb.open('abc', options)
//       assert.equal(db.identity, orbitdb.identity)
//       db.setIdentity(identity1)
//       assert.equal(db.identity, identity1)
//       let err
//       try {
//         await db.add({ hello: '1'})
//       } catch (e) {
//         err = e.message
//       }
//       assert.equal(err, null)
//       await db.drop()
//     })

//     it('cannot write with new identity without access', async () => {
//       const db = await orbitdb.open('abc', options)
//       assert.equal(db.identity, orbitdb.identity)
//       db.setIdentity(identity2)
//       assert.equal(db.identity, identity2)
//       let err
//       try {
//         await db.add({ hello: '1'})
//       } catch (e) {
//         err = e.message
//       }
//       assert.equal(err, `Could not append entry, key "${identity2.id}" is not allowed to write to the log`)
//       await db.drop()
//     })
//   })
// })
