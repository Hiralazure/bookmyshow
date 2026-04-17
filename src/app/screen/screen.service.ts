import { eq } from "drizzle-orm";
import { db } from "../../db";
import { screenTables } from "../../db/schema";

interface screen {
  title: string;
  totalSeats: number;
}
export async function insertScreen(screenDetails: screen) {
  return await db.insert(screenTables).values({
    screenName: screenDetails.title,
    totalSeats: screenDetails.totalSeats,
  });
}

export async function checkScreenId(screenId:number){
  return await db.select().from(screenTables).where(eq(screenTables.id,screenId))
}
