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

describe('getPostById', () => {
  it('gets the post by its Id from the database.', () => {
    return db.getPostById(1, testDb).then((postData) => {
      expect(postData.content).toBe(
        'this is a very long string that can be changed later'
      )
    })
  })
})

describe('getAllPosts function', () => {
  it('returns all posts as an array of obj', () => {
    return db.getAllPosts(testDb).then((array) => {
      expect(array).toHaveLength(3)
      expect(array[0].title).toBe('I ate a cow')
    })
  })
})

describe('addPost', () => {
  it('adds a post to the database', () => {
    return db
      .addPost(
        {
          id: 4,
          title: 'test',
          date: '2022-09-22',
          content: 'test',
          image: 'tomato.png',
          auth0_id: 1,
          date_created: '2022-09-22',
        },
        testDb
      )
      .then((ids) => {
        expect(ids).toStrictEqual([4])
        return db.getPostById(ids[0], testDb)
      })
      .then((post) => {
        expect(post.title).toBe('test')
        expect(post.img).toBe('tomato.png')
      })
  })
})
