import {Button, Form, Image, Container} from 'react-bootstrap';
import { useEffect, useState } from 'react';
import publicationService from '../../services/publication.service';
import { useNavigate, useParams } from 'react-router-dom';
import '../../styles/components/parts/css/button_custom.css'
import '../../styles/components/parts/css/box_shadow_custom.css'


function Publication_Forms()
{
    const navigate = useNavigate()
    const [txt, setTxt] = useState('')
    const [file, setFile] =useState({})
    const [imgFile, setImgFile] = useState({})
    const [imgURL, setImgURL] = useState('')

    const param = useParams()

    const token = JSON.parse(localStorage.getItem('user')).accessToken
            let headers = {
                headers: {
                    'Authorization' : `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
        }   

    useEffect(() => {
        
        if(param.id != null || undefined)
        {
            //appel api getOne en fonction du parametre
            publicationService.getOne(param.id, headers)
            .then((res) =>{
                setTxt(res.text)
                setImgURL(res.urlImg)
            })
        }
        else{
            console.log(param.id)
            //init tout a 0
            setTxt('')
            setImgURL('')
        }
    }, [])
    const onNewTxt = (e) => {
        setTxt(e.target.value)
    }
    const onNewImg = (e) => {
        setFile(e.target.files[0])

        setImgFile(file)

        
        setImgURL(URL.createObjectURL(e.target.files[0]))
    }

    const handleSubmit= (e) => {
        console.log()
        if (param.id == undefined)
        {
            console.log('creation')
            newPublication(e)
        }
        else
        {
            console.log('modification')
            modifyPublication(e)
        }
    }
    const newPublication = () => {
        const fData = new FormData()
        
        fData.append("text", txt)
        fData.append("image", file)
        publicationService.newPublication(fData, headers)
        .then(navigate("/"))
        
    }

    const modifyPublication = () => {
        const fData = new FormData()
        
        fData.append("text", txt)
        fData.append("image", file)
        publicationService.modifyOne(param.id ,fData, headers)
        .then(navigate("/"))
    }

    return(
    <Container className='d-flex flex-column'>
        <Form className='d-flex flex-column justify-direction-evenly' onSubmit={handleSubmit} id="newPost" encType='multipart/form-data'>
            <Form.Group className='my-4 box_custom'>
                <Form.Label htmlFor='texte'>Message</Form.Label>
                <Form.Control as="textarea" 
                className='box_custom' 
                id='texte' 
                name='texte' 
                value={txt} 
                onChange={onNewTxt}
                />
            </Form.Group>
            <Form.Group className='my-4 d-flex flex-column'>
                <Form.Label className='my-1' htmlFor='img'>Image</Form.Label>
                <Form.Control 
                type="file"
                name='image'
                className='my-1 box_custom' 
                onChange={onNewImg}
                 id='img'
                 />
                <Image className='mx-auto  my-1 h-100 w-75' src={imgURL} />
            </Form.Group>
            <Button className='my-4 btn-custom' type='submit'>Send</Button>
        </Form>
    </Container>
    )
}

export default Publication_Forms