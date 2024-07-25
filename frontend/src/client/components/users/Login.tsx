import { ChangeEvent, FC, useState } from "react"
import { StyledLogin } from "./Login.styled";
import { useNavigate } from "react-router-dom";

interface IProps {
    login(input: any): any
    currentUrl: string
}

const Login: FC<IProps> = ({login, currentUrl}) => {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        email: '',
        password: ''
    });
    const [errorMessage, setErrorMessage] = useState('');
    const [invalidLogin, setInvalidLogin] = useState(false);

    const onChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const { target: {name, value}} = e;
        if (name) {
            setValues((prevValues: any) => ({
                ...prevValues,
                [name]: value
            }));
        }
    }

    const handleSubmit =  async (user: any): Promise<void> => {
        const response = await login(user);
        if (response.error) {
            setInvalidLogin(true)
            setErrorMessage(response.message);
        } else {
            navigate(currentUrl || "/")
        }
    }

    return (
        <>
            <StyledLogin>
                <div className="wrapper">
                    {invalidLogin && <div className="alert">{errorMessage}</div>}
                    <div className="form">
                        <p>
                            <input
                                autoComplete="off"
                                type="email"
                                className="email"
                                name="email"
                                placeholder="Email"
                                onChange={onChange}
                                value={values.email}
                            />
                        </p>
                        <p>
                            <input
                                autoComplete="off"
                                type="password"
                                className="password"
                                name="password"
                                placeholder="password"
                                onChange={onChange}
                                value={values.password}
                            />
                        </p>
                        <div className="actions">
                            <button name="login" onClick={() => handleSubmit(values)}>
                                Login
                            </button>
                        </div>
                    </div>
                </div>
            </StyledLogin>
        </>
    )
}

export default Login;