import clsx from "clsx"
import AvatarDefault from './AvatarDefault'


const initials = (name) => {
  const [firstName, lastName] = name.toUpperCase().split(" ")
  return firstName && lastName
    ? `${firstName.charAt(0)}${lastName.charAt(0)}`
    : firstName.charAt(0)
}

export const AvatarWrapper = ({
  children,
  className,
  ...props
}) => {
  return (
    <div className={clsx("avatar-wrapper", className)} role="img" {...props}>
      {children}
    </div>
  )
}

export const AvatarInitials = ({
  name,
  size,
  className,
  ...props
}) => {
  return (
    <AvatarWrapper>
      <div className={clsx(
          "avatar",
          size ? `avatar-${size}` : '',
          className
        )} {...props}>
        <span className="initial">{name ? initials(name) : null}</span>
      </div>
    </AvatarWrapper>
  )
}

export const Avatar = ({
  size,
  name,
  ...props
}) => {
  if (name) {
    return <AvatarInitials name={name} size={size} {...props}/>
  }
  return (
    <AvatarWrapper>
      <AvatarDefault size={size} {...props}/>
    </AvatarWrapper>
  )
}

export default Avatar;
