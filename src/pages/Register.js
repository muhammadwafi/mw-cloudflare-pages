import React from 'react'
import {
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
import { AuthContext } from '../context/authContext';
import { RegisterInitValues, RegisterValidation } from '../validations';


function Register() {

  const postRegister = useMutation((data) => ApiCall.register(data))
  const { setAuthenticated, setUserAuth } = React.useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  let from = location.state?.from?.pathname || "/";

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      const res =  await postRegister.mutateAsync(values)
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
            <h3>Register</h3>
            <span className="text-muted">Register your accounts</span>
          </div>
          <Formik
            initialValues={RegisterInitValues}
            onSubmit={onSubmit}
            validationSchema={RegisterValidation}
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
              <FormGroup>
                <Label for="confirmPassword">Confirm password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm password"
                  bsSize="md"
                />
              </FormGroup>
              <FormGroup>
                <p className="text-muted small">
                  By clicking "Create Account" button you are agreeing to {' '}
                  the terms of use and acknowledging the privacy policy
                </p>
                <Submit type="submit" className="btn-block" size="md" withSpinner>Continue</Submit>
              </FormGroup>
            </Form>
          </Formik>
          <div className="text-center pt-3">
            <span>{`Already have an account?`} <Link className="card-link" to="/login">Sign in</Link></span>
          </div>
        </div>
      </CardBody>
    </Card>
  )
}

export default Register;