import { React, useState, Fragment, useRef } from 'react'
import axios from 'axios';
import ReCAPTCHA from "react-google-recaptcha";
import {setToken} from '../helpers'
const Login = ({ setEstaLogueado }) => {
    const [estaRegistrado, setEstaRegistrado] = useState(true);
    const [error, setError] = useState({ error: false, mensaje: "" });
    const [captchaValido, setCaptchaValido] = useState(false);
    const [datosLogin, setDatosLogin] = useState({
        email: "",
        password: "password"
    });
    const [datosRegistro, setDatosRegistro] = useState({
        emailR: "",
        nombreR: "",
        passwordR: "",
        password2R: ""
    });

    const captcha = useRef(null);
    ///Function de captcha
    const captchaF = () => {
        if (captcha.current.getValue()) {
            console.log("No es un robot")
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
        console.log(datosLogin)
        const respuesta = await axios.post("http://localhost:4006/auth/registro", {usuario:nombreR, password:passwordR, email: emailR});
        setEstaRegistrado(true);
        console.log(respuesta)
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
            console.log("entro")
            const respuesta = await axios.post("http://localhost:4006/auth/iniciarSesion", datosLogin);
            console.log(respuesta)
            if (respuesta.data.status === 200) {
                console.log(respuesta.data)
                setEstaLogueado(true);
                setCaptchaValido(false);
                console.log("se logueo");
                setToken(respuesta.data.token)
              //  localStorage.setItem('token', respuesta.data.token)
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
                <div className="row one-half column">
                    <h2>Inicia sesion</h2>
                    {error.error ? <p className="alerta-error">{error.mensaje}</p> : null}

                    <form
                        onSubmit={functionIniciarSesion}
                    >
                        <label>Correo electronico </label>
                        <input
                            type="email"
                            name="email"
                            className="u-full-width"
                            placeholder="canela@correo.com"
                            onChange={actualizarState}
                            value={email}
                        />
                        <label>Contrasenia</label>
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
                            Iniciar sesion</button>
                        <a
                            onClick={() => { setEstaRegistrado(false) }}
                        >Registrarse</a>
                    </form>
                </div>
                : <div>
                    <h2>Ingresa tus datos para registrarte</h2>
                    {error.error ? <p className="alerta-error">Todos los campos son obligatorios</p> : null}

                    <form
                        onSubmit={functionRegistro}
                    >
                        <label>Nombre</label>
                        <input
                            type="text"
                            name="nombreR"
                            className="u-full-width"
                            placeholder="Ej. Ricardo de Jesus"
                            onChange={actualizarStateRegisto}
                            value={nombreR}
                        />
                        <label>Correo electronico </label>
                        <input
                            type="email"
                            name="emailR"
                            className="u-full-width"
                            placeholder="canela@correo.com"
                            onChange={actualizarStateRegisto}
                            value={emailR}
                        />
                        <label>Contrasenia</label>
                        <input
                            type="password"
                            name="passwordR"
                            className="u-full-width"
                            onChange={actualizarStateRegisto}
                            value={passwordR}
                        />
                        <label>Confirma la contrasenia</label>
                        <input
                            type="password"
                            name="password2R"
                            className="u-full-width"
                            onChange={actualizarStateRegisto}
                            value={password2R}
                        />
                        <button
                            type="submit"
                            className="u-full-width button-primary">
                            Registrarse</button>
                    </form>
                </div>}

        </Fragment>
    );
}

export default Login;