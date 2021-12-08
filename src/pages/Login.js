import React from 'react'
import {
  Row,
  Col,
  Card,
  CardBody,
  FormGroup,
  Label
} from 'reactstrap';
import { Formik, Form } from 'formik';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import { Input, Submit } from '../components/forms';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import ApiCall from '../service/ApiCall';
import useAuth from '../hooks/useAuth';
import { LoginInitValues, LoginValidation } from '../validations';


function Login() {

  const postLogin = useMutation((data) => ApiCall.login(data))
  const { setAuthenticated, setUserAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  let from = location.state?.from?.pathname || "/";

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      const res =  await postLogin.mutateAsync(values)
      setUserAuth(res.data.items)
      setAuthenticated(true)
      toast.success(`You are logged in`)
      navigate(from, { replace: true });
    } catch (error) {
      error.response?.data?.errors?.forEach(item => {
        toast.error(item)
      })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Card className="card-auth">
      <CardBody>
        <div className="auth-form">
          <div className="auth-form-title">
            <h3>Sign in</h3>
            <span className="text-muted">Sign in using your credentials</span>
          </div>
          <Formik
            initialValues={LoginInitValues}
            onSubmit={onSubmit}
            validationSchema={LoginValidation}
          >
            <Form>
              <FormGroup>
                <Label for="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  name="username"
                  placeholder="Username"
                  bsSize="md"
                />
              </FormGroup>
              <FormGroup>
                <Label for="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Password"
                  bsSize="md"
                />
              </FormGroup>
              <Row className="g-2 align-items-center mb-3">
                <Col>
                  <FormGroup>
                    <Input
                      id="remember_me"
                      type="checkbox"
                      name="remember_me"
                      bsSize="md"
                      defaultChecked={true}
                    />
                    <Label for="remember_me" className="ant-checkbox-label">Remember</Label>
                  </FormGroup>
                </Col>
              </Row>
              <FormGroup>
                <Submit type="submit" className="btn-block" size="md" withSpinner>Continue</Submit>
              </FormGroup>
            </Form>
          </Formik>
          <div className="text-center pt-3">
            <span>{`Don't have an account?`} <Link className="card-link" to="/register">Sign up</Link></span>
          </div>
        </div>
      </CardBody>
    </Card>
  )
}

export default Login;