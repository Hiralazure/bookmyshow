import { db } from "../../db";
import { showTables } from "../../db/schema";

interface show {
  movieId: number;
  screenId: number;
  showDate: string;
  startTime: string;
  endTime: string;
}
export async function addShowDetails(showDetails: show) {
  return await db.insert(showTables).values({
    movieId: showDetails.movieId,
    screenId: showDetails.screenId,
    showDate: showDetails.showDate,
    startTime: showDetails.startTime,
    endTime: showDetails.endTime,
  });
}
