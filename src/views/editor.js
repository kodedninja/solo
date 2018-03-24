const html = require('nanohtml')
const raw = require('nanohtml/raw')
const md = require('markdown-it')()

const Textarea = require('../components/textarea')
const textarea = new Textarea({
	placeholder: 'write something...'
})

const Title = require('../components/title')
const title = new Title()

module.exports = view

function view (state, emit) {
	return html`
		<div>
			<div>
				${title.render(state.solo.content.title)}
			</div>
			<div>
				${textarea.render(state.solo.content.text)}
			</div>
			<div>
				<a href="#" class="1 p1 my1 db tac f3" style="padding-top: 0.2rem;" onclick="${save}">save</a>
			</div>
		</div>
	`

	function save(e) {
		e.preventDefault()

		emit('solo:save', title.get_value(), textarea.get_value())
	}
}
