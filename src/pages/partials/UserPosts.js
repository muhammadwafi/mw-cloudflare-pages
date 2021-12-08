import { Row, Col, Alert } from 'reactstrap';
import { useState } from 'react';
import useFetchUserPosts from '../../hooks/useFetchUserPosts';
import CustomCard from '../../components/card/CustomCard';
import Loading from '../../components/loading/Loading';
import PaginatePosts from '../../components/pagination/PaginatePosts';

function UserPosts({ username, ...props }) {

  const [page, setPage] = useState(1)
  const {
    data: userPosts,
    isFetching,
    isError,
    isLoading,
    error,
  } = useFetchUserPosts(username, page, 'date')
  
  return (
    <>
      {isLoading || isFetching ? (
        <Loading/>
      ) : isError ? (
        <Alert color="danger">Error: {error?.response?.data?.errors}</Alert>
      ) : (        
        <div {...props}>
          <Row>
            {userPosts?.data?.items.map((item, index) => (
              <Col xs="12" md="4" className="mb-3" key={index}>
                <CustomCard item={item} />
              </Col>
            ))}
          </Row>
          <div className="justify-content-center mt-3">
            <PaginatePosts items={userPosts} page={page} setPage={setPage}/>
          </div>
        </div>
      )}
    </>
  );
}

export default UserPosts;
