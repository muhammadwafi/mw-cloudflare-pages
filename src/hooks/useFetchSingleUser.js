import { useQuery } from 'react-query';
import ApiCall from '../service/ApiCall';

const useFetchSingleUser = (username) => {
  return useQuery(
    ['userDetail', username],
    () => ApiCall.User.getUserDetail(username)
  )
}

export default useFetchSingleUser;
