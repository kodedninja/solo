const Nanocomponent = require('nanocomponent')
const html = require('nanohtml')

module.exports = class Textarea extends Nanocomponent {
	constructor(props) {
		super()

		this.value = ''
	}

	createElement(value, emit) {
		var t = this
		t.value = value
		return html`
			<input type="text" placeholder="title" class="1 mb1 f1" value="${value}" onkeydown="${keydown}">
		`

		function keydown(e) {
			if (t.value != t.element.value) emit('solo:contentChanged')
		}
	}

	update(value) {
		return this.value !== value
	}

	get_value() {
		return this.element.value
	}
}
