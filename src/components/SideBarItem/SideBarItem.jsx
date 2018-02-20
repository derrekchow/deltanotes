import React from 'react'
import Link from 'gatsby-link'

class SideBarItem extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <h4>{this.props.title}</h4>
        <p>{this.props.date}</p>
      </div>
    )
  }
}


export default SideBarItem
