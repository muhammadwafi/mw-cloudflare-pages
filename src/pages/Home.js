import { useState } from 'react';
import { Row, Col, Alert } from 'reactstrap';
import useFetchPosts from '../hooks/useFetchPosts';
import CardPosts from '../components/card/CardPosts';
import PostsLoader from '../components/loading/PostsLoader';
import PopularPostsWidget from './partials/PopularPosts';
import PaginatePosts from '../components/pagination/PaginatePosts';

function Home() {

  const [page, setPage] = useState(1)

  const {
    data: posts,
    isFetching,
    isError,
    isLoading,
    error,
  } = useFetchPosts(page, 'date')
  
  return (
    <div className="posts">
      <Row className="justify-content-center">
        <Col xs="12" md="8">
          {isLoading || isFetching ? (
            <>
              {[...Array(3)].map((_, i) =>
                <PostsLoader key={i}/>
              )}
            </>
          ) : isError ? (
            <Alert color="danger">Error: {error?.response?.data?.errors}</Alert>
          ) : (
            <>
              {posts?.data?.items.map((item, index) => (
                <CardPosts item={item} key={index}/>
              ))}
              <div className="justify-content-center">
                <PaginatePosts items={posts} page={page} setPage={setPage} />
              </div>
            </>
          )}
        </Col>
        <Col xs="12" md="4">
          <PopularPostsWidget />
        </Col>
      </Row>
    </div>
  );
}

export default Home;
