import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { MySQLDatabase } from "../utils/db";
import Joi from "joi";
import { signUpSchema } from "../utils/joi-signup-schema";
import { loginSchema } from "../utils/joi-login-schema";

const db = new MySQLDatabase();
const SECRET_KEY = process.env.SECRET_KEY || "1234567890";

export async function signUp(req: Request, res: Response) {
  const validData = signUpSchema.validate(req.body);
  if (validData.error)
    return res.status(400).send({ error: validData.error.details[0].message });

  const {
    firstName,
    lastName,
    email,
    mobile,
    profession,
    address,
    role,
    password,
  } = validData.value;

  try {
    const [exists] = (await db.query(`SELECT * FROM users WHERE email = ?`, [
      email,
    ])) as any[];

    if (exists) {
      return res.status(400).send({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const data = (await db.query(
      `INSERT INTO users (firstName, lastName, email, mobile, profession, address, role, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        firstName,
        lastName,
        email,
        mobile,
        profession,
        address,
        role,
        hashedPassword,
      ]
    )) as any;

    const token = jwt.sign(
      {
        email: email,
        userId: data.insertId,
      },
      SECRET_KEY!
    );
    res.status(201).send({ user: data, token });
  } catch (err: any) {
    console.log(err);
    res.status(500).send({ error: err.message });
  }
}

export async function signIn(req: Request, res: Response) {
  const validData = loginSchema.validate(req.body);
  if (validData.error)
    return res.status(400).send({ error: validData.error.details[0].message });

  const { email, password } = req.body;

  try {
    const [user] = (await db.query("SELECT * FROM users WHERE email = ?", [
      email,
    ])) as any[];
    console.log(user);

    if (!user) {
      return res.status(400).send({ error: "User not found" });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(400).send({ error: "Invalid password" });
    }

    const token = jwt.sign(
      {
        email: user.email,
        userId: user.id,
      },
      SECRET_KEY!
    );

    res.status(200).send({ user, token });
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: "Something went wrong" });
  }
}
