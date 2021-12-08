import React from 'react'
import clsx from 'clsx'


const Loading = ({
  className,
  ref,
  ...props
}) => {
  return (
    <section
      className={clsx(
        className,
        "mw-loading"
      )}
      {...props}
    >
      <svg className="mw-loader" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#f72585" />
            <stop offset="100%" stopColor="#6900cc" />
          </linearGradient>
        </defs>
        <circle
          className="mw-loader__track"
          fill="transparent"
          strokeWidth={6}
          stroke="#9c9c9c30"
          cx={50}
          cy={50}
          r={44}
        />
        <circle
          className="mw-loader__ring"
          fill="transparent"
          strokeWidth={6}
          stroke="url(#gradient)"
          strokeDashoffset={276.46}
          strokeDasharray="276.460 276.460"
          cx={50}
          cy={50}
          r={44}
        />
        <circle
          className="mw-loader__ring-overlay"
          fill="transparent"
          strokeWidth={6}
          stroke="url(#gradient)"
          strokeDashoffset={276.46}
          strokeDasharray="276.460 276.460"
          cx={50}
          cy={50}
          r={44}
        />
      </svg>
    </section>
  )
}

Loading.displayName = "Loading"

export default Loading
