import React, { Component } from "react";
import Aux from "../../../hoc/Auxiliary/Auxiliary";
import Button from "../../UI/Button/Button";

class orderSummary extends Component {
    render() {
        let ingredientSummary = Object.keys(this.props.ingredients).map(igKey => {
            return  <li key={igKey}>
                        <span style={{textTransform: "capitalize"}}>{igKey}</span>: {this.props.ingredients[igKey]}
                    </li>
        });

        return(
            <Aux>
                <h3>Your Order:</h3>
                <p>A delicious burger with:</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <h3>Total: ${this.props.total.toFixed(2)}</h3>
                <p>Continue to checkout?</p>
                <Button 
                    btnType="Danger"
                    clicked={ this.props.purchaseCancelled}
                >
                CANCEL
                </Button>
                <Button 
                    btnType="Success"
                    clicked={this.props.purchaseContinued}
                >
                CONTINUE
                </Button>
            </Aux>
        );
    };
};

export default React.memo(orderSummary);