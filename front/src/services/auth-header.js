export default function authHeader() {
    const user = JSON.parse(localStorage.getItem('user'))
    console.log(user)
    if(user && user.accessToken)
        return {
            authorization: `Bearer ${user.accessToken }`,
            'x-access-token': user.accessToken
        }
    else  return {}
}