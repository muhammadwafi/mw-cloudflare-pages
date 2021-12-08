import { useState } from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Dropdown,
  DropdownMenu,
  DropdownToggle,
  Button
} from 'reactstrap';
import useAuth from '../../hooks/useAuth';
import { useMutation, useQueryClient } from 'react-query';
import Avatar from '../avatar/Avatar';
import { toast } from 'react-toastify';
import { MoreVertical } from 'lucide-react';
import Votes from '../votes/Votes';
import ApiCall from '../../service/ApiCall';
import DeleteModal from '../modals/DeleteModal';
import { Link, useNavigate } from 'react-router-dom';
import { trimText } from '../../utils/utils';


function CardPosts({ item, ...props }) {

  const navigate = useNavigate()
  const [isOpen, setOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);

  const queryClient = useQueryClient()
  const [voteLoading, setVoteLoading] = useState(false);
  const postVotes = useMutation((data) => ApiCall.Posts.vote(data))

  const { user, isAuthenticated } = useAuth();

  const handleDropdown = () => setOpen(!isOpen);
  const handleOpenModal = () => setModalOpen(!isModalOpen);
  const handleOnVotes = async (values) => {
    try {
      setVoteLoading(true)
      if (!isAuthenticated && !Object.keys(user).length) {
        toast.error('You must be logged in to vote!')
        return
      }
      const votesData = {
        username: user.username,
        postsId: item.id,
        votes: values
      }
      const res = await postVotes.mutateAsync(votesData)
      queryClient.invalidateQueries('posts')
      queryClient.invalidateQueries('popularPosts')
      queryClient.invalidateQueries('userPosts')
      toast.success(res.data.message)
    } catch (error) {
      error.response?.data?.errors?.forEach(item => {
        toast.error(item)
      })
    } finally {
      setVoteLoading(false)
    }
  }
  
  return (
    <>
      <Card className="card-posts" {...props}>
        <CardHeader>
          <Link to={`/${item.username}`} className="align-items-center d-flex" tabIndex="0">
            <Avatar name={item.username} />
            <div className="ms-2">
              <div className="mb-1 text-dark">{item.username}</div>
              <div className="text-muted text-xs">
                {new Intl.DateTimeFormat("id", {
                year: "numeric",
                month: "short",
                day: "2-digit"
                }).format(new Date(item.created_at))}
              </div>
            </div>
          </Link>
          {user && isAuthenticated && user.username === item.username && (
          <div className="card-action">
            <Dropdown isOpen={isOpen} toggle={handleDropdown}>
              <DropdownToggle color="icon" className="btn-link">
                <MoreVertical />
              </DropdownToggle>
              <DropdownMenu end>
                <div role="button" className="dropdown-item" onClick={handleOpenModal}>
                  Delete
                </div>
              </DropdownMenu>
            </Dropdown>
          </div>
          )}
        </CardHeader>
        <Link className="posts-wrapper" to={`/posts/${item.slug}`} tabIndex="0">
          {item.image && (
            <div className="mt-3 card-img-wrapper">
              <img src={item.image.url} className="card-img-top" alt="Placeholder" />
            </div>
          )}
          <CardBody>
            <h3 className="posts-title">{trimText(item.title, 80)}</h3>
            {item.content && (
              <div className="posts-content">{trimText(item.content, 180)}</div>
            )}
          </CardBody>
        </Link>
        <CardFooter>
          <Votes
            handleOnVotes={handleOnVotes}
            count={item?.votes ? item.votes : 0}
            isLoading={voteLoading}
          />
          <Button
            color="link"
            size="sm"
            onClick={() => navigate(`/posts/${item.slug}`)}
          >
            Read more
          </Button>
        </CardFooter>
      </Card>
      <DeleteModal
        isModalOpen={isModalOpen}
        handleOpenModal={handleOpenModal}
        item={item}
      />
    </>
  );
}

export default CardPosts;
