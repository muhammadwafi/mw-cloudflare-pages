// modified formstrap
import { getIn, useFormikContext } from 'formik';
import React, { Fragment, useMemo } from 'react';
import { Input as BsCustomInput, FormFeedback } from 'reactstrap';

export const CustomInput = ({
  name,
  withLoading,
  withFeedback,
  type,
  onChange,
  value,
  ...props
}) => {

  const {
    errors,
    values,
    touched,
    isSubmitting,
    handleChange,
    setFieldValue,
    handleBlur,
  } = useFormikContext()

  const error = getIn(errors, name)
  const propsValue = getIn(values, name)
  const touch = getIn(touched, name)

  let isDisabled = withLoading ? isSubmitting : false

  if (props.disabled) {
    isDisabled = true
  }

  const additionalProps = useMemo(() => {
    const addProps = {}
    let usingCustomValue = false
    switch (type) {
      case 'checkbox':
        addProps.checked =
          propsValue === '1' || propsValue === 1 || propsValue === true ? true : false
        usingCustomValue = true
        break
      case 'switch':
        addProps.checked =
          propsValue === '1' || propsValue === 1 || propsValue === true ? true : false
        usingCustomValue = true
        break
      case 'radio':
        addProps.checked = value === propsValue
        usingCustomValue = true
        break
      case 'file':
        addProps.multiple = false
        usingCustomValue = true
        break
      default:
        usingCustomValue = true
        break
    }

    if (!usingCustomValue) {
      addProps.value = propsValue
    }

    if (!props.id) {
      addProps.id = type + '_' + name
    }

    return addProps
  }, [props, value, propsValue, name, type])

  const defaultOnChange = (e) => {
    switch (type) {
      case 'checkbox':
        if (typeof propsValue === 'number') {
          setFieldValue(name, e.target.checked ? 1 : 0)
        } else if (typeof propsValue === 'boolean') {
          setFieldValue(name, e.target.checked ? true : false)
        } else {
          setFieldValue(name, e.target.checked ? '1' : '0')
        }
        break
      case 'switch':
        if (typeof propsValue === 'number') {
          setFieldValue(name, e.target.checked ? 1 : 0)
        } else if (typeof propsValue === 'boolean') {
          setFieldValue(name, e.target.checked ? true : false)
        } else {
          setFieldValue(name, e.target.checked ? '1' : '0')
        }
        break
      case 'file':
        const file = e.target.files ? e.target.files[0] : null
        setFieldValue(name, file)
        break
      case 'radio':
        setFieldValue(name, propsValue)
        break
      default:
        handleChange(e)
        break
    }
  }

  // const feedback = useMemo(() => (
  //   <Fragment>
  //     {withFeedback && touch && error ? (
  //       <FormFeedback>{error}</FormFeedback>
  //     ) : (
  //       ''
  //     )}
  //   </Fragment>
  // ), [withFeedback, touch, error])

  // const feedBackInsideChild = useMemo(() => {
  //   if (type === 'checkbox' || type === 'switch' || type === 'file') {
  //     return true
  //   } else {
  //     return false
  //   }
  // }, [type])

  return (
    <Fragment>
      <BsCustomInput
        {...props}
        {...additionalProps}
        name={name}
        type={type}
        disabled={isDisabled}
        onChange={onChange ? onChange : defaultOnChange}
        onBlur={handleBlur}
        invalid={touch && error ? true : false}
      />
      {withFeedback && touch && error ? (
        <FormFeedback>{error}</FormFeedback>
      ) : (
        ''
      )}
    </Fragment>
  )
}

CustomInput.defaultProps = {
  withLoading: true,
  withFeedback: true,
}
