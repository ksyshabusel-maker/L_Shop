//хай
const express = require('express');
const cookieParser = require('cookie-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname)));

const CART_FILE = path.join(__dirname, 'data', 'cart.json');

function checkAuth(req, res, next) {
    if (!req.cookies.userId) {
        return res.status(401).json({ error: 'Не авторизован' });
    }
    next();
}

app.get('/api/cart', checkAuth, (req, res) => {
    const userId = req.cookies.userId;
    
    fs.readFile(CART_FILE, 'utf8', (err, data) => {
        if (err) {
            return res.json({ userId, items: [] });
        }
        const carts = JSON.parse(data);
        const cart = carts.find(c => c.userId === userId) || { userId, items: [] };
        res.json(cart);
    });
});

app.post('/api/cart/add', checkAuth, (req, res) => {
    const userId = req.cookies.userId;
    const { productId } = req.body;
    
    fs.readFile(CART_FILE, 'utf8', (err, data) => {
        let carts = [];
        if (!err) carts = JSON.parse(data);
        
        let cart = carts.find(c => c.userId === userId);
        if (!cart) {
            cart = { userId, items: [] };
            carts.push(cart);
        }
        
        const item = cart.items.find(i => i.productId === productId);
        if (item) {
            item.quantity += 1;
        } else {
            cart.items.push({ productId, quantity: 1 });
        }
        
        fs.writeFile(CART_FILE, JSON.stringify(carts, null, 2), () => {
            res.json(cart);
        });
    });
});

app.post('/api/cart/remove', checkAuth, (req, res) => {
    const userId = req.cookies.userId;
    const { productId } = req.body;
    
    fs.readFile(CART_FILE, 'utf8', (err, data) => {
        const carts = JSON.parse(data);
        const cart = carts.find(c => c.userId === userId);
        const item = cart.items.find(i => i.productId === productId);
        
        if (item.quantity > 1) {
            item.quantity -= 1;
        } else {
            cart.items = cart.items.filter(i => i.productId !== productId);
        }
        
        fs.writeFile(CART_FILE, JSON.stringify(carts, null, 2), () => {
            res.json(cart);
        });
    });
});

app.delete('/api/cart/delete/:productId', checkAuth, (req, res) => {
    const userId = req.cookies.userId;
    const productId = req.params.productId;
    
    fs.readFile(CART_FILE, 'utf8', (err, data) => {
        const carts = JSON.parse(data);
        const cart = carts.find(c => c.userId === userId);
        cart.items = cart.items.filter(i => i.productId !== productId);
        
        fs.writeFile(CART_FILE, JSON.stringify(carts, null, 2), () => {
            res.json(cart);
        });
    });
});

app.post('/api/cart/clear', checkAuth, (req, res) => {
    const userId = req.cookies.userId;
    
    fs.readFile(CART_FILE, 'utf8', (err, data) => {
        const carts = JSON.parse(data);
        const cart = carts.find(c => c.userId === userId);
        cart.items = [];
        
        fs.writeFile(CART_FILE, JSON.stringify(carts, null, 2), () => {
            res.json(cart);
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});