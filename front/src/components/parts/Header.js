import { NavLink } from 'react-router-dom';
import {Image, Row, Col, Button} from 'react-bootstrap';
import logo from '../../assets/logo.svg';
import '../../styles/components/parts/custom_header.scss'
import  useAuth  from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom'
import authService from '../../services/auth.service';



function Header()
{
    const { auth, setAuth } = useAuth()
    const navigate = useNavigate()
    const handleLogout = () => {
        setAuth({})
        authService.logout()
        navigate('/login')
    }
    
    return (
        <nav className='navbar vw-100'>
            <Row xs={{cols: 1}} lg={{cols:2}} className='d-flex flex-column flex-lg-row w-100 flex-lg-nowrap'>
                <Col className='mx-auto p-3 my-3 d-flex justify-content-center justify-content-lg-start'>
                     <NavLink to='/' className='navbar-brand mx-auto'><Image src={logo} className='img-logo'/></NavLink>
                </Col>
                <Col className='me-4 d-flex justify-content-center justify-content-lg-end align-self-center'>
                    { Object.keys(auth).length > 0 && (<>
                        <NavLink to="/new-publication" className="mx-3"><Button className='navLink'>New</Button></NavLink>
                        <Button  className='navLink mx-3' onClick={handleLogout}>Log Out</Button>
                        </>)}
                    {
                       Object.keys(auth).length === 0  && (
                            <>
                                <NavLink to="login" className='mx-3'><Button className='navLink'>logIn</Button></NavLink>
                                <NavLink to='signup' className='mx-3'><Button className='navLink'>SignUp</Button></NavLink>
                            </>
                        )
                    }
                </Col>
            </Row>        
        </nav>
        
    )
}

export default Header