import { Delivery } from "./ndelivery"
import fs from "fs"
import path from "path"

const filePath = path.resolve(__dirname, "data/delivery.json")

export function getDeliveries(): Delivery[] {
  if (!fs.existsSync(filePath)) return []
  const data = fs.readFileSync(filePath, "utf-8")
  return JSON.parse(data)
}

export function saveDelivery(delivery: Delivery): void {
  const deliveries = getDeliveries()
  delivery.id = (deliveries.length + 1).toString()
  delivery.createdAt = new Date()
  deliveries.push(delivery)
  fs.writeFileSync(filePath, JSON.stringify(deliveries, null, 2))
}