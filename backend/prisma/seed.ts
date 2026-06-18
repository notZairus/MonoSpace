import "dotenv/config";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "../generated/prisma/client";

const connectionString = `${process.env.DATABASE_URL}`;

const adapter = new PrismaBetterSqlite3({ url: connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
  const singleSub = await prisma.tag.create({
    data: {
      userId: "user_3ELLuVRYI9vSdxvsujMaNsZPx58",
      name: "Example Tag",
    },
  });

  const tasksData = [
    {
      name: "Science Assignment",
      description: "Finish alchemy exercises from chapter 5",
      color: "red",
      status: "PENDING",
      deadline: "2026-06-01T10:00:00.000Z",
      userId: "user_3ELLuVRYI9vSdxvsujMaNsZPx58",
    },
    {
      name: "Math Problem Set",
      description: "Solve quadratic equation worksheet",
      color: "green",
      status: "PENDING",
      deadline: "2026-06-02T08:00:00.000Z",
      userId: "user_3ELLuVRYI9vSdxvsujMaNsZPx58",
    },
    {
      name: "English Essay",
      description: "Write essay about modern literature",
      color: "yellow",
      status: "PENDING",
      deadline: "2026-06-03T09:00:00.000Z",
      userId: "user_3ELLuVRYI9vSdxvsujMaNsZPx58",
    },
    {
      name: "History Review",
      description: "Review World War II notes",
      color: "red",
      status: "PENDING",
      deadline: "2026-06-04T11:00:00.000Z",
      userId: "user_3ELLuVRYI9vSdxvsujMaNsZPx58",
    },
    {
      name: "Programming Task",
      description: "Build CRUD app using React",
      color: "green",
      status: "PENDING",
      deadline: "2026-06-05T12:00:00.000Z",
      userId: "user_3ELLuVRYI9vSdxvsujMaNsZPx58",
    },
    {
      name: "Physics Quiz Prep",
      description: "Study Newton's laws of motion",
      color: "yellow",
      status: "PENDING",
      deadline: "2026-06-06T07:30:00.000Z",
      userId: "user_3ELLuVRYI9vSdxvsujMaNsZPx58",
    },
    {
      name: "Chemistry Lab Report",
      description: "Document experiment results",
      color: "red",
      status: "PENDING",
      deadline: "2026-06-07T10:30:00.000Z",
      userId: "user_3ELLuVRYI9vSdxvsujMaNsZPx58",
    },
    {
      name: "Art Project",
      description: "Create a digital painting",
      color: "yellow",
      status: "PENDING",
      deadline: "2026-06-08T09:00:00.000Z",
      userId: "user_3ELLuVRYI9vSdxvsujMaNsZPx58",
    },
    {
      name: "Music Practice",
      description: "Practice piano scales",
      color: "green",
      status: "PENDING",
      deadline: "2026-06-09T15:00:00.000Z",
      userId: "user_3ELLuVRYI9vSdxvsujMaNsZPx58",
    },
    {
      name: "PE Activity",
      description: "Complete weekly fitness routine",
      color: "red",
      status: "PENDING",
      deadline: "2026-06-10T06:00:00.000Z",
      userId: "user_3ELLuVRYI9vSdxvsujMaNsZPx58",
    },
    {
      name: "Geography Map Work",
      description: "Label countries in Europe map",
      color: "yellow",
      status: "PENDING",
      deadline: "2026-06-11T10:00:00.000Z",
      userId: "user_3ELLuVRYI9vSdxvsujMaNsZPx58",
    },
    {
      name: "Biology Notes",
      description: "Summarize cell structure topic",
      color: "green",
      status: "PENDING",
      deadline: "2026-06-12T08:30:00.000Z",
      userId: "user_3ELLuVRYI9vSdxvsujMaNsZPx58",
    },
    {
      name: "Economics Homework",
      description: "Explain supply and demand",
      color: "red",
      status: "PENDING",
      deadline: "2026-06-13T11:00:00.000Z",
      userId: "user_3ELLuVRYI9vSdxvsujMaNsZPx58",
    },
    {
      name: "Computer Lab Exercise",
      description: "Practice SQL queries",
      color: "green",
      status: "PENDING",
      deadline: "2026-06-14T14:00:00.000Z",
      userId: "user_3ELLuVRYI9vSdxvsujMaNsZPx58",
    },
    {
      name: "Filipino Assignment",
      description: "Write poem in Filipino",
      color: "yellow",
      status: "PENDING",
      deadline: "2026-06-15T09:30:00.000Z",
      userId: "user_3ELLuVRYI9vSdxvsujMaNsZPx58",
    },
  ];

  await Promise.all(
    tasksData.map((task) =>
      prisma.task.create({
        data: {
          ...task,
          subjects: {
            connect: [{ id: singleSub.id }],
          },
        } as any,
      }),
    ),
  );
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
