const xhr = require('xhr')
const smarkt = require('smarkt')

module.exports = solo

function solo() {
	return function plugin(state, emitter) {
		try {
			var archive = new DatArchive(window.location.origin + '/')
			state.p2p = true
		} catch(e) {
			state.p2p = false
		}

		state.solo = {
			content: null,
			info: null,
			loaded: false
		}

		emitter.on(state.events.DOMCONTENTLOADED, loaded)
		emitter.on('solo:save', save)
		emitter.on('solo:file', handle_file)

		async function loaded() {
			if (state.p2p) await read_dat()
			else await read_http()
		}

		async function read_dat() {
			state.solo.info = await archive.getInfo({timeout: 1000})

			try {
				var content = await archive.readFile('/content.txt')
			} catch (e) {
				content = ''
				archive.writeFile('/content.txt', '')
			}

			try {
				state.solo.content = smarkt.parse(content)
			} catch (e) {
				console.error('Error in content.json')
			}

			state.solo.loaded = true
			emitter.emit('render')
		}

		async function read_http() {
			state.solo.isOwner = false

			return new Promise(function (resolve, reject) {
				var bust = Math.floor(Date.now() / 1000)
				xhr('/content.txt?' + bust, function (err, res) {
					try {
						state.solo.content = smarkt.parse(res.body)
						state.solo.loaded = true
						emitter.emit(state.events.RENDER)
						resolve()
					} catch (err) {
						reject(err)
					}
				})
			})
		}

		async function save() {
			var content = smarkt.stringify({title: state.solo.content.title.trim(), text: state.solo.content.text.trim()})

			await archive.writeFile('/content.txt', content)
			await archive.commit()

			state.saved = true
			emitter.emit('render')
		}

		async function handle_file(file) {
			try {
				await archive.mkdir('/files')
			} catch (e) {}

			await archive.writeFile('/files/' + file.name, file.data)
		}
	}
}
