import { GET_PRODUCTS,GET_PRODUCT_BY_ID, ADD_TO_CART, DELETE_ITEM_FROM_CART, ADDED_TO_CART } from './types';

export const getProducts =  () => async (dispatch) => {
        const url = "http://localhost:8000/api/v1/products/p/1?page=1";
        let reponse = await fetch(url);
        let data = await reponse.json();
        let products = [];
        data.data.map((value, index) => {
            products.push(value);
        });
        dispatch({
            type: GET_PRODUCTS,
            payload: products
        });
}

export const getProductByID = (state, id) => dispatch =>  {
    let item = state.filter((item) => id === item.id);
    dispatch({
        type: GET_PRODUCT_BY_ID,
        payload: item
    });
}

export const addToCart = (item, cartItems) => dispatch => {
    if(!inCart(item,cartItems)) {
        dispatch({
            type: ADD_TO_CART,
            payload: item
        });
    }
}

const inCart = (item, cartItems) => {
    let result = cartItems.filter((i) => i.id === item.id);
    if(result.length === 0) {
        return false;
    }
    return true;
}

export const deleteItemFromCart = (item, cartItems) => dispatch => {
    let updatedCart = cartItems.filter((i) => i.id !== item.id);
    dispatch({
        type: DELETE_ITEM_FROM_CART,
        payload: updatedCart
    })
}



