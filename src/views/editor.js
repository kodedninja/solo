const html = require('nanohtml')
const raw = require('nanohtml/raw')
const md = require('markdown-it')()

module.exports = view

function view (state, emit) {
	return html`
		<div>
			<div class="f1">
				${state.solo.content.title}
			</div>
			<div>
				${raw(md.render(state.solo.content.text))}
			</div>
		</div>
	`
}
