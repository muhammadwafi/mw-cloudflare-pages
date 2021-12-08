import { Alert } from 'reactstrap';
import Avatar from '../components/avatar/Avatar';
import useFetchSingleUser from '../hooks/useFetchSingleUser';
import Loading from '../components/loading/Loading';
import { useParams } from 'react-router-dom';
import UserPosts from './partials/UserPosts';


function Profile({ props }) {

  let params = useParams()
  const {
    data: userDetail,
    error,
    isError,
    isLoading,
  } = useFetchSingleUser(params.username)

  return (
    <div className="" {...props}>
      {isLoading ? (
        <Loading />
      ) : isError ? (
        <Alert color="danger">Error: {error?.response?.data?.errors}</Alert>
      ) : (
        <>
          <div className="d-flex align-items-center mb-4">
            <div className="me-4 mb-2">
              <Avatar size="lg" name={userDetail?.data?.items?.username}/>
            </div>
            <div className="mb-2">
              <h3>{userDetail?.data?.items?.username}</h3>
              <div>Member since {new Intl.DateTimeFormat("id", {
                year: "numeric",
                month: "short",
                day: "2-digit"
                }).format(new Date(userDetail?.data?.items?.created_at))}</div>
            </div>
          </div>
          <div>
            <UserPosts username={params.username}/>
          </div>
        </>
      )}
    </div>
  );
}

export default Profile;
