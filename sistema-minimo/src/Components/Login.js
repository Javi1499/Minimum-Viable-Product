import { React, useState, Fragment, useRef } from 'react'
import axios from 'axios';
import ReCAPTCHA from "react-google-recaptcha";
import PasswordStrengthBar from 'react-password-strength-bar';
import { setToken, initAxiosIntterceptos } from '../helpers';
initAxiosIntterceptos();
const Login = ({ setEstaLogueado, setEsAdmin }) => {
    const [estaRegistrado, setEstaRegistrado] = useState(true);
    const [error, setError] = useState({ error: false, mensaje: "" });
    const [captchaValido, setCaptchaValido] = useState(false);
    const [passwordSeguro, setPasswordSeguro] = useState(false);
    // const [passwordIguales, setPasswordIguales] = useState(false)
    const [datosLogin, setDatosLogin] = useState({
        email: "",
        password: ""
    });
    const [datosRegistro, setDatosRegistro] = useState({
        emailR: "",
        nombreR: "",
        passwordR: "",
        password2R: ""
    });
    const verificarScore = (score) => {

        if (score > 2) {
            setPasswordSeguro(true);
            return;
        } else {
            setPasswordSeguro(false);
        }

    }

    const confirmarPassword = async () => {
        if ((passwordR === password2R)) {

            return true;
        }
        return false;

    }
    const captcha = useRef(null);
    ///Function de captcha
    const captchaF = () => {
        if (captcha.current.getValue()) {
            setCaptchaValido(true);
        }
    }
    //Actualizar state de registro
    const actualizarStateRegisto = e => {
        setDatosRegistro({
            ...datosRegistro,
            [e.target.name]: e.target.value
        })
    }

    //Se actualiz el state con los datos ingresados 
    const actualizarState = e => {
        setDatosLogin({
            ...datosLogin,
            [e.target.name]: e.target.value
        })
    }

    const { email, password } = datosLogin;
    const { nombreR, emailR, passwordR, password2R } = datosRegistro;
    //Function para registrar
    const functionRegistro = async (e) => {
        //Deteiene el evento de enviar el formulario para entrar a la function
        e.preventDefault();
        let passwordIgual = await confirmarPassword();
        if (!passwordSeguro) {
            setError({ error: true, mensaje: "La contraseña no es segura. Recuerda incluir numeros, letras y minimo 8 caracteres " });
            setCaptchaValido(false);
            return;
        } else if (!passwordIgual) {
            setError({ error: true, mensaje: "Las contraseñas no coinciden" });
            setCaptchaValido(false);
            return;
        }
        await axios.post("https://mvp-system.herokuapp.com/auth/registro", { usuario: nombreR, password: passwordR, email: emailR });
        setEstaRegistrado(true);
        setDatosRegistro({
            emailR: "",
            nombreR: "",
            passwordR: "",
            password2R: ""
        })
        setError({ error: false });
        setPasswordSeguro(false);
    }

    //Function para iniciar sesion
    const functionIniciarSesion = async (e) => {
        e.preventDefault();
        if (email.trim() === '' || password.trim() === "") {
            setError({ error: true, mensaje: "Todos los campos son obligatorios" });
            captcha.current.reset();
            setCaptchaValido(false);
            return
        }
        else if (!captchaValido) {
            setError({ error: true, mensaje: "Comprueba que no eres un robot" });
            setCaptchaValido(false);
            return
        } else {
            const respuesta = await axios.post("https://mvp-system.herokuapp.com/auth/iniciarSesion", datosLogin);
            if (respuesta.data.status === 200) {
                setEstaLogueado(true);
                setCaptchaValido(false);
                setToken(respuesta.data.token);
                if (respuesta.data.data.rol === "admin") {
                    setEsAdmin(true);
                    localStorage.setItem('admin', true);
                    setError({ error: false })
                }
            } else {
                setError({ error: true, mensaje: respuesta.data.mensaje })
                captcha.current.reset();
                setCaptchaValido(false);
            }

        }
    }
    return (
        <Fragment >
            {(estaRegistrado) ?
                <div className="container">
                    <div className="u-full-width">
                        <div className="two-half column">
                            <h2>Inicia SESIÓN</h2>
                            {error.error ? <p className="alerta-error">{error.mensaje}</p> : null}

                            <form
                                onSubmit={functionIniciarSesion}
                            >
                                <label>Correo electrónico </label>
                                <input
                                    type="email"
                                    name="email"
                                    className="u-full-width"
                                    placeholder="canela@correo.com"
                                    onChange={actualizarState}
                                    value={email}
                                />
                                <label>Contraseña</label>
                                <input
                                    type="password"
                                    name="password"
                                    className="u-full-width"
                                    onChange={actualizarState}
                                    value={password}
                                />
                                <div className="recaptcha">
                                    <ReCAPTCHA
                                        ref={captcha}
                                        sitekey="6LdQHTcbAAAAAL1sW0omq5GWVrANim27SZzY7rIA"
                                        onChange={captchaF}
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="u-full-width button-primary">
                                    Iniciar SESIÓN</button>
                                <a
                                    onClick={() => {
                                        setEstaRegistrado(false);
                                        setError(false);
                                        setDatosRegistro({
                                            emailR: "",
                                            nombreR: "",
                                            passwordR: "",
                                            password2R: ""
                                        })
                                    }}
                                >Registrarse</a>
                            </form>
                        </div>
                    </div>
                </div>



                : <div>
                    <h2>Ingresa tus datos para registrarte</h2>
                    {error.error ? <p className="alerta-error">{error.mensaje}</p> : null}

                    <form
                        onSubmit={functionRegistro}
                    >
                        <label>Nombre</label>
                        <input
                        required
                            type="text"
                            name="nombreR"
                            className="u-full-width"
                            placeholder="Ej. Ricardo de Jesus"
                            onChange={actualizarStateRegisto}
                            value={nombreR}
                        />
                        <label>Correo electrónico</label>
                        <input
                        required
                            type="email"
                            name="emailR"
                            className="u-full-width"
                            placeholder="canela@correo.com"
                            onChange={actualizarStateRegisto}
                            value={emailR}
                        />
                        <label>Contraseña</label>
                        <input
                        required
                            type="password"
                            name="passwordR"
                            className="u-full-width"
                            onChange={actualizarStateRegisto}
                            value={passwordR}
                        />
                        <PasswordStrengthBar password={passwordR}
                            minLength={8}
                            minScore={2}
                            scoreWords={['Nada segura', 'Mala', 'Normal', 'Segura', 'Excelente']}
                            onChangeScore={score => {
                                verificarScore(score)

                            }}
                        />

                        <label>Confirma la contraseña</label>
                        <input
                        required
                            type="password"
                            name="password2R"
                            className="u-full-width"
                            onChange={actualizarStateRegisto}
                            value={password2R}
                        />
                        <button
                            type="submit"
                            className="u-full-width button-primary"
                        >
                            Registrarse
                        </button>

                        <a>¿Ya tienes cuenta?  <a
                            onClick={() => {
                                setEstaRegistrado(true);
                                setError(false)
                            }}
                        >Inicia sesión</a></a>
                    </form>
                </div>}

        </Fragment>
    );
}

export default Login;