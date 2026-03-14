const expressApp = require("express");
const cors = require("cors");
const deliveryRouter = require("./deliveryController");

const app = expressApp();

app.use(cors());
app.use(expressApp.json());
app.use("/api/delivery", deliveryRouter);

app.listen(3000, () => console.log("Сервер на порту 3000"));