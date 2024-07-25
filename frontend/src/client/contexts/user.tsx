import { useMutation, useQuery } from "@apollo/client";
import { getGraphQlError, redirectTo } from "@contentpi/lib";
import { createContext, FC, ReactElement, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import GET_USER_QUERY from "../graphql/user/getUser.query";
import LOGIN_MUTATION from "../graphql/user/login.mutation";

interface IUserContext {
    login(input: any): any
    connectedUser: any
}

interface IProps {
    page?: string
    children: ReactElement
}

export const UserContext = createContext<IUserContext>({
    login: () => null,
    connectedUser: null
});

const UserProvider: FC<IProps> = ({page = "", children}) => {
    const [cookies, setCookie] = useCookies();
    const [connectedUser, setConnectedUser] = useState(null);
    const [loginMutation] = useMutation(LOGIN_MUTATION);
    const { data: dataUser } = useQuery(GET_USER_QUERY, {
        variables: {
            accessToken: cookies.accessToken || ''
        }
    });

    useEffect(() => {
        if (!dataUser) return;

        if (!dataUser.getUser.id && page != "login") {
            redirectTo(`/login?redirectTo=/${page}`)
        } else {
            setConnectedUser(dataUser.getUser);
        }
    }, [dataUser, page])

    async function login(input: {email: string, password: string}): Promise<any> {
        try {
            const { data: dataLogin} = await loginMutation({
                variables: {
                    email: input.email,
                    password: input.password
                }
            })

            if (dataLogin) {
                setCookie('accessToken', dataLogin.login.token, {path: "/"});
                return dataLogin.login.token;
            }
        } catch (err) {
            return getGraphQlError(err);
        }
    }

    const context = {
        login: login,
        connectedUser: connectedUser
    }

    return <UserContext.Provider value={context}>{children}</UserContext.Provider>
}

export default UserProvider;