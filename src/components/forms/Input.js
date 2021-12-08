import { getIn, useFormikContext } from 'formik'
import React, { Fragment, useMemo } from 'react'
import { FormFeedback, Input as BsInput } from 'reactstrap'

export const Input = ({
  name,
  withFeedback,
  withLoading,
  ...props
}) => {
  
  const {
    errors,
    values,
    touched,
    isSubmitting,
    handleChange,
    handleBlur
  } = useFormikContext()

  const error = getIn(errors, name)
  const value = getIn(values, name)
  const touch = getIn(touched, name)
  
  let isDisabled = withLoading ? isSubmitting : false

  if (props.disabled) {
    isDisabled = true
  }

  const returnedValue = useMemo(() => {
    if (props.type === 'number') {
      return value || 0
    }
    return value || ''
  }, [value, props.type])

  return (
    <Fragment>
      <BsInput
        disabled={isDisabled}
        value={returnedValue}
        onChange={handleChange}
        onBlur={handleBlur}
        name={name}
        invalid={touch && error ? true : false}
        {...props}
      />
      {withFeedback && touch && error ? (
        <FormFeedback>{error}</FormFeedback>
      ) : (
        ''
      )}
    </Fragment>
  )

}

Input.defaultProps = {
  withLoading: true,
  withFeedback: true,
}


// export default Input
