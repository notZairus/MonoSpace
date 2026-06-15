import { prisma } from "../../prisma/client";

export async function deleteOrphanedTags(userId: string) {
  const tags = await prisma.tag.findMany({
    where: {
      userId: userId,
    },
    include: {
      tasks: true,
      notes: true,
    },
  });

  for (const tag of tags) {
    if (tag.notes.length <= 0 && tag.tasks.length <= 0) {
      await prisma.tag.delete({
        where: {
          id: tag.id,
        },
      });
    }
  }
}
