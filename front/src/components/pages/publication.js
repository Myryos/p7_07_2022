import { useEffect, useState } from 'react'
import {Button, Container, Image} from 'react-bootstrap'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import publicationService from '../../services/publication.service'
import useAuth from '../../hooks/useAuth'
import jwt from 'jwt-decode'
import 'bootstrap-icons/font/bootstrap-icons.css'
import '../../styles/components/parts/css/button_custom.css'
import '../../styles/components/parts/css/likeButton.css'


function Publication()
{
    const param = useParams()
    const auth = useAuth()
    const navigate = useNavigate()
   
    const [data, setData] = useState([])
    const [isLoaded, setLoad] = useState(true)
    const [like,setlike] = useState(0)
    const [dislike, setdislike] = useState(0)

    const [likeactive, setlikeactive] = useState(false)
    const [dislikeactive, setdislikeactive] = useState(false)

    const [isAuthorized, setAuthorize] = useState(false)

    const token = JSON.parse(localStorage.getItem('user')).accessToken
    let headers = {
        headers: {
            'Authorization' : `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    }

    useEffect(() => {
        if(isLoaded)
        {
            publicationService.getOne(param.id, headers)
            .then((res) => {
                setData(res)
                if(jwt(auth.auth.accessToken).userId === res.userId || JSON.stringify(auth.auth.role) === process.env.REACT_APP_ADMIN)  
                {
                    setAuthorize(true)
                }
                else
                {
                    setAuthorize(false)
                }
                res.usersLiked.map((user) =>
                {
                    if (user === jwt(auth.auth.accessToken).userId)
                    {
                        setlikeactive(true)
                        setdislikeactive(false)
                    }
                })
                res.usersDisliked.map((user) => {
                    if (user === jwt(auth.auth.accessToken).userId)
                    {
                        setlikeactive(false)
                        setdislikeactive(true)
                    }
                })
            })
           
            setlike(data.like)
            setdislike(data.dislike)
            setLoad(false)
        }


    }, [isLoaded, setLoad])
    const likef = () =>
    {
        let dataSend = {}
        if(likeactive && !dislikeactive)
        {
            setlikeactive(false)
            setlike(like-1)
            dataSend= {
                like : 0
            }
            publicationService.likeHandler(param.id, dataSend, headers)
        }
        if(!likeactive && !dislikeactive)
        {
            setlikeactive(true)
            setlike(like+1)
           dataSend = {
                like : 1
            }
            publicationService.likeHandler(param.id, dataSend, headers)
        }

    }
    const dislikef = () =>
    {
        let dataSend = {}
        if(dislikeactive && !likeactive)
        {
            setdislikeactive(false)
            setdislike(dislike-1)
            dataSend= {
                like : 0
            }
            publicationService.likeHandler(param.id, dataSend, headers)
        }
        if(!dislikeactive && !likeactive)
        {
            dataSend= {
                like : -1
            }
            setdislikeactive(true)
            setdislike(dislike+1)
            publicationService.likeHandler(param.id, dataSend, headers)
        }
    }

    const deleteBtn = () =>{
        publicationService.deleteOne(param.id, headers)
        .then(() => {
            navigate("/", { replace: true });
        })
        
    }
    
    return(
        <Container className='d-flex flex-column flex-lg-row flex-wrap justify-content-lg-start'>
            <Container>
                <NavLink to='/' className='link-return-arrow d-flex'><Button variant='link return-arrow m-auto d-flex justify-content-center'><i className="bi bi-arrow-left align-self-center"></i></Button></NavLink>
            </Container>
            <Container className='d-flex flex-column flex-lg-row justify-content-evenly'>
                <Container className='d-flex align-self-center align-self-lg-start  mx-1'>
                    <Image className='my-3 mx-auto shadow' src={data.urlImg}/>
                </Container>
                <Container className='d-flex align-items-center  m-1 align-self-center align-self-lg-end w-50 h-100 '>
                    <p className='mx-auto '>{data.text}</p>
                </Container>
            </Container>
            <Container className='d-flex flex-column flex-lg-row justify-content-evenly'>
                { isAuthorized && (
                    <Container className='align-self-lg-start my-3 mx-auto mx-lg-1 w-25 d-flex justify-content-evenly'>
                    <NavLink to={`/modify-publication/${param.id}`} className='mx-3 my-2'><Button className='btn-custom'>Modify</Button></NavLink>
                    <Button className='mx-3 my-2 btn-custom' onClick={deleteBtn}>Delete</Button>
                </Container>
                )}
                
                <Container className='justify-content-evenly align-self-lg-end my-3 mx-auto mx-lg-1 w-25 d-flex'>
                    <Button className={[likeactive ? 'likeActive' : null,'likeButton mx-3  my-2'].join(' ')} onClick={likef}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-hand-thumbs-up-fill" viewBox="0 0 16 16">
                            <path d="M6.956 1.745C7.021.81 7.908.087 8.864.325l.261.066c.463.116.874.456 1.012.965.22.816.533 2.511.062 4.51a9.84 9.84 0 0 1 .443-.051c.713-.065 1.669-.072 2.516.21.518.173.994.681 1.2 1.273.184.532.16 1.162-.234 1.733.058.119.103.242.138.363.077.27.113.567.113.856 0 .289-.036.586-.113.856-.039.135-.09.273-.16.404.169.387.107.819-.003 1.148a3.163 3.163 0 0 1-.488.901c.054.152.076.312.076.465 0 .305-.089.625-.253.912C13.1 15.522 12.437 16 11.5 16H8c-.605 0-1.07-.081-1.466-.218a4.82 4.82 0 0 1-.97-.484l-.048-.03c-.504-.307-.999-.609-2.068-.722C2.682 14.464 2 13.846 2 13V9c0-.85.685-1.432 1.357-1.615.849-.232 1.574-.787 2.132-1.41.56-.627.914-1.28 1.039-1.639.199-.575.356-1.539.428-2.59z"/>
                        </svg>{data.like > 0 && (<p>{data.like}</p>)}
                    </Button>
                    <Button  className={[dislikeactive ? 'dislikeActive' : null,'likeButton mx-3  my-2'].join(' ')} onClick={dislikef}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-hand-thumbs-down-fill" viewBox="0 0 16 16">
                            <path d="M6.956 14.534c.065.936.952 1.659 1.908 1.42l.261-.065a1.378 1.378 0 0 0 1.012-.965c.22-.816.533-2.512.062-4.51.136.02.285.037.443.051.713.065 1.669.071 2.516-.211.518-.173.994-.68 1.2-1.272a1.896 1.896 0 0 0-.234-1.734c.058-.118.103-.242.138-.362.077-.27.113-.568.113-.856 0-.29-.036-.586-.113-.857a2.094 2.094 0 0 0-.16-.403c.169-.387.107-.82-.003-1.149a3.162 3.162 0 0 0-.488-.9c.054-.153.076-.313.076-.465a1.86 1.86 0 0 0-.253-.912C13.1.757 12.437.28 11.5.28H8c-.605 0-1.07.08-1.466.217a4.823 4.823 0 0 0-.97.485l-.048.029c-.504.308-.999.61-2.068.723C2.682 1.815 2 2.434 2 3.279v4c0 .851.685 1.433 1.357 1.616.849.232 1.574.787 2.132 1.41.56.626.914 1.28 1.039 1.638.199.575.356 1.54.428 2.591z"/>
                        </svg>
                    </Button>
                </Container>
            </Container>
    
        </Container>
    )
       
}

export default Publication