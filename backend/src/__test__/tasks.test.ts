jest.mock("@clerk/express", () => ({
  clerkMiddleware: () => (req: any, res: any, next: any) => next(),
  getAuth: jest.fn(),
}));

import request from "supertest";
import app from "../app";
import { getAuth } from "@clerk/express";
import { prisma } from "../../prisma/client";

const mockedGetAuth = getAuth as jest.MockedFunction<typeof getAuth>;

beforeEach(() => {
  jest.clearAllMocks();
});

describe("POST /api/tasks", () => {
  beforeEach(() => {
    jest.spyOn(prisma.task, "create").mockResolvedValue({
      id: "task_123",
      name: "Science Assignment",
      description: "Finish alchemy exercises from chapter 5",
      color: "red",
      status: "PENDING",
      deadline: "2026-06-01T10:00:00.000Z",
    } as any);
  });

  it("should return 201 when authenticated and the data sent is valid", async () => {
    mockedGetAuth.mockReturnValue({ userId: "user_test_123" } as any);

    const res = await request(app)
      .post("/api/tasks")
      .send({
        name: "Science Assignment",
        description: "Finish alchemy exercises from chapter 5",
        color: "red",
        subjects: ["Science"],
        status: "PENDING",
        deadline: "2026-06-01T10:00:00.000Z",
      });

    expect(res.statusCode).toBe(201);
  });

  it("should return 403 when unauthenticated", async () => {
    mockedGetAuth.mockReturnValue({ userId: null } as any);

    const res = await request(app)
      .post("/api/tasks")
      .send({
        name: "Science Assignment",
        description: "Finish alchemy exercises from chapter 5",
        color: "red",
        subjects: ["Science"],
        status: "PENDING",
        deadline: "2026-06-01T10:00:00.000Z",
      });

    expect(res.statusCode).toBe(403);
    expect(res.body.message).toBe("Forbidden");
  });

  it("should return 400 when the data is not valid", async () => {
    mockedGetAuth.mockReturnValue({ userId: "user_test_123" } as any);

    const res = await request(app)
      .post("/api/tasks")
      .send({
        name: "",
        description: "Finish alchemy exercises from chapter 5",
        color: "red",
        subjects: ["Science"],
        status: "PENDING",
        deadline: "2026-06-01T10:00:00.000Z",
      });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("errors");
  });
});

describe("GET /api/tasks", () => {
  it("should return 403 when unauthenticated", async () => {
    mockedGetAuth.mockReturnValue({ userId: null } as any);

    const res = await request(app).get("/api/tasks");

    expect(res.statusCode).toBe(403);
  });

  it("should return 200 and list of all tasks when user is authenticated", async () => {
    mockedGetAuth.mockReturnValue({
      userId: "user_3ELLuVRYI9vSdxvsujMaNsZPx58",
    } as any);

    const res = await request(app).get("/api/tasks");

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("tasks");
  });

  it("should return 200 and list of all completed tasks when user is authenticated", async () => {
    mockedGetAuth.mockReturnValue({
      userId: "user_3ELLuVRYI9vSdxvsujMaNsZPx58",
    } as any);

    const res = await request(app).get("/api/tasks?status=completed");

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("tasks");
    expect(res.body.tasks[0].completed).not.toBeNull();
  });

  it("should return 200 and list all overdue tasks when user is authenticated", async () => {
    mockedGetAuth.mockReturnValue({
      userId: "user_3ELLuVRYI9vSdxvsujMaNsZPx58",
    } as any);

    const res = await request(app).get("/api/tasks?status=overdue");

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("tasks");
    expect(new Date(res.body.tasks[0].deadline).getTime()).toBeLessThan(
      new Date().getTime(),
    );
  });
});
