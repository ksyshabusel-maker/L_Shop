import { Request, Response } from "express"
import { registerUser, loginUser } from "../services/authService"

export const register = (req: Request, res: Response) => {
  const user = registerUser(req.body)

  if (!user) {
    return res.status(400).json({ message: "User already exists" })
  }

  res.json(user)
}

export const login = (req: Request, res: Response) => {
  const token = loginUser(req.body)

  if (!token) {
    return res.status(401).json({ message: "Invalid credentials" })
  }

  res.cookie("token", token, {
    httpOnly: true,
    maxAge: 600000
  })

  res.json({ message: "Logged in" })
}