const html = require('nanohtml')
const raw = require('nanohtml/raw')
const md = require('markdown-it')()

const Textarea = require('../components/textarea')
const Title = require('../components/title')
const buttons = require('../components/buttons')

const title = new Title()
const textarea = new Textarea({
	placeholder: 'write something...'
})

module.exports = view

var k = false

function view (state, emit) {
	if (!k) {
		document.addEventListener('keydown', keydown)
		k = true
	}

	return html`
		<div>
			<div>
				${title.render(state.solo.content.title, emit)}
			</div>
			<div>
				${textarea.render(state.solo.content.text, emit)}
			</div>
			${buttons(state, emit, title, textarea)}
		</div>
	`

	function keydown(e) {
		if (e.ctrlKey && e.keyCode == 83) {
			e.preventDefault()
			save()
		}
	}

	function save() {
		if (!state.preview) {
			state.solo.content.title = title.get_value()
			state.solo.content.text = textarea.get_value()
		}

		emit('solo:save')
	}
}
