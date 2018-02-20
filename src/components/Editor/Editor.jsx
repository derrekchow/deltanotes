import React from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

import './Editor.scss'

const icons = ReactQuill.Quill.import('ui/icons')
icons['link'] = '<i class="material-icons md-18">link</i>'
icons['color'] = '<i class="material-icons md-18 ql-color-label">format_color_text</i>'
icons['background'] = '<i class="material-icons md-18">format_color_fill</i>'
icons['blockquote'] = '<i class="material-icons md-18">format_quote</i>'
icons['align'][''] = '<i class="material-icons md-18">format_align_left</i>'
icons['align']['center'] = '<i class="material-icons md-18">format_align_center</i>'
icons['align']['right'] = '<i class="material-icons md-18">format_align_right</i>'
icons['align']['justify'] = '<i class="material-icons md-18">format_align_justify</i>'
icons['clean'] = '<i class="material-icons md-18">format_clear</i>'
icons['header'][1] = '<i class="material-icons md-18">looks_one</i>'
icons['header'][2] = '<i class="material-icons md-18">looks_two</i>'


class Editor extends React.Component {

	constructor(props) {
		super(props)
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
		this.state = { text: delta_placeholder, colors: color_list } // You can also pass a Quill Delta here
		this.handleChange = this.handleChange.bind(this)
	}

	componentDidMount() {
		this.refs.bodyInput.focus();
	}

	handleChange(value) {
		this.setState({ text: value })
	}

	render() {
		return (
			<ReactQuill 
				theme="snow"
				ref="bodyInput"
				value={this.state.text}
				//onChange={this.handleChange} WTF?
				modules={Editor.modules}
				bounds={'.ql-editor'}
			>
				<div id="editor" className="ql-editor" style={{
					color: this.state.colors['normal'],
					backgroundColor: this.state.colors['fore'],
				}}>
				</div>
			</ReactQuill>
		)
	}
}

Editor.modules = {
	toolbar: {
		container: "#toolbar", //toolbar found in pages/editor.js
	}
}

export default Editor