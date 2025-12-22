import config from "./config"

const channels = new Map()

export const populateChannels = client =>
	Promise.all(
		config.channels.map(async ({ name, id }) => {
			const channel = await client.channels.fetch(id)
			channels.set(name, channel)
		})
	)

export default channels
