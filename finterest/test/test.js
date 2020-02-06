const assert = require('assert')
const request = require('supertest')
const app = require('../src/index')

describe("Express app", () => {
    it("Handle GET request /api/greeting", done => {
        request(app)
            .get('/')
            .end((err, response) => {
                assert(response.body.greeting == 'HI')
                done()
            })
    })
})