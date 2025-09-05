import { createContext, useState } from 'react';

export type CartItem = {
    id: number;
    title: string;
    price: number;
    quantity: number;
    image: string;
};

export type CartContextType = {
    cart: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (id: number) => void;
    clearCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);
export default CartContext;

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [cart, setCart] = useState<CartItem[]>([]);

    const addToCart = (item: CartItem) => {
        setCart((prev) => {
            const exists = prev.find((p) => p.id === item.id);
            if (exists) {
                return prev.map((p) =>
                    p.id === item.id ? { ...p, quantity: p.quantity + 1 } : p
                );
            }
            return [...prev, { ...item, quantity: 1 }];
        });
    };

    const removeFromCart = (id: number) => {
        setCart((prev) => prev.filter((p) => p.id !== id));
    };

    const clearCart = () => setCart([]);

    return (
        <CartContext.Provider
            value={{ cart, addToCart, removeFromCart, clearCart }}
        >
            {children}
        </CartContext.Provider>
    );
}
