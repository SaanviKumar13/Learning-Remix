import { db } from "./db.server";

export async function getNotes(username: string) {
    try {
      const notes = await db.note.findMany({
        where: { userId: username },
        select: { id: true, title: true, content: true },
      });
      return { success: true, data: notes };
    } catch (error) {
    
      return { success: false, message: "Error fetching notes." };
    }
  }
  

export async function createNote({
    title,
    content,
    username,
  }: {
    title: string;
    content: string;
    username: string;
  }) {
    try {
      const user = await db.user.findUnique({
        where: {
          username: username,
        },
      });
      if (!user) {
        return { success: false, message: "Error: User not found." };
      }
      await db.note.create({
        data: {
          title,
          content,
          user: {
            connect: {
              username: username,
            },
          },
        },
      });
      return { success: true, message: "Note created successfully!" };
    } catch (error) {
     
      return { success: false, message: "Error in creating note." };
    }
  }
  

  export async function deleteNote({ id, username }: { id: string; username: string }) {
    try {
      await db.note.deleteMany({
        where: { id, userId: username }, 
      });
      return { success: true, message: "Note deleted successfully!" };
    } catch (error) {
     
      return { success: false, message: "Error in deleting note." };
    }
  }
  