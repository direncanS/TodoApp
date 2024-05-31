const supertest = require("supertest");
const app = require("../../app");  // Adjust the path according to your project structure
const db = require('../../db/db'); // Adjust the path as necessary

describe("User API Tests", () => {
  describe("POST /users/registerA", () => {
    it("should register a user with group A", async () => {
      const userData = {
        email: "test@gmail.com",
        password: "password123"
      };
      const response = await supertest(app)
        .post("/users/registerA")
        .send(userData);

      expect(response.status).toBe(201);
    });

// Register  A
    it("should not register user with invalid email with registerA", async () => {
      const userData = {
        email: "test",
        password: "password123"
      };
      const response = await supertest(app)
        .post("/users/registerA")
        .send(userData);

      expect(response.status).toBe(400);
    });

    it("should not register user with invalid email and password with registerA", async () => {
      const userData = {
        email: "test",
        password: "***"
      };
      const response = await supertest(app)
        .post("/users/registerA")
        .send(userData);

      expect(response.status).toBe(400);
    });

// Register B
    it("should not register user with invalid email with registerB", async () => {
      const userData = {
        email: "test",
        password: "password123"
      };
      const response = await supertest(app)
        .post("/users/registerB")
        .send(userData);

      expect(response.status).toBe(400);
    });

    it("should not register user with invalid email and password with registerB", async () => {
      const userData = {
        email: "test",
        password: "***"
      };
      const response = await supertest(app)
        .post("/users/registerB")
        .send(userData);

      expect(response.status).toBe(400);
    });

  });

  describe("POST /users/login", () => {
    it("should login user and return JWT", async () => {
      // First, register a user
      await supertest(app)
        .post("/users/registerA")
        .send({
          email: "login@gmail.com",
          password: "password123"
        });

      // Now, attempt to login
      const response = await supertest(app)
        .post("/users/login")
        .send({
          email: "login@gmail.com",
          password: "password123"
        });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty("token");
      expect(response.body.email).toEqual("login@example.com");
    });

    it("should reject login with wrong email", async () => {
      const response = await supertest(app)
        .post("/users/login")
        .send({
          email: "test",
          password: "1234"
        });

      expect(response.status).toBe(400);
    });

  });

  describe('PUT /todos/:id/done', () => {
    let authenticate;
    let mockUser;

    beforeAll(() => {
        // Mock middleware for authentication
        authenticate = jest.fn((req, res, next) => {
            if (!mockUser) {
                return res.status(401).json({ message: 'Unauthorized' });
            }
            req.user = mockUser;
            next();
        });

        // Re-import the module with our mocked middleware
        jest.doMock('../../../backend/middleware/authenticate', () => authenticate);
    });

    beforeEach(() => {
        // Reset mock before each test
        authenticate.mockClear();
        mockUser = { id: 1 };  // Set a default user for authentication
    });

    it('should update todo done status to true', async () => {
        const todoId = 1;
        const mockTodo = { id: todoId, title: 'Sample Todo', done: false };

        // Mock findByPk and update method
        db.models.todo.findByPk = jest.fn().mockResolvedValue({
            ...mockTodo,
            update: jest.fn().mockResolvedValue({
                ...mockTodo,
                done: true
            })
        });

        const response = await supertest(app)
            .put(`/todos/${todoId}/done`);

        expect(response.status).toBe(200);
        expect(response.body).toEqual({ ...mockTodo, done: true });
        expect(db.models.todo.findByPk).toHaveBeenCalledWith(todoId.toString());
        expect(db.models.todo.findByPk().update).toHaveBeenCalledWith({ done: true });
    });

    it('should return 404 if todo does not exist', async () => {
        const todoId = 999; // Non-existent ID

        const response = await supertest(app)
            .put(`/todos/${todoId}/done`);

        expect(response.status).toBe(400);
    });

    it('should require authentication', async () => {
        mockUser = null;  // simulate unauthenticated request
        const todoId = 1;

        const response = await supertest(app)
            .put(`/todos/${todoId}/done`);

        expect(response.status).toBe(400);
    });

});

});
