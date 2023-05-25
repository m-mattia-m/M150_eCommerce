import {CartItem} from "../model/cart";

let cart: string[] = []
let paymentCart: CartItem[] = []

export const listCart = (): string[] => {
    loadLocalStorageCart()
    return cart
};

export function addToCart(id: string): void{
    loadLocalStorageCart()
    if (id == "") {
        return
    }
    cart.push(id)
    storeProductsInBrowserStorage(cart)
}

export function removeFromCart(id: string): void{
    loadLocalStorageCart()
    if (id == "") {
        return
    }
    const index = cart.indexOf(id);
    if (index > -1) {
        cart.splice(index, 1);
    }
    storeProductsInBrowserStorage(cart)
}

function loadLocalStorageCart(){
    let cartStorage = getProductsInBrowserStorage()
    console.log(cartStorage)
    if (cartStorage.length === 0){
        return
    }
    for (const cartStorageIndex in cartStorage) {
        if (cart.indexOf(cartStorage[cartStorageIndex]) >= 0){
            continue
        }
        cart.push(cartStorage[cartStorageIndex])
    }
}

function storeProductsInBrowserStorage(cart: string[]){
    localStorage.setItem("cart", JSON.stringify(cart))
}

function getProductsInBrowserStorage(): string[]{
    const store = localStorage.getItem("cart")
    if (store === null){
        return [];
    }
    return JSON.parse(store);
}

export function setPaymentCart(cart: CartItem[]){
    paymentCart = cart
}

export function getPaymentCart(): CartItem[]{
    return paymentCart
}