import { db } from "../../db";
import { movieTables } from "../../db/schema";
interface movie {
  title: string;
  description: string;
  duration: number;
  isActive: boolean;
}

export async function insertMovies(moviePayload: movie) {
  return await db.insert(movieTables).values({
    title: moviePayload.title,
    description: moviePayload.description,
    duration: moviePayload.duration,
  });
}

export async function getMovies() {
  return await db.select().from(movieTables);
}
