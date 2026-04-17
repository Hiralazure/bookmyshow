import { eq } from "drizzle-orm";
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

export async function checkMovieId(movieId: number) {
  const result = await db
    .select()
    .from(movieTables)
    .where(eq(movieTables.id, movieId));
  return result.length > 0;
}
