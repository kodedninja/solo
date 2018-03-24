const html = require('nanohtml')

module.exports = view

function view (state, emit) {
	return html`
		<main>
			hello
		</main>
	`
}
