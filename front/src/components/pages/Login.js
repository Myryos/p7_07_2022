import { useState, useRef, useEffect } from 'react'
import {Button, Form, Container} from 'react-bootstrap'
import { useNavigate} from 'react-router-dom'
import useAuth  from '../../hooks/useAuth'
import authService from '../../services/auth.service'
import '../../styles/components/parts/css/box_shadow_custom.css'
import '../../styles/components/parts/css/button_custom.css'

const LOG_IN_URL = 'api/auth/login'


function LogIn()
{
    const mailRef = useRef();


    const [mail, setMail] = useState('')
    const [password, setPasswrd]  = useState('')

    const [errMsg, setErrMsg] = useState('')
    const [isError, setError] = useState(false)

    useEffect(() => {
        mailRef.current.focus()
    }, [])

    useEffect(() => {
        setErrMsg('')
    }, [mail, password])

    const {auth, setAuth} = useAuth()
    const navigate = useNavigate()
    
    const handleLogin =  (e) =>
    {
        e.preventDefault()

        authService.login(mail, password)
        .then((res) => {
            setAuth({accessToken: res.accessToken})
            setMail('')
            setPasswrd('')
            navigate('/', {replace:true})
        })
        .catch((err) => {
            setErrMsg(JSON.stringify(err)) 
        })
    }
    return(
       <Container className='w-50'>
            <Form className='mx-auto' onSubmit={handleLogin}>
                <Form.Group className='m-3 mx-auto w-100'>
                    <Form.Label htmlFor='email'>Email</Form.Label>
                    <Form.Control
                    id='email'
                    type='email'
                    name='email'
                    ref={mailRef}
                    autoComplete='off'
                    placeholder='Enter Email' 
                    className='box_custom' 
                    onChange={ (e) => setMail(e.target.value)}
                    value={mail}
                    required
                    />
                </Form.Group>
                <Form.Group className='m-3 mx-auto w-100'>
                    <Form.Label htmlFor='password'>Password</Form.Label>
                    <Form.Control 
                    id='paswword'
                    name='password'
                    type='password' placeholder='Password' className='box_custom'
                    onChange={(e) => setPasswrd(e.target.value)}
                    value={password}
                    required
                    />
                </Form.Group>
                <p>{errMsg}</p>
                <Button className='m-3 mx-auto btn-custom' type='submit' >Log In</Button> 
            </Form>
       </Container>
    )
}

export default LogIn