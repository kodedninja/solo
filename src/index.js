const choo = require('choo')
const html = require('nanohtml')

const solo = require('./solo')
const editor = require('./views/editor')
const reader = require('./views/reader')

const app = choo()

app.use(solo())
app.use((state, emitter) => {
	state.saved = false
})

app.route('*', view)
app.mount('main')

function view(state, emit) {
	if (!state.solo.content) return html`<main></main>`

	if (state.solo.info.isOwner) return html`
		<main class="db 1 p2">
			<div class="mw 1 mxa">
				${editor(state, emit)}
			</div>
		</main>
	`

	return html`
		<main>
			<div>
				${reader(state, emit)}
			</div>
		</main>
	`
}
