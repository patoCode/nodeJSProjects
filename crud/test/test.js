const Task = require("../src/models/Task")
const request = require("supertest")
const { expect } = require("chai")
const app = require("../src/app")

describe("INIT TEST", () => {
    beforeEach(async () => {
        await Task.deleteMany({})
    })

    describe("GET /", () => {
        it("should return all task", async () => {
            const tasks = [
                { title: "test", description: "test@gmail.com" },
                { title: "test1", description: "test1@gmail.com" }
            ]
            await Task.insertMany(tasks)
            console.log(tasks)
            const res = await request(app).get("/all")
            expect(res.status).to.equal(200)
            expect(res.body.length).to.equal(2)
        })
    })

    describe("GET/:id", () => {
        it("GET TASK BY ID", async () => {
            const task = new Task({
                title: "test",
                description: "test@gmail.com"
            })
            await task.save()
            const res = await request(app).get("/task/turn/" + task._id)
            expect(res.status).to.equal(200)
            expect(res.body).to.have.property("title", task.title)
        })

        it("INVALID ID PASSED", async () => {
            const res = await request(app).get("/task/turn/1")
            expect(res.status).to.equal(400)
        })

        it("NOT EXISTS", async () => {
            const res = await request(app).get("/task/turn/111111111111")
            expect(res.status).to.equal(404)
        })
    })

    describe("POST /", () => {
        it("should return user when the all request body is valid", async () => {
            const newTask = {
                title: "test",
                description: "test@gmail.com"
            }
            const res = await request(app)
                .post("/task/add")
                .send(newTask)
            console.log(res.body)
            expect(res.status).to.equal(200)
            expect(res.body).to.have.property("_id")
            expect(res.body).to.have.property("title", "test")
        })

    })

    describe("DELETE /:id", () => {
        it("should delete requested id and return response 200", async () => {
            const task = new Task({
                title: "test",
                description: "test@gmail.com"
            })
            await task.save()

            const res = await request(app).get("/task/delete/" + task._id)
            expect(res.status).to.be.equal(200)
        })

        it("should return 404 when deleted user is requested", async () => {
            const task = new Task({
                title: "test",
                description: "test@gmail.com"
            })
            await task.save()

            let res = await request(app).get("/task/delete/" + task._id)
            expect(res.status).to.be.equal(200)

            res = await request(app).get("/task/turn/" + task._id)
            expect(res.status).to.be.equal(404)
        })
    })
})