import axios from '../api/axios'


class AuthService {
    signup(email, password)
    {
        return axios.post('api/auth/signup', {email: email, password: password})
    }

    login(email, password)
    {
        return axios.post('api/auth/login', JSON.stringify({email: email, password: password}))
        .then((res) => {
            if(res.data.accessToken)
                localStorage.setItem("user", JSON.stringify(res.data))
            return res.data
        })
        .catch((err) => {
            console.log(err.response.data.message)
        })
    }
    logout()
    {
        return localStorage.removeItem('user')
    }
    getUser()
    {
        const user = JSON.parse(localStorage.getItem('user'))
        if(user == null)
            return {}
        return  user
    }

}

export default new AuthService()