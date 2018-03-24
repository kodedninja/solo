const Nanocomponent = require('nanocomponent')
const html = require('nanohtml')

module.exports = class Textarea extends Nanocomponent {
	constructor(props) {
		super()

		this.props = props
		this.value = ''
	}

	createElement(value) {
		var t = this
		this.value = value
		return html`
			<textarea class="db 1" placeholder="${this.props.placeholder ? this.props.placeholder : ''}" style="overflow: hidden; resize: none;" onkeydown="${key}">${value}</textarea>
		`

		function key(e) {
			if (t.element.offsetHeight < t.element.scrollHeight) {
				t.element.style.height = t.element.scrollHeight + 40 + 'px'
			}
		}
	}

	load(element) {
		if (element.style.height == '') {
			element.style.height = element.scrollHeight + 40 + 'px'
		}
	}

	update(value) {
		return this.value !== value
	}
}
