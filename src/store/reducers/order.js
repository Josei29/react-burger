import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
    orders: [],
    loading: false,
    purchased: false
};

// Functions that are called by our Switch()

const purchaseInit = (state) => updateObject(state, {purchased: false});

const purchaseBurgerStart = (state) => updateObject(state, {loading: true});

const purchaseBurgerSuccess = (state, action) => {
    let newOrder = {
        ...action.orderData,
        id: action.orderId
    };

    return {
        ...state,
        loading: false,
        orders: state.orders.concat(newOrder),
        purchased: true
    };
};

const purchaseBurgerFail = (state) => updateObject(state, {loading: false});

const fetchOrdersStart = (state) => updateObject(state, {loading: true});

const fetchOrdersSuccess = (state, action) => {
    return {
        ...state,
        orders: action.orders,
        loading: false
    };
};

const fetchOrdersFail = (state) => updateObject(state, {loading: false});

// Reducer calling our previous functions

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.PURCHASE_INIT: return purchaseInit(state);

        case actionTypes.PURCHASE_BURGER_START: return purchaseBurgerStart(state);

        case actionTypes.PURCHASE_BURGER_SUCCESS: return purchaseBurgerSuccess(state, action);
        
        case actionTypes.PURCHASE_BURGER_FAIL: return purchaseBurgerFail(state);

        case actionTypes.FETCH_ORDERS_START: return fetchOrdersStart(state);
        
        case actionTypes.FETCH_ORDERS_SUCCESS: return fetchOrdersSuccess(state, action);

        case actionTypes.FETCH_ORDERS_FAIL: return fetchOrdersFail(state);

        default: return state;
    };
};

export default reducer;