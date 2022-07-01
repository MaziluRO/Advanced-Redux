import Card from '../UI/Card';
import classes from './ProductItem.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { cartActions } from '../../reduxStore/cart-slice';
//import { useEffect } from 'react';

const ProductItem = (props) => {
	const { title, price, description, id } = props;
	const dispatchFn = useDispatch();
	const cart = useSelector((state) => state.cart);

	const addToCartHandler = () => {
		const newQuantity = cart.totalQuantity + 1;

		const copyItems = cart.items.slice();
		const existingItem = copyItems.find((item) => item.id === id);
		if (existingItem) {
			const updatedItem = { ...existingItem };
			updatedItem.quantity++;
			updatedItem.price = updatedItem.price + price;
			const existingItemIndex = copyItems.findIndex((item) => item.id === id);
			copyItems[existingItemIndex] = updatedItem;
		} else {
			copyItems.push({
				id: id,
				price: price,
				quantity: 1,
				totalPrice: price,
				name: title,
			});
		}

		const newCart = {
			totalQuantity: newQuantity,
			items: copyItems,
		};

		dispatchFn(
			//cartActions.addItemToCart({ id: id, title: title, price: price })
			cartActions.replaceCart(newCart)
		);
	};

	return (
		<li className={classes.item}>
			<Card>
				<header>
					<h3>{title}</h3>
					<div className={classes.price}>${price.toFixed(2)}</div>
				</header>
				<p>{description}</p>
				<div className={classes.actions}>
					<button onClick={addToCartHandler}>Add to Cart</button>
				</div>
			</Card>
		</li>
	);
};

export default ProductItem;
