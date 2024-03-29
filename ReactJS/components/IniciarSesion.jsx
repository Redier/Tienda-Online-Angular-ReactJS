// dependencias
import React from 'react';
import * as request from 'superagent';
import { Redirect } from 'react-router-dom';

class IniciarSesion extends React.Component {
    constructor() {
        super();

        this.state = {
            mostrarErrorCorreo: 'ocultar-elemento',
            mostrarErrorContrasena: 'ocultar-elemento',
            mostrarErrorForm: 'ocultar-elemento',
            msnErrorForm: 'Error desconocido',
            isUserValid: false
        }

    }

    render() {
        const { isUserValid } = this.state;
        if (isUserValid) {
            return (
                <Redirect to="/catalogo" />
            )
        }
        return (
            <div className="container-login">
                <div className="form-login">
                    <h1>Inicia Sesión</h1>
                    <form id="form-login">
                        <div className="campo-formulario">
                            <label htmlFor="correo-input">Correo electrónico *</label>
                            <input
                                type="email"
                                id="correo-input"
                                name="correo-input"
                                required pattern="[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?"
                                value="redi@hotmail.com"
                            />
                            <span className={this.state.mostrarErrorCorreo}>Digita un correo electrónico</span>
                        </div>
                        <div className="campo-formulario">
                            <label htmlFor="contrasena-input">Contraseña *</label>
                            <input
                                type="password"
                                id="contrasena-input"
                                name="contrasena-input"
                                required
                                value="12345"
                            />
                            <span className={this.state.mostrarErrorContrasena}>Digita una contraseña</span>
                        </div>
                        <span className={this.state.mostrarErrorForm}>{this.state.msnErrorForm}</span>
                        <button className="btn btn-success" type="button" onClick={this.validarUsuario.bind(this)}>Ingresar</button>
                    </form>
                </div>
            </div>
        );
    }

    // Oculta los mensajes de error.

    ocultarMsnError() {
        this.setState({
            mostrarErrorCorreo: 'ocultar-elemento',
            mostrarErrorContrasena: 'ocultar-elemento',
            mostrarErrorForm: 'ocultar-elemento',
            msnErrorForm: 'Error desconocido'
        });
    }

    // Valida el usuario del formulario.

    validarUsuario() {
        this.ocultarMsnError();
        let formularioLogin = document.getElementById("form-login");
        let inputCorreo = formularioLogin['correo-input'];
        if (!inputCorreo.checkValidity()) {
            this.setState({
                mostrarErrorCorreo: 'mostrar-elemento-block'
            });
        }
        let inputContrasena = formularioLogin['contrasena-input'];
        if (!inputContrasena.checkValidity()) {
            this.setState({
                mostrarErrorContrasena: 'mostrar-elemento-block'
            });
        }
        if (inputContrasena.checkValidity() && inputCorreo.checkValidity()) {
            let correo = inputCorreo.value;
            let pass = inputContrasena.value;
            request
                .get('https://tiendaonline-33689.firebaseio.com/Usuarios.json')
                .set('Content-Type', 'application/json')
                .end((err, res) => {
                    console.log('Usuarios FireBase: ', res.body);
                    let usuarios = res.body;
                    let usuario = undefined;
                    for (var index = 0; index < usuarios.length; index++) {
                        var element = usuarios[index];
                        if (element.correo === correo && element.contrasena == pass) {
                            usuario = element;
                            break;
                        }
                    }
                    if (undefined == usuario) {
                        this.setState({
                            mostrarErrorForm: 'mostrar-elemento-block',
                            msnErrorForm: 'Usuario no encontrado'
                        });
                    } else {
                        this.setState({
                            isUserValid: true
                        });
                    }
                })

        }
    }
}

export default IniciarSesion;
