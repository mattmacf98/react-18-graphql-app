import { doLogin, getUserBy } from '../../lib/auth'
import { getUserData } from '../../lib/jwt'
import { ICreateUserInput, ILoginInput, IModels, IToken, IUser } from '../../types'

export default {
    Query: {
        getUsers: (_parent: any, _args: any, context: {models: IModels}): IUser[] => context.models.User.findAll(),
        getUser: async (_parent: any, args: {accessToken: string}, context: {models: IModels}): Promise<any> => {
            const connectedUser = await getUserData(args.accessToken);
            if (connectedUser) {
                const user = await getUserBy(
                    {
                        id: connectedUser.id,
                        email: connectedUser.email,
                        active: connectedUser.active
                    },
                    context.models
                );

                if (user) {
                    return {...connectedUser};
                }
            } else {
                return {
                    id: "",
                    username: "",
                    email: "",
                    role: "",
                    active: false
                };
            }
        }
    },
    Mutation: {
        createUser: (_parent: any, args: {input: ICreateUserInput}, context: {models: IModels}): IUser => context.models.User.create({...args.input}),
        login: (_parent: any, args: {input: ILoginInput}, context: {models: IModels}): Promise<IToken> => doLogin(args.input.email, args.input.password, context.models)
    }
}