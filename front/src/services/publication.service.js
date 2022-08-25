import axios from "../api/axios"


class PublicationService {
    newPublication = (data, headers) => {
        return axios.post('/api/publication/', data, headers)
    }
    likeHandler = (id, data, header) => {
        return axios.post(`/api/publication/${id}/like`, data, header)
    }
    getAll = (headers) => {
        return axios.get("/api/publication/", headers)
        .then((res) => {
            return res.data
        })
    }
    getOne = (id, headers) => {
        return axios.get(`/api/publication/${id}`, headers)
        .then((res) => {
            return res.data
        })
    }
    modifyOne = (id, data, header) => {
        return axios.put(`/api/publication/${id}`, data, header)
    }
    deleteOne = (id, header) => {
        return axios.delete(`/api/publication/${id}`, header)
    }
  
}

export default new PublicationService()
