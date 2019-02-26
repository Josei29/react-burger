import React, { Component } from "react";
import { connect } from "react-redux";
import Aux from "../../hoc/Auxiliary/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actions from "../../store/actions";
import axios from "../../axios-orders";

class BurgerBuilder extends Component {
    state = {
        purchasing: false
    }

    componentDidMount = () => {
        this.props.initIngredients();
    };

    updatePurchaseState = (ingredients) => {
        let sum = Object.keys(ingredients).map(igKey => {
            return ingredients[igKey];
        }).reduce((sum, el) => {
            return sum + el;
        }, 0);
        
        return sum > 0;
    };

    purchaseHandler = () => {
        if (this.props.isAuth) {
            this.setState({purchasing: true});
        } else {
            this.props.onSetAuthRedirectPath("/checkout");
            this.props.history.push("/auth");
        };
    };

    purchaseCancelHandler = () => this.setState({purchasing: false});

    purchaseContinueHandler = () => {
        this.props.onInitPurchased();
        this.props.history.push("/checkout");
    };

    render() {
        const disabledInfo = {...this.props.ings};

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        };

        let orderSummary = null;

        let burger = this.props.error ? <Spinner /> : null;

        if (this.props.ings) {
            burger = (  <Aux>
                            <Burger ingredients={this.props.ings} />
                            <BuildControls
                                ingredientAdded={this.props.addIngredientHandler}
                                ingredientRemoved={this.props.removeIngredientHandler}
                                disabled={disabledInfo}
                                purchasable={this.updatePurchaseState(this.props.ings)}
                                ordered={this.purchaseHandler}
                                currentPrice={this.props.totalPrice.toFixed(2)}
                                isAuth={this.props.isAuth}
                            />                        
                        </Aux>
                    );

            orderSummary = <OrderSummary
                                ingredients={this.props.ings}
                                purchaseCancelled={this.purchaseCancelHandler}
                                purchaseContinued={this.purchaseContinueHandler}
                                total={this.props.totalPrice}
                            />
        };

        return(
            <Aux>
                <Modal 
                    show={this.state.purchasing}
                    modalClosed={this.purchaseCancelHandler}
                >
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    };
};

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuth: state.auth.token !== null
    };
};

const mapDispacthToProps = dispatch => {
    return {
        addIngredientHandler: (ingredient) => dispatch(actions.addIngredient(ingredient)),
        removeIngredientHandler: (ingredient) => dispatch(actions.removeIngredient(ingredient)),
        initIngredients: () => dispatch(actions.initIngredients()),
        onInitPurchased: () => dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    };
};

export default connect(mapStateToProps, mapDispacthToProps)(withErrorHandler(BurgerBuilder, axios));