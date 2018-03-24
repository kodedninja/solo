const html = require('nanohtml')

module.exports = view

function view (state, emit) {
	if (!state.solo.content) return html`<main></main>`

	return html`
		<main class="db 1 ffh p2">
			<div class="mw 1 mxa">
				<div class="f2 fwb">${state.solo.content.title}</div>
			</div>
		</main>
	`
}
