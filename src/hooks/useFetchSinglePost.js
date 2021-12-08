import { useQuery } from 'react-query';
import ApiCall from '../service/ApiCall';

const useFetchSinglePost = (slug) => {
  return useQuery(
    ['postDetail', slug],
    () => ApiCall.Posts.getSinglePost(slug)
  )
}

export default useFetchSinglePost;
