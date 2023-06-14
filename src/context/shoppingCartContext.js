import { createContext, useContext, useState } from "react";
import ShoppingCart from "../components/ShoppingCart";
import { useLocalStorage } from "../hooks/useLocalStorage";

const ShoppingCartContext = createContext({})

export function useShoppingCart() {
    return useContext(ShoppingCartContext)
}


 
export function ShoppingCartProvider( {children} ) {

    const [cartItems, setCartItems] = useLocalStorage("cartItems", []);
    const [cartService, setCartService] = useLocalStorage("cartService", []);


    const [isOpen, setIsOpen]= useState(false)

    const cartQuantity= cartItems.reduce(
        (quantity, item) => item.quantity + quantity,
        0
    )

    const openCart = ()=> setIsOpen(true)
    const closeCart = ()=> setIsOpen(false)

    function getItemQuantity(id) {
        return cartItems.find(
            item=>item.id===id//se a quella roba corrisponde qualcosa
            )?.quantity || 0 //allora ritornane la quantità, altrimenti ritorna 0
    }

    function addToCart(it_quantity, id, prezzo) {
        
        
        setCartItems(currItems =>{
            if(currItems.find(item => item.id ===id)==null) {
                return [...currItems, {id, quantity: it_quantity, prezzo: prezzo}]
            } else {
                return currItems.map(item=>{
                    if(item.id===id) {
                        
                        var tmp= parseInt(item.quantity) + parseInt(it_quantity)
                        return {...item, quantity: tmp}
                    } else {
                        return item
                    }
                })
            }
        })
        console.log(cartItems)
    }

    function increaseCartQuantity(id) {
        console.log("increase... ");
        setCartItems(currItems=>{ //è la lista di ciò che al momento è nel carrello
            //e dobbiamo modificarla
            if(currItems.find(item => item.id ===id)==null) {
                return [...currItems, {id, quantity: 1}]
            } else {
                return currItems.map(item=>{
                    if(item.id===id) {
                        return {...item, quantity: item.quantity +1}
                    } else {
                        return item;
                    }
                })
            }
        })
    }

    function decreaseCartQuantity(id) {
        setCartItems(currItems=>{ //è la lista di ciò che al momento è nel carrello
            //e dobbiamo modificarla
            if(currItems.find(item => item.id ===id)?.quantity ===1) {
                return currItems.filter(item=>item.id !==id)
            } else {
                return currItems.map(item=>{
                    if(item.id===id) {
                        return {...item, quantity: item.quantity - 1}
                    } else {
                        return item
                    }
                })
            }
        })
    }

    function removeFromCart(id) {
        console.log("rimosso")
        setCartItems(currItems =>{
            return currItems.filter(item=>item.id !==id)
        })
    }
    
    function addServiceToCart(service){
        //localStorage.setItem('service', JSON.stringify(service))
        setCartService(service)
    }

    function deleteFromCart(id) {
        setCartItems(currItems =>{
            return currItems.filter(item=>item.id !==id)
        })
    }





    return <ShoppingCartContext.Provider value={{
        addToCart,
        getItemQuantity, 
        increaseCartQuantity, 
        decreaseCartQuantity, 
        removeFromCart, deleteFromCart,
        cartItems,
        cartQuantity,
        openCart, closeCart,
        addServiceToCart,
        cartService
        }} >
        {children}
        
    </ShoppingCartContext.Provider>
}
