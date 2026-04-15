import { eq } from "drizzle-orm";
import { db } from "../../db";
import { usersTable } from "../../db/schema";
type User = {
  firstName: string;
  lastName: string | null;
  password: string;
  salt: string;
  email: string;
  role: string;
  phone: string | null;
};
export async function validateEmail(email: string) {
  return await db.select().from(usersTable).where(eq(usersTable.email, email));
}

export async function createUser(user: User) {
  const [inserted] = await db
    .insert(usersTable)
    .values({
      firstName: user.firstName,
      lastName: user.lastName,
      password: user.password,
      salt: user.salt,
      email: user.email,
      role: user.role,
      phone: user.phone,
    })
    .returning({ id: usersTable.id });
  return inserted;
}
