import { Router } from "express";
import {
  createUserSchema,
  loginSchema,
  usersTable,
} from "../../db/usersSchema.js";
import { validateData } from "../../middleware/validationMiddleware.js";
import bcrypt from "bcryptjs";
import db from "../../db/index.js";
import jwt from "jsonwebtoken";
import { eq } from "drizzle-orm";

const authRouter = Router();

authRouter.post(
  "/register",
  validateData(createUserSchema),
  async (req, res) => {
    try {
      const data = req.cleanBody;
      const hashedPassword = await bcrypt.hash(data.password, 10);

      const [user] = await db
        .insert(usersTable)
        .values({ ...data, password: hashedPassword })
        .returning();

      // @ts-ignore
      delete user.password;
      res.status(201).json({ user });
    } catch (error) {
      console.log(error);
      res.status(500).send("something went wrong");
    }
  }
);

authRouter.post("/login", validateData(loginSchema), async (req, res) => {
  try {
    const { email, password } = req.cleanBody;
    const [user] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email));

    if (!user) {
      res.status(401).json({ error: "Authentication failed" });
      return;
    }

    const matched = await bcrypt.compare(password, user.password);

    if (!matched) {
      res.status(401).json({ error: "Authentication failed" });
      return;
    }

    const token = jwt.sign(
      { userId: user.id, role: user.role },
      "your-secret",
      { expiresIn: "30d" }
    );

    // @ts-ignore
    delete user.password;
    res.status(200).json({ token, user });
  } catch (error) {
    console.log(error);
    res.status(500).send("something went wrong");
  }
});

export default authRouter;
