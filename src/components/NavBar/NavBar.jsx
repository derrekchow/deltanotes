import React from 'react'
import Link from 'gatsby-link'

import './NavBar.scss'
import { Button, Drawer, Toolbar, ListItem, MenuButton, FontIcon } from 'react-md'

class NavBar extends React.Component {

  constructor(props) {
    super(props)
    this.default_note = [{
      title: "My Note", 
      content: this.renderDelta(),
      theme: "material_dark",
      active: true
    }]
    var notes = []
    if (localStorage.getItem('notes') != undefined) {
      notes = JSON.parse(localStorage.getItem('notes'))
    } else {
      notes = this.default_note
      localStorage.setItem('notes', JSON.stringify(notes))
    }
    this.state = {
      visible: false,
      notes: notes
    }
    this.props.setContent(notes[0])
  }

  renderNotes() {
    var notes_list = []
    this.state.notes.map(function(item) {
      notes_list.push(
        <ListItem 
          primaryText={<input placeholder={item['title']} className="note-title" type="text" onClick={((e) => e.stopPropagation())}/>} 
          secondaryText={"this is a test"}
          onClick={() => {this.props.setContent(item)}}
        />)
    }.bind(this))
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

  renderDelta() {
    const color_list = this.props.colors
    const delta_placeholder = [
      { insert: 'Foreground Base Color: ' + color_list['fore'] },
      { insert: ' ▣\n', attributes: {color: color_list['fore']} },

      { insert: 'Background Base Color: ' + color_list['back']},
      { insert: ' ▣\n', attributes: {color: color_list['back']} },

      { insert: 'Normal Text Color: ' + color_list['normal']},
      { insert: ' ▣\n', attributes: {color: color_list['normal']} },

      { insert: 'Heading 1 Color: ' + color_list['h1']},
      { insert: ' ▣\n', attributes: {color: color_list['h1']} },

      { insert: 'Heading 2 Color: ' + color_list['h2']},
      { insert: ' ▣\n', attributes: {color: color_list['h2']} },

      { insert: 'Bold Text Color: ' + color_list['bold']},
      { insert: ' ▣\n', attributes: {color: color_list['bold']} },

      { insert: 'Italic Text Color: ' + color_list['italic']},
      { insert: ' ▣\n', attributes: {color: color_list['italic']} },

      { insert: 'Underline Text Color: ' + color_list['underline']},
      { insert: ' ▣\n', attributes: {color: color_list['underline']} },
    ]
    return delta_placeholder
  }

  addNote() {
    var notes = this.state.notes
    notes.push(this.default_note[0])
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
