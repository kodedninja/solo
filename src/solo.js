const xhr = require('xhr')

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
			info: null
		}

		emitter.on(state.events.DOMCONTENTLOADED, loaded)

		async function loaded() {
			if (state.p2p) await read_dat()
			else await read_http()
		}

		async function read_dat() {
			state.solo.info = await archive.getInfo({timeout: 1000})

			try {
				var content = await archive.readFile('/content.json')
			} catch (e) {
				content = '{}'
				archive.writeFile('/content.json', '{}')
			}

			try {
				state.solo.content = JSON.parse(content)
			} catch (e) {
				console.error('Error in content.json')
			}

			emitter.emit('render')
		}

		async function read_http() {
			state.solo.isOwner = false

			return new Promise(function (resolve, reject) {
				var bust = Math.floor(Date.now() / 1000)
				xhr('/content.json?' + bust, function (err, res) {
					try {
						state.solo.content = JSON.parse(res.body)

						emitter.emit(state.events.RENDER)
						resolve()
					} catch (err) {
						reject(err)
					}
				})
			})
		}
	}
}
