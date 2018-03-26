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

function view (state, emit) {
	return html`
		<div>
			<div>
				${title.render(state.solo.content.title)}
			</div>
			<div>
				${textarea.render(state.solo.content.text, emit)}
			</div>
			${buttons(state, emit, title, textarea)}
		</div>
	`
}
