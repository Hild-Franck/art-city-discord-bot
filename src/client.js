import { Client, GatewayIntentBits, Events } from "discord.js"
import { populateChannels } from "./channels"

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMembers
	]
})

client.on("error", error => {
	console.error("error:", error)
})

client.once(Events.ClientReady, async readyClient => {
	console.log(`Ready! Logged in as ${readyClient.user.tag}`)
	await populateChannels(client)
})

export default client
