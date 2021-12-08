import { useFormikContext } from 'formik'
import React, { Fragment } from 'react'
import { Button, Spinner } from 'reactstrap'

export const Submit = ({
  withLoading,
  withSpinner,
  ...props
}) => {

  const { isSubmitting } = useFormikContext()

  let disabled = withLoading ? isSubmitting : false

  if (props.disabled) {
    disabled = true
  }

  const Submitting = () => {
    if (withSpinner && isSubmitting) {
      return (
        <Fragment>
          <Spinner size="sm" />{' '}
        </Fragment>
      )
    }
    return <Fragment></Fragment>
  }

  return (
    <Fragment>
      <Button type="submit" disabled={disabled} {...props}>
        <Submitting />
        {props.children}
      </Button>
    </Fragment>
  );
  
}

Submit.defaultProps = {
  color: 'primary',
  withLoading: true,
};

// export Submit
