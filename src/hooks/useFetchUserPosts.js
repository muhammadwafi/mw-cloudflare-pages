import { useQuery } from 'react-query';
import ApiCall from '../service/ApiCall';

const useFetchUserPosts = (user, page, sort) => {
  return useQuery(
    ['userPosts', user, page],
    () => ApiCall.Posts.getUserPosts(user, page, sort),
    { keepPreviousData: true, staleTime: 5000 }
  )
}

export default useFetchUserPosts;
