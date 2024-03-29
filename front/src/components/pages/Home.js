import { useEffect, useState } from "react";
import { Button, Container, Card } from "react-bootstrap"
import { NavLink } from 'react-router-dom';
import publicationService from "../../services/publication.service";
import '../../styles/components/pages/css/Home.css'


function Home()
{
    const [datas, setData] = useState([])
    useEffect(() => {
        const token = JSON.parse(localStorage.getItem('user')).accessToken
        let headers = {
            headers: {
                'Authorization' : `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        }
        publicationService.getAll(headers)
        .then((res) => {
            setData(res)
    })
    }, [])
    return (
        <Container className="d-flex flex-row flex-wrap my-3">
            {datas.map((item, i) => {
                return <NavLink to={`/publication/${item._id}`} className='w-25 h-25 m-3 shadow' key={item._id}><Card>
                    <Card.Img src={item.urlImg}/>
                    <Card.ImgOverlay><Card.Title className="cardTitle"><span>{i + 1}</span></Card.Title></Card.ImgOverlay>
                </Card></NavLink>
            })}
        </Container>)
    
}

export default Home