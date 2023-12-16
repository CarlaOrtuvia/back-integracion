import express from "express";
import { CartManager } from "../dao/models/cartManager.js";
import { passportError, authorization } from "../utils/messagesError.js"

const viewsRouter = express.Router();


viewsRouter.get('/home', passportError('jwt'), authorization(['admin', 'user']), (req, res) => {
    res.render('home', {
        js: "home.js",
        css: "home.css",
        title: "Chat"
        
    });
})

viewsRouter.get('/realtimeproducts', passportError('jwt'), authorization('admin'), (req, res) => {
    res.render('realTimeProducts', {
        css: "style.css",
        title: "Products",
        js: "realTimeProducts.js"

    })
})

viewsRouter.get('/carts/:cid', passportError('jwt'), authorization(['admin', 'user']), async (req, res) => {
    try {
        const cid = req.params.cid;
        const cart = await CartManager.findById(cid);
        console.log(cart)

        if (cart) {
            res.render('carts', { products: cart.products });
        } else {
            res.status(404).send({ respuesta: 'Error', mensaje: 'Carrito no encontrado' });
        }

    } catch (error) {
        res.status(400).send({ respuesta: 'Error', mensaje: error.message });
    }
});

viewsRouter.get('/login', (req, res) => {
    res.render('login', {
        js: "login.js",
        css: "home.css",
        title: "login",
        
    });
})

viewsRouter.get('/logout', (req, res) => {
    res.render('logout', {
        js: "logout.js",
        css: "home.css",
        title: "logout",
        
    });
})

viewsRouter.get('/signup', (req, res) => {
    res.render('signup', {
        js: "signup.js",
        css: "signup.css",
        title: "signup",
    });
});

viewsRouter.get('/chat', passportError('jwt'), authorization(['admin', 'user']), (req, res) => {
    res.render('chat', {
        js: "chat.js",
        css: "chat.css",
        title: "chat",
    });
});

viewsRouter.get('/gitHubCallback', passportError('jwt'), authorization(['admin','user']), (req, res) => {
    res.render('chat', {
        js: "gitHubCallback.js",
        css: "chat.css",
        title: "chat",
    });
});

export default viewsRouter;