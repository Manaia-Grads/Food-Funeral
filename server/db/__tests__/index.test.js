const knex = require('knex')
const testConfig = require('../knexfile').test
const testDb = knex(testConfig)

const { getPostById } = require('../index')

beforeAll(() => {
  return testDb.migrate.latest()
})

beforeEach(() => {
  return testDb.seed.run()
})

afterAll(() => {
  return testDb.destroy()
})

describe('getPostById', () => {
  it('gets the post by its Id from the database.', () => {
    return getPostById(1, testDb).then((postData) => {
      expect(postData).toHaveLength(1)
      expect(postData[0].content).toBe(
        'this is a very long string that can be changed later'
      )
    })
  })
})
