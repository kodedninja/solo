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
		}

		async function read_http() {
			state.solo.isOwner = false
		}
	}
}
