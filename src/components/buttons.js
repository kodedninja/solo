const html = require('nanohtml')

module.exports = buttons

function buttons (state, emit, title, textarea) {
	return html`
		<div>
			<div class="1/2 dib" style="padding-right: 4%;">
				<a href="#" class="1 my1 db tac f3" style="padding-top: 0.2rem;" onclick="${preview}">
					${state.preview ? 'edit' : 'preview'}
				</a>
			</div>
			<div class="1/2 dib" style="padding-left: 4%;">
				<a href="#" class="1 my1 db tac f3 ${state.saved ? 'tclred' : 'tcred'}" style="padding-top: 0.2rem;" onclick="${save}">save</a>
			</div>
		</div>
	`

	function save(e) {
		e.preventDefault()

		if (!state.preview) {
			state.solo.content.title = title.get_value()
			state.solo.content.text = textarea.get_value()
		}

		emit('solo:save')
	}

	function preview(e) {
		e.preventDefault()

		if (!state.preview) {
			state.solo.content.title = title.get_value()
			state.solo.content.text = textarea.get_value()
		}

		emit('solo:preview')
	}
}
