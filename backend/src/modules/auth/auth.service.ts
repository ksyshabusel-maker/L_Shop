import { readJson, writeJson } from "../../utils/fileDb";
import { User, RegisterRequest, LoginRequest } from "../../shared/types";
import { createSession } from "../../utils/auth";
import { randomUUID, createHash } from "crypto";
import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;
const USERS_PATH = "data/users.json";

function hash(password: string) {
  return createHash("sha256").update(password).digest("hex");
}

export async function register(data: RegisterRequest) {
  const users = await readJson<User[]>(USERS_PATH);

  const exists = users.find(
    u => u.login === data.login || u.email === data.email
  );

  if (exists) {
    throw new Error("Есть такой чел");
  }
  const passwordHash = await bcrypt.hash(data.password, SALT_ROUNDS);
  const user: User = {
    id: randomUUID(),
    name: data.name,
    email: data.email,
    login: data.login,
    phone: data.phone,
    passwordHash: passwordHash,
    createdAt: new Date().toISOString()
  };

  users.push(user);
  await writeJson(USERS_PATH, users);

  const sessionId = createSession(user.id);

  return {
    user: { id: user.id, name: user.name, email: user.email },
    sessionId
  };
}

export async function login(data: LoginRequest) {
  const users = await readJson<User[]>(USERS_PATH);

  const user = users.find(u => u.login === data.login);

if (!user) {
  throw new Error("Хрень логин");
}

const isValid = await bcrypt.compare(data.password, user.passwordHash);

if (!isValid) {
  throw new Error("Хрень пароль");
}
  const sessionId = createSession(user.id);

  return {
    user: { id: user.id, name: user.name, email: user.email },
    sessionId
  };
}

export async function getMe(userId: string) {
  const users = await readJson<User[]>(USERS_PATH);

  const user = users.find(u => u.id === userId);

  if (!user) return null;

  return {
    id: user.id,
    name: user.name,
    email: user.email
  };
}