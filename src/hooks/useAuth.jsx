import { useSelector } from 'react-redux';
export const useAuth = () => {
   const { user, token, isLoading } = useSelector((state) => state.auth);
   return { user, token, isLoading };
};
