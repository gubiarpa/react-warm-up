import { createContext, ReactNode, useContext, useState } from "react";

type ShoppingCartContext = {
	openCart: () => void;
	closeCart: () => void;
	getItemQuantity: (id: number) => number;
	increaseCartQuantity: (id: number) => void;
	decreaseCartQuantity: (id: number) => void;
	removeFromCart: (id: number) => void;
	cartQuantity: number;
	cartItems: CartItem[];
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
	const [useOpen, setUseOpen] = useState(false);
	const [cartItems, setCartItems] = useState<CartItem[]>([]);

	const openCart = (): void => {
		setUseOpen(true);
	};

	const closeCart = (): void => {
		setUseOpen(false);
	};

	const cartQuantity = cartItems.reduce(
		(quantity, item) => item.quantity + quantity,
		0
	);

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
				openCart,
				closeCart,
				getItemQuantity,
				increaseCartQuantity,
				decreaseCartQuantity,
				removeFromCart,
				cartItems,
				cartQuantity,
			}}
		>
			{children}
		</ShoppingCartContext.Provider>
	);
};
