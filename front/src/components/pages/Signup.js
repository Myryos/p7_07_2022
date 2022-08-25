import { useState, useRef, useEffect } from 'react'
import  useAuth  from '../../hooks/useAuth'
import authService from '../../services/auth.service'
import { useNavigate } from 'react-router-dom'
import {Button, Form, Container} from 'react-bootstrap'
import axios  from '../../api/axios'
import '../../styles/components/parts/css/box_shadow_custom.css'
import '../../styles/components/parts/css/button_custom.css'

const passRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
const MailRegex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/
function  SignUp()
{
    const userRef = useRef();
    const errRef = useRef()
    
    const [mail, setMail] = useState('')
    const [isValid, setValid] = useState(false)
    const [userFocus, setUserFocus]  = useState(false)
    
    const [pass, setPass] = useState('')
    const [isStrong, setStrong] = useState(false)
    const [passFocus, setPassFocus] = useState(false)

    const [errMsg, setErrMsg] = useState('')

    useEffect(() => {
        userRef.current.focus()
    }, [])

    useEffect(() => {
        const r = MailRegex.test(mail)
        setValid(r)
    }, [mail])

    useEffect(() => {
        const r = passRegex.test(pass)
        setStrong(r)
    }, [pass])

    useEffect(() => {
        setErrMsg('')
    }, [mail,pass])

    const { auth, setAuth } = useAuth()
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        const v1 = MailRegex.test(mail)
        const v2 = passRegex.test(pass)

        if(!v1 || !v2)
        {
            setErrMsg('Entre Invalide')
            return;
        }
        authService.signup(mail, pass)
        .then(() => {
            authService.login(mail, pass)
            .then((res) => {
                setAuth({role: res.role, accessToken: res.accessToken})
                navigate('/')
            })
        })
    }

    return(
        <Container className='w-50'>
            <p ref={errRef} className={errMsg ? "error" : "d-none"} aria-live="assertive">{errMsg}</p>
            <Form className='mx-auto' onSubmit={handleSubmit}>
                <Form.Group className='m-3 mx-auto w-100'>
                    <Form.Label htmlFor='email'>Email</Form.Label>
                    <Form.Control id='email' 
                    type='email' 
                    placeholder='Enter Email' 
                    className='box_custom' ref={userRef}  
                    autoComplete="off" 
                    onChange={(e) => setMail(e.target.value)}
                    required 
                    aria-invalid={isValid ? "false" : "true"} 
                    aria-describedby="uidnote"
                    isValid={isValid ? true : false}
                    isInvalid={!isValid && mail.length > 0 ? true : false}
                    onFocus={() => {setUserFocus(true)}}
                    onBlur={() => {setUserFocus(false)}}
                    />
                    <Form.Control.Feedback type='invalid' id='uidnote'> Une adresse mail est requise</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className='m-3 mx-auto w-100'>
                    <Form.Label htmlFor='password'>Password</Form.Label>
                    <Form.Control type='password' 
                    id='password'
                    placeholder='Password'
                    className='box_custom' 
                    onChange={(e) => setPass(e.target.value)} 
                    required 
                    aria-invalid={isValid ? "false" : "true"}
                    ria-describedby="pwdnote"
                    isValid={isStrong ? true : false}
                    isInvalid={!isStrong && pass.length > 0 ? true : false}
                    onFocus={() => setPassFocus(true)}
                    onBlur={() => setPassFocus(false)}
                    />
                    <Form.Control.Feedback type='invalid' id='pwdnote'>Votre mot de passe doit conteniir les elements suivant : 8 charactere minimum, une majuscule, une minuscule, un chiffre et un charactere special</Form.Control.Feedback>
                </Form.Group>
                <Button  type='submit' className='m-3 mx-auto btn-custom' disabled={!isValid || !isStrong ? true : false}>Sign Up</Button> 
            </Form>
       </Container>
    )
}

export default SignUp