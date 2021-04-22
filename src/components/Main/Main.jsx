import React from "react";
import { Route, Switch } from "react-router-dom";
import { Home } from "../../pages/Home";
import { AddProduct } from "../../pages/AddProduct";

export const Main = () => {
    return (
        <Switch>
            <Route path="/" exact>
                <Home />
            </Route>
            <Route path="/add-product">
                <AddProduct />
            </Route>
            <Route path="*">
                <h2>404</h2>
            </Route>
        </Switch>
    );
};
