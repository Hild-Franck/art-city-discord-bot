import { Events } from "discord.js"

import client from "./src/client"
import deployCommands from "./src/deployCommands"
import { handleContextCommands } from "./src/commands/context"

const { TOKEN } = process.env

client.on(Events.InteractionCreate, async interaction => {
	if (interaction.isMessageContextMenuCommand()) {
		await handleContextCommands(interaction)
	}
})
;(async () => {
	await deployCommands()
	client.login(TOKEN)
})()
