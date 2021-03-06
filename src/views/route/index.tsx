import React from "react";
import { Router, Switch, Route, RouteChildrenProps } from "react-router-dom";
import Search from "views/screens/search";
import Variant from "views/screens/variant";
import VariantEntity from "views/screens/variant/Entity";
import history from "utils/history";
import Layout from "components/Layout";
import RouteWrapper from "./RouteWrapper";

const AppRouter = (): React.ReactElement => {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/search">
          <Search />
        </Route>
        <Route exact path="/variant/:patientid">
          <Variant />
        </Route>
        <RouteWrapper
          exact
          path="/variant/entity/:hash/:tabid?"
          component={(
            props: RouteChildrenProps<{
              hash: string;
              tabid: string | undefined;
            }>
          ) => (
            <VariantEntity
              hash={props.match?.params.hash!}
              tabid={props.match?.params.tabid!}
            />
          )}
          layout={Layout}
        />
      </Switch>
    </Router>
  );
};

export default AppRouter;
