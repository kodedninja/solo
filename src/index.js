const choo = require('choo')
const html = require('nanohtml')

const solo = require('./solo')
const editor = require('./views/editor')
const reader = require('./views/reader')

const app = choo()

app.use(solo())
app.use((state, emitter) => {
	state.saved = true

	emitter.on('solo:contentChanged', () => {
		state.saved = false
		emitter.emit('render')
	})
})

app.use((state, emitter) => {
	state.preview = false
	emitter.on('solo:preview', () => {
		state.preview = !state.preview
		emitter.emit('render')
	})
})

app.route('/update', update_view)
app.route('*', view)

app.mount('main')

function view(state, emit) {
	if (!state.solo.content) return html`<main></main>`

	emit('DOMTitleChange', state.solo.content.title)

	if (state.solo.info && state.solo.info.isOwner && !state.preview) return html`
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


function update_view(state, emit) {
	update('dat://b89507488b68892978dcdc6cb32e21040b2cd0fdcd304c502e17289aad10d95e/', ['/bundle.js'])
	emit('pushState', '/')

	return html`<main>Update</main>`
}
