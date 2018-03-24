const html = require('nanohtml')
const raw = require('nanohtml/raw')
const md = require('markdown-it')()

const Textarea = require('../components/textarea')
const textarea = new Textarea()

module.exports = view

function view (state, emit) {
	return html`
		<div>
			<div class="f1">
				<input type="text" class="1 mb1" value="${state.solo.content.title}">
			</div>
			<div>
				${textarea.render(state.solo.content.text)}
			</div>
		</div>
	`
}
