const expressRouter = require("express");
const bodyParser = require("body-parser");
const { getDeliveries, saveDelivery } = require("./deliveryService");
const { Delivery } = require("./ndelivery");

const router = expressRouter.Router();
router.use(bodyParser.json());

router.get("/delivery", (req: any, res: { json: (arg0: any) => void; }) => {
  const deliveries = getDeliveries();
  res.json(deliveries);
});

router.post("/delivery", (req: { body: any; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { message: string; }): void; new(): any; }; }; }) => {
  const delivery = req.body;
  saveDelivery(delivery);
  res.status(201).json({ message: "Создано" });
});

module.exports = router;