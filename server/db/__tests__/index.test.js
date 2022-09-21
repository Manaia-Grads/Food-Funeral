
const knex = require('knex')
const config = require('../knexfile').test
const testDb = knex(config)

const db = require('../index')

beforeAll(() => {
  return testDb.migrate.latest()
})

beforeEach(() => {
  return testDb.seed.run()
})
afterAll(() => {
  return testDb.destroy()
})

describe('getAllPosts function', () => {
  it('returns all posts as an array of obj',()=>{
    return db.getAllPosts(testDb).then((array)=>{
      expect(array).toHaveLength(3)
      expect(array[0].title).toBe('I ate a cow')
    })
  })
})

