import express from 'express';
import cookieParser from 'cookie-parser';
import { CartController } from './controllers/cart.controller';
const app = express();
const PORT = 3000;
const cartController = new CartController();

app.use(express.json());
app.use(cookieParser());
app.use(express.static('../frontend'));

app.get('/api/cart', cartController.getCart);
app.post('/api/cart/add', cartController.addToCart);
app.post('/api/cart/remove-one', cartController.removeOneFromCart);
app.delete('/api/cart/remove/:productId', cartController.removeFromCart);
app.post('/api/cart/clear', cartController.clearCart);
app.post('/api/login', (req, res) => {
    const { userId } = req.body;
    if (userId) {
        res.cookie('userId', userId, { maxAge: 600000 });
        res.json({ success: true });
    } else {
        res.status(400).json({ error: 'Нужен userId' });
    }
});
app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
    console.log(`Открой в браузере: http://localhost:${PORT}/cart.html`);
});