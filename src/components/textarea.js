const Nanocomponent = require('nanocomponent')
const html = require('nanohtml')

module.exports = class Textarea extends Nanocomponent {
	constructor(props) {
		super()

		this.props = props
		this.value = ''
	}

	createElement(value, emit) {
		var t = this
		this.value = value
		var el =  html`
			<textarea class="db 1" placeholder="${this.props.placeholder ? this.props.placeholder : ''}" style="overflow: hidden; resize: none;" onkeydown="${key}">${value}</textarea>
		`
		el.emit = emit
		return el

		function key(e) {
			if (t.value != t.element.value) emit('solo:contentChanged')

			if (t.element.offsetHeight < t.element.scrollHeight) {
				t.element.style.height = t.element.scrollHeight + 40 + 'px'
			}
		}
	}

	load(element) {
		if (element.style.height == '') {
			element.style.height = element.scrollHeight + 40 + 'px'
		}

		// file drag and drop / upload
		element.addEventListener('dragover', this.drag_over, false)
		element.addEventListener('dragleave', this.drag_leave, false)
		element.addEventListener('drop', this.drop, false)
	}

	drag_over(e) {
		e.preventDefault()
		this.classList.add('ba')
	}

	drag_leave(e) {
		e.preventDefault()
		this.classList.remove('ba')
	}

	drop(e) {
		const t = this
		e.preventDefault()

		var files = e.dataTransfer.files, file = null
		var i = 0

		var reader = new FileReader()
		reader.onload = async function (e) {
			var result = e.target.result
			t.emit('solo:file', {name: sanitize(file.name), data: result})

			type_in_textarea(t, '![' + file.name + '](/files/' + sanitize(file.name) + ')')
			t.onkeyup(e)

			i++
			if (i < files.length) next()
		}

		function next() {
			file = files[i]
			reader.readAsArrayBuffer(file)
		}

		next()
		this.classList.remove('ba')

		function type_in_textarea(el, newText) {
			var start = el.selectionStart
			var end = el.selectionEnd
			var text = el.value
			var before = text.substring(0, start)
			var after  = text.substring(end, text.length)
			el.value = (before + newText + after)
			el.selectionStart = el.selectionEnd = start + newText.length
			el.focus()
		}

		function sanitize(str) {
			return str
				.toLowerCase()
				.replace(/\s+/g, '-')
				.replace(/[,\/#!@?$%\^&\*;:{}=\_`~()\'\"]/g, '')
		}
	}

	afterupdate (element) {
		if (element.style.height == '') {
			element.style.height = element.scrollHeight + 40 + 'px'
		}
	}

	update(value) {
		return value != this.value
	}

	get_value() {
		return this.element.value
	}
}
