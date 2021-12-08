import { useQuery } from 'react-query';
import ApiCall from '../service/ApiCall';

const useFetchPosts = (page, sort) => {
  return useQuery(
    ['posts', page],
    () => ApiCall.Posts.getPosts(page, sort),
    { keepPreviousData: true, staleTime: 5000 }
  )
}

export default useFetchPosts;
