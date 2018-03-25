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

app.use((state, emitter) => {
	state.preview = false
	emitter.on('solo:preview', () => {
		state.preview = !state.preview
		emitter.emit('render')
	})
})

app.route('*', view)
app.mount('main')

function view(state, emit) {
	if (!state.solo.content) return html`<main></main>`

	if (state.solo.info.isOwner && !state.preview) return html`
		<main class="db 1 p2">
			<div class="mw 1 mxa">
				${editor(state, emit)}
			</div>
		</main>
	`

	return html`
		<main class="db 1 p2">
			<div class="mw 1 mxa">
				${reader(state, emit)}
			</div>
		</main>
	`
}
