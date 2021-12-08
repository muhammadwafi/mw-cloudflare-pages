import { useState } from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Alert
} from 'reactstrap';
import useAuth from '../hooks/useAuth';
import Avatar from '../components/avatar/Avatar';
import useFetchSinglePost from '../hooks/useFetchSinglePost';
import { useMutation, useQueryClient } from 'react-query';
import Loading from '../components/loading/Loading';
import { useParams } from 'react-router-dom';
import Votes from '../components/votes/Votes';
import { toast } from 'react-toastify';
import ApiCall from '../service/ApiCall';
import { Link } from 'react-router-dom';


function PostDetail({ props }) {

  let params = useParams()
  const {
    data: postDetail,
    error,
    isError,
    isLoading,
  } = useFetchSinglePost(params.slug)

  const queryClient = useQueryClient()
  const [voteLoading, setVoteLoading] = useState(false);
  const postVotes = useMutation((data) => ApiCall.Posts.vote(data))

  const { user, isAuthenticated } = useAuth();

  const handleOnVotes = async (values) => {
    console.log(values);
    try {
      setVoteLoading(true)
      if (!isAuthenticated && !Object.keys(user).length) {
        toast.error('You must be logged in to vote!')
        return
      }
      const votesData = {
        username: user.username,
        postsId: postDetail?.data?.items?.id,
        votes: values
      }
      const res = await postVotes.mutateAsync(votesData)
      queryClient.invalidateQueries('posts')
      queryClient.invalidateQueries('popularPosts')
      queryClient.invalidateQueries('postDetail')
      toast.success(res.data.message)
    } catch (error) {
      error.response?.data?.errors?.forEach(item => {
        toast.error(item)
      })
    } finally {
      setVoteLoading(false)
    }
  }

  const parseContent = (text) => {
    return text.split('\n').map((str, index) => <p key={index}>{str}</p>)
  }

  return (
    <Card className="card-single" {...props}>
      {isLoading ? (
        <CardBody>
          <Loading />
        </CardBody>
      ) : isError ? (
        <CardBody>
          <Alert color="danger">Error: {error?.response?.data?.errors}</Alert>
        </CardBody>
      ) : (
        <>
          <CardHeader>
            <h3>{postDetail?.data?.items?.title}</h3>
          </CardHeader>
          {postDetail?.data?.items?.image && (
            <div className="card-img-wrapper">
              <img src={postDetail?.data?.items?.image.url} className="card-img-top" alt="Placeholder" />
            </div>
          )}
          <CardBody>
            {postDetail?.data?.items?.content && (
              <div className="posts-content">{parseContent(postDetail?.data?.items?.content)}</div>
            )}
          </CardBody>
          <CardFooter>
            <div className="content-footer">
              <Votes
                handleOnVotes={handleOnVotes}
                count={postDetail?.data?.items?.votes ? postDetail?.data?.items?.votes : 0}
                isLoading={voteLoading}
              />
              <Link to={`/${postDetail?.data?.items?.username}`}>
                <div className="d-flex align-items-center">
                  <Avatar size="sm" name={postDetail?.data?.items?.username} />
                  <div className="text-dark ms-2">{postDetail?.data?.items?.username}</div>
                </div>
              </Link>
            </div>
          </CardFooter>
        </>
      )}
    </Card>
  )
}

export default PostDetail;
