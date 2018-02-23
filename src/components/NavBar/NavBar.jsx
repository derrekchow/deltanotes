import React from 'react'
import Link from 'gatsby-link'

import './NavBar.scss'
import { Button, Drawer, Toolbar, ListItem, MenuButton, FontIcon } from 'react-md'

class NavBar extends React.Component {

  constructor(props) {
    super(props)
    var notes = []
    if (localStorage.getItem('notes') != undefined) {
      notes = JSON.parse(localStorage.getItem('notes'))
    } else {
      notes = [{text: 'hello'}]
      localStorage.setItem('notes', JSON.stringify(notes))
    }
    this.state = {
      visible: false,
      notes: notes
    }
  }

  renderNotes() {
    var notes_list = []
    this.state.notes.map(function(item) {
      notes_list.push(<ListItem 
                        primaryText={item['text']} 
                        secondaryText={"this is a test"}
                        onClick={() => this.props.openNote(item['content'])}
                      />)
    })
    return notes_list
  }

  renderColors() {
    var options = []
    const colors = this.props.colors
    Object.keys(colors).map(function(key) {
      options.push(<option value={colors[key]}></option>)
    })
    return options
  }

  addNote() {
    var notes = this.state.notes
    notes.push({text: "test2"})
    console.log(notes)
    localStorage.setItem('notes', JSON.stringify(notes))
    this.setState({
      notes: notes
    })
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
    const addBtn = <Button id="add" onClick={() => this.addNote()} raised iconChildren="create">New Note</Button>
    const login = <Button id="login" flat iconChildren="person">Login</Button>
    
    const menuItems = ([
      <ListItem primaryText="Solarized Light" onClick={() => {this.props.setTheme("solarized_light")}}/>,
      <ListItem primaryText="Solarized Dark" onClick={() => {this.props.setTheme("solarized_dark")}}/>,
      <ListItem primaryText="Material Light" onClick={() => {this.props.setTheme("material_light")}}/>,
      <ListItem primaryText="Material Dark" onClick={() => {this.props.setTheme("material_dark")}}/>
    ])

    return (
      <div>
        <nav>
          <Button icon className="nav-item" onClick={this.openDrawerLeft}>
            menu
          </Button>
          <MenuButton
            icon
            className="nav-item"
            id="change_theme"
            anchor={{
              x: MenuButton.HorizontalAnchors.INNER_LEFT,
              y: MenuButton.VerticalAnchors.TOP,
            }}
            position={MenuButton.Positions.TOP_LEFT}
            
            menuItems={menuItems}
            >
            color_lens
          </MenuButton>
          <p className="nav-item">
              <Link id="title" to="/">
                Delta Notes
              </Link>
          </p>
          <div className="nav-item" id="toolbar">
              <select className="ql-color">
                {this.renderColors() /* doesn't work */ } 
              </select>
              <select className="ql-background">
                {this.renderColors() /* doesn't work */}
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
            type={Drawer.DrawerTypes.TEMPORARY}
            visible={visible}
            onVisibilityChange={this.handleVisibility}
            navItems={this.renderNotes()}

            header={(
              <div>
                <Toolbar
                  nav={closeBtn}
                  actions={[addBtn, login]}
                  id="drawer-header"
                  className="md-divider-border md-divider-border--bottom"
                />
              </div>
            )}
          />
      </div>
    )
  }
}


export default NavBar
