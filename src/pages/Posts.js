import {
  Alert,
  Row,
  Col,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  FormGroup,
  Label
} from 'reactstrap';
import { Formik, Form } from 'formik';
import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { Input, Submit, CustomInput } from '../components/forms';
import { PostsInitValues, PostsValidation } from '../validations';
import CardHorizontal from '../components/card/CardHorizontal';
import PostsLoader from '../components/loading/PostsLoader';
import ApiCall from '../service/ApiCall';
import useAuth from '../hooks/useAuth';
import useFetchUserPosts from '../hooks/useFetchUserPosts';


function Posts() {

  const postContent = useMutation((data) => ApiCall.Posts.create(data))
  const queryClient = useQueryClient()

  const { user } = useAuth()
  const {
    data: userPosts,
    isError,
    isLoading,
    error,
  } = useFetchUserPosts(user.username, 1, 'date')

  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const res =  await postContent.mutateAsync({
        username: user.username,
        ...values
      })
      resetForm()
      queryClient.invalidateQueries('posts')
      queryClient.invalidateQueries('userPosts')
      toast.success(res.data.message)
    } catch (error) {
      error.response?.data?.errors?.forEach(item => {
        toast.error(item)
      })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <Row>
        <Col md="8">
          <Card className="card-form">
            <CardHeader>
              <h4 className="mb-0">Create Post</h4>
            </CardHeader>
            <Formik
              initialValues={PostsInitValues}
              onSubmit={onSubmit}
              validationSchema={PostsValidation}
            >
              <Form className="mt-2">
                <CardBody>
                  <FormGroup>
                    <Label for="title">Title</Label>
                    <Input
                      id="title"
                      type="text"
                      name="title"
                      placeholder="Title"
                      bsSize="md"
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="content">Image</Label>
                    <CustomInput
                      id="image"
                      type="file"
                      name="image"
                      placeholder="Upload image"
                      bsSize="md"
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="content">Content</Label>
                    <Input
                      id="content"
                      type="textarea"
                      name="content"
                      placeholder="Content"
                      bsSize="md"
                    />
                  </FormGroup>
                </CardBody>
                <CardFooter>
                  <div className="text-end">
                    <Submit type="submit" className="btn-md" size="md" withSpinner>Create Posts</Submit>
                  </div>
                </CardFooter>
              </Form>
            </Formik>
          </Card>
        </Col>
        <Col md="4">
          {isLoading ? (
            [...Array(3)].map((_, i) =>
              <PostsLoader small key={i}/>
            )
          ) : isError ? (
            <Alert color="danger">Error: {error?.response?.data?.errors}</Alert>
          ) : (
            <div className="sidenav-sticky">
              <h5>Your recent posts</h5>
              {userPosts?.data && userPosts?.data?.items?.map((item, index) => (
                <CardHorizontal item={item} key={index}/>
              ))}
            </div>
          )}
        </Col>
      </Row>
    </>
  )
}

export default Posts;
