import { encrypt } from "@contentpi/lib";
import { IDataTypes, IUser } from "../types";

export default (sequelize: any, dataTypes: IDataTypes): IUser => {
    const user = sequelize.define('User', {
            id: {
                primaryKey: true,
                allowNull: false,
                type: dataTypes.UUID,
                defaultValue: dataTypes.UUIDV4()
            },
            username: {
                type: dataTypes.STRING,
                allowNull: false,
                unique: true,
                validate: {
                    isAlphanumeric: {
                        args: true,
                        msg: "The user just accepts alphanumeric characters"
                    },
                    len: {
                        args: [4, 20],
                        msg: "The username must be from 4 to 20 characters"
                    }
                }
            },
            password: {
                type: dataTypes.STRING,
                allowNull: false
            },
            email: {
                type: dataTypes.STRING,
                allowNull: false,
                unique: true,
                validate: {
                    isEmail: {
                        args: true,
                        msg: "Invalid email"
                    }
                }
            },
            role: {
                type: dataTypes.STRING,
                allowNull: false,
                defaultValue: "user"
            },
            active: {
                type: dataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false
            }
        },
        {
            hooks: {
                beforeCreate: (user: IUser): void => {
                    user.password = encrypt(user.password)
                }
            }
        }
    );

    return user;
}