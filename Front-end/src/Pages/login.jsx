import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Usercontext } from "../context/AuthProvider";
import 'bootstrap/dist/css/bootstrap.css';
import {
  Container,
  DivWrapp,
  BlmdWrapp,
  BlmdContiner,
  BlmdForm,
  BlmdLine,
  FormInput,
  BtnSubmit,
  DivInputWrapp,
  Inp,
  ErrorMsg,
  H1
} from '../assets/styles/login';



const Login = () => {


  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const { login, setAuthenticated, setToken } = Usercontext()
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrMsg('');
    console.log('Attempting login with:', { email, password });
    
    try {
      const response = await login(email, password);
      const { status, data } = response;
      if (status === 200 || status === 204) {
        setAuthenticated(true);
        if (data.token) {
          setToken(data.token);
        }
        navigate('/dashboard');
      }
    } catch (error) {
      console.error("Loginnn error :", error);
      if (error.response) {
        console.log('statuss:' + error.response.status);
        switch (error.response.status) {
          case 401:
            setErrMsg('Non autorisé. Vérifiez vos identifiants "Email ou Password"');
            break;
          case 400:
            setErrMsg('Adresse email ou mot de passe manquant');
            break;
          case 500:
            setErrMsg('Un problème est survenu sur le serveur. Veuillez réessayer plus tard.');
            break;
        }
      } else if (!error.response) {
        setErrMsg('Aucune réponse du serveur');

      } else {
        setErrMsg('Échec de la connexion. Veuillez réessayer');
      }


    }
  }

  return (
    <>
      <Container className="container">
        <DivWrapp className={`col-md-4 col-md-offset-3 col-xs-12`}>
          <BlmdWrapp>
            <BlmdContiner>
              <form onSubmit={handleSubmit} className="clearfix was-validated" id="login-form">
                <H1>Login</H1>
                <DivInputWrapp className="col-md-12">
                  <BlmdForm className="input-group">
                    <BlmdLine as={Inp}>
                      <FormInput
                        name="username"
                        type="email"
                        className="form-control form-control-lg bg-light fs-6"
                        id="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                        placeholder="Enter your email"
                      />
                    </BlmdLine>
                  </BlmdForm>
                  <BlmdForm className="input-group">
                    <BlmdLine as={Inp}>
                      <FormInput
                        name="password"
                        type="password"
                        className="form-control form-control-lg bg-light fs-6"
                        id="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                        placeholder="Enter your password"
                      />
                    </BlmdLine>
                  </BlmdForm>
                </DivInputWrapp>
                <div className="col-md-12 text-center">
                  <BtnSubmit type="submit" className={`btn btn-blmd ripple-effect btn-dark btn-lg btn-block`}>Login</BtnSubmit>
                  {errMsg && <ErrorMsg>{errMsg}</ErrorMsg>}
                </div>
              </form>
            </BlmdContiner>
          </BlmdWrapp>
        </DivWrapp>
      </Container>

    </>

  );
};

export default Login;
