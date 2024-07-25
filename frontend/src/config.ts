type API = {
    uri: string
}
type Securtiy = {
    secretKey: string
    expiresIn: string
}

export const isProduction: boolean = process.env.NODE_ENV === 'production';
export const isDevelopment: boolean = !isProduction;

const devUrl = "localhost";
const prodUrl = "localhost";
export const PORT = 3000;
export const DEV_SERVER_PORT = 3001;
export const GRAPHQL_PORT = 4000;
export const GRAPHQL_SERVER = isDevelopment ? devUrl : prodUrl;

export const baseUrl: string = isProduction ? `https://${prodUrl}:${PORT}` : `http://${devUrl}:${PORT}`;
export const publicPath: string = isProduction ? '' : `http://${devUrl}:${DEV_SERVER_PORT}/`;

export const api: API = {
    uri: `http://${GRAPHQL_SERVER}:${GRAPHQL_PORT}/graphql`
}

export const security: Securtiy = {
    secretKey: process.env.SECURITY_SECRET_KEY || "",
    expiresIn: '7d'
}