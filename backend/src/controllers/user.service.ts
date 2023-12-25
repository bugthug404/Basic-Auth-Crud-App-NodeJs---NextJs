import { Request, Response } from "express";
import { MySQLDatabase } from "../utils/db";
import { editUserSchema } from "../utils/joi-edit-user-schema";
import { signUpSchema } from "../utils/joi-signup-schema";
import bcrypt from "bcrypt";

const db = new MySQLDatabase();

export async function getAllUsers(req: Request, res: Response) {
  try {
    const users = await db.query("SELECT * FROM users");
    return res.status(200).send({ users });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ error: err });
  }
}

export async function deleteUser(req: Request, res: Response) {
  console.info("got delete request", req.params);
  try {
    const { id } = req.params;
    const users = await db.query("DELETE FROM users WHERE id = ?", [id]);
    return res.status(200).send({ users });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ error: err });
  }
}

export async function editUser(req: Request, res: Response) {
  console.log("got edit request", req.params);
  const validData = editUserSchema.validate(req.body);
  console.log("valid Data", validData);
  if (validData.error)
    return res.status(400).send({ error: validData.error.details[0].message });

  console.log("editUser() called", req.body);
  try {
    const { id } = req.params;
    const users = await db.query("UPDATE users SET ? WHERE id = ?", [
      req.body,
      id,
    ]);
    return res.status(200).send({ users });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ error: err });
  }
}
// add user

export async function addUser(req: Request, res: Response) {
  console.log("addUser() called", req.body);

  const validData = signUpSchema.validate(req.body);
  console.log("valid Data", validData);
  if (validData.error) {
    return res.status(400).send({ error: validData.error.details[0].message });
  }

  try {
    console.log("addUser() called", req.body);
    console.log("valid data", validData);
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

    // check if user exists
    const [exists] = (await db.query(`SELECT * FROM users WHERE email = ?`, [
      email,
    ])) as any[];

    if (exists) {
      return res.status(400).send({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const users = (await db.query(
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
    return res.status(200).send({ users });
  } catch (err: any) {
    return res
      .status(500)
      .send({ error: err.message ?? "Something went wrong" });
  }
}
