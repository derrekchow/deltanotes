import React from 'react'
import Link from 'gatsby-link'

const Header = () => (
  <div
    style={{
      background: 'white',
    }}
  >
    <div
      style={{
        margin: '0 auto',
        padding: '1em',
        boxShadow: '0 1px 4px 0 rgba(18,18,22, 0.3)'
      }}
    >
      <h3 style={{ margin: 0 }}>
        <Link
          to="/"
          style={{
            color: '#121216',
            textDecoration: 'none',
          }}
        >
          Delta Notes
        </Link>
      </h3>
    </div>
  </div>
)

export default Header
