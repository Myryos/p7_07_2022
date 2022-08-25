import { useContext } from "react";
import AuthContext from '../contexts/Auth'

const useAuth = () => {
    const { auth } = useContext(AuthContext);
    return useContext(AuthContext)
}

export default useAuth