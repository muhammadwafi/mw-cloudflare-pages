import { Alert } from 'reactstrap';
import useFetchPopularPosts from '../../hooks/useFetchPopularPosts';
import CardHorizontal from '../../components/card/CardHorizontal';
import PostsLoader from '../../components/loading/PostsLoader';

function PopularPostsWidget({ props }) {

  const {
    data: popularPosts,
    isFetching,
    isError,
    isLoading,
    error,
  } = useFetchPopularPosts()
  
  return (
    <>
      {isLoading || isFetching ? (
        <div>
          {[...Array(3)].map((_, i) =>
            <PostsLoader small key={i}/>
          )}
        </div>
      ) : isError ? (
        <Alert color="danger">Error: {error?.response?.data?.errors}</Alert>
      ) : (
        <div className="sidenav-sticky" {...props}>
          <h5>Popular posts</h5>
          {popularPosts?.data?.items.map((item, index) => (
            <CardHorizontal item={item} key={index}/>
          ))}
        </div>
      )}
    </>
  );
}

export default PopularPostsWidget;
