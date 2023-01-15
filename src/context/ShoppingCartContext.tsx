import { createContext, ReactNode, useContext, useState } from "react";

type ShoppingCartContext = {
	getItemQuantity: (id: number) => number;
	increaseCartQuantity: (id: number) => void;
	decreaseCartQuantity: (id: number) => void;
	removeFromCart: (id: number) => void;
};

const ShoppingCartContext = createContext({} as ShoppingCartContext);

export const useShoppingCart = () => {
	return useContext(ShoppingCartContext);
};

type ShoppingCartProviderProps = {
	children: ReactNode;
};

type CartItem = {
	id: number;
	quantity: number;
};

export const ShoppingCartProvider = ({
	children,
}: ShoppingCartProviderProps) => {
	const [cartItems, setCartItems] = useState<CartItem[]>([]);

	const getItemQuantity = (id: number): number => {
		return cartItems.find((item) => item.id === id)?.quantity || 0;
	};

	const increaseCartQuantity = (id: number): void => {
		setCartItems((currentItems: CartItem[]): CartItem[] => {
			if (currentItems.find((item) => item.id === id) == null) {
				return [...currentItems, { id, quantity: 1 }];
			} else {
				return currentItems.map((item) => {
					if (item.id === id) {
						return { ...item, quantity: item.quantity + 1 };
					} else {
						return item;
					}
				});
			}
		});
	};

	const decreaseCartQuantity = (id: number): void => {
		setCartItems((currentItems: CartItem[]): CartItem[] => {
			if (currentItems.find((item) => item.id === id) == null) {
				return currentItems.filter((item) => item.id !== id);
			} else {
				return currentItems.map((item) => {
					if (item.id === id) {
						return { ...item, quantity: item.quantity - 1 };
					} else {
						return item;
					}
				});
			}
		});
	};

	const removeFromCart = (id: number): void => {
		setCartItems((currentItems) =>
			currentItems.filter((item) => item.id !== id)
		);
	};

	return (
		<ShoppingCartContext.Provider
			value={{
				getItemQuantity,
				increaseCartQuantity,
				decreaseCartQuantity,
				removeFromCart,
			}}
		>
			{children}
		</ShoppingCartContext.Provider>
	);
};
