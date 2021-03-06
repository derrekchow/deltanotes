import React from 'react'
import Link from 'gatsby-link'

import Editor from '../components/Editor/Editor'
import NavBar from '../components/NavBar/NavBar'

const themes = {
	template: ["fore", "back", "normal", "h1", "h2", "bold", "italic", "underline", "select"],
	solarized_light: ["#fdf6e3", "#eee8d5", "#657b83", "#b58900", "#cb4b16", "#d33682", "#2aa198", "#859900", "#268bd2"],
	solarized_dark: ["#073642", "#002b36", "#839496", "#b58900", "#cb4b16", "#d33682", "#2aa198", "#859900", "#268bd2"],
	monokai: ["#272822", "#141411", "#F8F8F2", "#FFE792", "#FD971F", "#F92672", "#66D9EF", "#A6E22E"],
	material_dark: ["#37474F", "#263238", "#CFD8DC", "#FFC107", "#FF9800", "#E91E63", "#00BCD4", "#8BC34A", "#03A9F4"],
	material_light: ["#CFD8DC", "#B0BEC5", "#37474F", "#3F51B5", "#673AB7", "#E91E63", "#00BCD4", "#4CAF50", "#03A9F4"]
}

class NotePage extends React.Component {

	constructor(props) {
		super(props)
		this.default_theme = "material_dark"
		const colors = this.makeColors(themes[this.default_theme])
		this.state = {
			colors: colors,
			current_theme: this.default_theme,
			content: ""
		}
	}

	makeColors(hex) {
		return {
			fore: hex[0],
			back: hex[1],
			normal: hex[2],
			h1: hex[3],
			h2: hex[4],
			bold: hex[5],
			italic: hex[6],
			underline: hex[7],
			select: hex[8]
		}
	}

	componentWillMount() {
		const link = document.createElement("link")
		link.href = "https://fonts.googleapis.com/icon?family=Material+Icons"
		link.rel = "stylesheet"
		document.body.prepend(link)
	}

	componentDidUpdate() {
		this.changeTheme()
	}

	changeTheme() {
		const css = document.getElementById('css')
		const colors = this.makeColors(themes[this.state.current_theme])
		const style = 'body{background-color:' + colors['back'] + '} strong{color:' + colors['bold'] + '} em{color: ' + colors['italic'] + '} u{color:'+ colors['underline'] + '} h1{color:' + colors['h1'] + '} h2{color:' + colors['h2'] + '} #editor, h3, h4, h5, h6, ::placeholder, .note-title, .material-icons,.md-icon, #title, nav, .md-icon-text{color:'+ colors['normal'] +'} .md-text--theme-primary .md-icon, .md-text{color:' + colors['normal'] + '!important} .ql-snow a, .ql-active .material-icons, .material-icons:hover{color:' + colors['select'] + '} ::selection{background-color:' + colors['select'] + '} .md-list,#drawer, #editor, nav {background-color:' + colors['fore'] + '}'
		css.innerHTML = style
	}

	setTheme(new_theme) {
		const colors = this.makeColors(themes[new_theme])
		this.setState({
			colors: colors,
			current_theme: new_theme,
		})
	}

	setContent(note) {
		this.setTheme(note['theme'])
		this.setState({
			content: note['content']
		})
	}
	
	render() {
		return (
			<div>
				<NavBar colors={this.state.colors} setContent={this.setContent.bind(this)} setTheme={this.setTheme.bind(this)} />

			 	<Editor id="editor" content={this.state.content} colors={this.state.colors} />
			</div>
		)
	}
}

export default NotePage