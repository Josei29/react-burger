import React from "react";
import NavigationItem from "./NavigationItem/NavigationItem";
import classes from "./NavigationItems.module.css";

const navigationItems = ( props ) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem
            link="/"
        >
        Burger Builder
        </NavigationItem>
        {props.isAuth ?
            <NavigationItem
                link="/orders"
            >
            Orders
            </NavigationItem>
            :
            null
        }
        {!props.isAuth ? 
            <NavigationItem
                link="/auth"
            >
            Sign In
            </NavigationItem>
            :   
            <NavigationItem
                link="/logout"
            >
            Logout
            </NavigationItem>
        }
    </ul>
);

export default navigationItems;