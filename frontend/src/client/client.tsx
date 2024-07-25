import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import ReactDOM from 'react-dom/client'
import * as config from "../config";
import AppRoutes from "./AppRoutes";

const client = new ApolloClient({
    uri: config.api.uri,
    cache: new InMemoryCache()
});

ReactDOM.createRoot(document.getElementById('root')!).render(
    <ApolloProvider client={client}>
        <AppRoutes/>
    </ApolloProvider>
)