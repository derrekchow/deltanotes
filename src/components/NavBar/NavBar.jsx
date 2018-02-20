import React from 'react'
import Link from 'gatsby-link'

import './NavBar.scss'
import { Button, Drawer, Toolbar } from 'react-md'

class NavBar extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      colors: Object(this.props.colors),
      visible: false, 
    }
  }

  renderColors() {
    const options = []
    console.log(this.state.colors)
    const cObject = this.state.colors;
    Object.keys(cObject).map(function(key) {
      options.push(<option value={cObject[key]}></option>)
    })
    return options
  }

  openDrawerLeft = () => {
    this.setState({ visible: true })
  }

  closeDrawer = () => {
    this.setState({ visible: false })
  }

  handleVisibility = (visible) => {
    this.setState({ visible })
  }

  render() {
    const { visible } = this.state

    const closeBtn = <Button id="close" icon onClick={this.closeDrawer}>arrow_back</Button>
    const addBtn = <Button id="add" flat primary iconChildren="add">New Note</Button>

    const navItems = ([<h4>Hello</h4>, <h4>hi</h4>])

    return (
      <div>
        <nav style={{
            backgroundColor: this.state.colors['fore'],
            color: this.state.colors['normal'],
          }}>
          <Button className="nav-item" onClick={this.openDrawerLeft} icon>
            menu
          </Button>
          <p id="title" className="nav-item">
              <Link
                to="/"
                style={{
                  color: this.state.colors['normal'],
                  textDecoration: 'none',
                }}
              >
                Delta Notes
              </Link>
          </p>
          <div className="nav-item" id="toolbar">
              <select className="ql-color">
                {this.renderColors()}
              </select>
              <select className="ql-background">
                {this.renderColors()}
              </select>

              <button className="ql-header" value="1"></button>
              <button className="ql-header" value="2"></button>

              <button className="ql-link"></button>
              <button className="ql-blockquote"></button>
              <select className="ql-align"></select>

              <button className="ql-clean"></button>
          </div>
        </nav>
        <Drawer
            id="drawer"
            style={{
              backgroundColor: this.state.colors['fore'],
              padding:0
            }}
            type={Drawer.DrawerTypes.TEMPORARY}
            visible={visible}
            onVisibilityChange={this.handleVisibility}
            navItems={navItems}

            header={(
              <div>
                <Toolbar
                  nav={closeBtn}
                  actions={addBtn}
                  id="drawer-header"
                />
              </div>
            )}
          />
      </div>
    )
  }
}


export default NavBar
