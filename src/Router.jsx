import React from "react";
import { Route, Switch } from "react-router-dom";
import { Home } from "./pages/Home";
import { AddProduct } from "./pages/AddProduct";

export const MainRoute = ({ createProduct }) => {
    return (
        <Switch>
            <Route path="/" exact>
                <Home />
            </Route>
            <Route path="/add-product">
                <AddProduct createProduct={createProduct} />
            </Route>
            <Route path="*">
                <h2>404</h2>
            </Route>
        </Switch>
    );
};
