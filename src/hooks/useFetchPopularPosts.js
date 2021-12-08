import { useQuery } from 'react-query';
import ApiCall from '../service/ApiCall';

const useFetchPopularPosts = () => {
  const page = 1
  const sort = 'popularity'
  return useQuery(
    ['popularPosts', page],
    () => ApiCall.Posts.getPosts(page, sort)
  )
}

export default useFetchPopularPosts;
