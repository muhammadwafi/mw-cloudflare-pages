
const AvatarDefault = ({ size, fill, ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size ? size : 30}
      height={size ? size : 30}
      viewBox="0 0 24 24"
      {...props}
    >
      <circle cx={12} cy={12} r={11.97} fill={fill ? fill : "#C2C5D4"} />
      <path
        fill="#ffffff"
        d="M12 13.01c4.56.1 10.34 3.85 6.47 6.94A11.238 11.238 0 0112 21.97c-2.4 0-4.63-.74-6.46-2.02-3.58-2.84 1.24-7.06 6.46-6.94zm0-9.38c2.18 0 3.94 1.76 3.94 3.93s-1.76 3.93-3.94 3.93a3.93 3.93 0 010-7.86z"
      />
    </svg>
  )
}

export default AvatarDefault
