import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  Card,
  CardBody
} from 'reactstrap';
import { useQueryClient } from 'react-query';
import { AlertCircle } from 'lucide-react';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import ApiCall from '../../service/ApiCall';
import useAuth from '../../hooks/useAuth';


function DeleteModal({ isModalOpen, handleOpenModal, item, ...props }) {

  const deletePost = useMutation((data) => ApiCall.Posts.delete(data))
  const queryClient = useQueryClient()
  const { user, isAuthenticated } = useAuth()

  const handleSubmit = async () => {
    try {
      if (!isAuthenticated) {
        toast.error('You are not allowed to delete this post')
      }
      const res =  await deletePost.mutateAsync({
        username: user.username,
        slug: item.slug
      })
      toast.info(res.data.message)
      queryClient.invalidateQueries('posts')
      queryClient.invalidateQueries('userPosts')
    } catch (error) {
      error.response?.data?.errors?.forEach(item => {
        toast.error(item)
      })
    } finally {
      handleOpenModal(false)
    }
  }

  return (
    <Modal
      isOpen={isModalOpen}
      toggle={handleOpenModal}
      className="modal-confirmation"
      {...props}
    >
      <div className="modal-header">
        <div className="modal-icon">
          <AlertCircle className="icon-danger"/>
        </div>
        <h5 className="modal-title">Delete this item?</h5>
      </div>
      <ModalBody>
        <p>Are you sure want to delete this item? this process cannot be undone</p>
        <Card>
          <CardBody>
            <h6>{
              item.title.length >= 30 
              ? item.title.substring(0, 30)+'...'
              : item.title
            }</h6>
            <div className="small">{
              item.content.length >= 40 
              ? item.content.substring(0, 40)+'...'
              : item.content
            }</div>
          </CardBody>
        </Card>
      </ModalBody>
      <ModalFooter>
        <Button color="link" onClick={handleOpenModal}>
          Cancel
        </Button>
        <Button color="danger" onClick={handleSubmit}>
          Confirm delete
        </Button>
      </ModalFooter>
    </Modal>
  );
}

export default DeleteModal
