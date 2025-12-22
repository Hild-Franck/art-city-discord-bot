import { REST, Routes } from "discord.js"
import contextCommands, { initContextCommands } from "./commands/context"
import slashCommands, { initSlashCommands } from "./commands/slash"

const { TOKEN, CLIENT_ID, GUILD_ID } = process.env

const rest = new REST().setToken(TOKEN)

const deployCommands = async () => {
	await initContextCommands()
	await initSlashCommands()

	const commands = [
		...contextCommands.values().map(c => c.data.toJSON()),
		...slashCommands.values().map(c => c.data.toJSON())
	]
	try {
		console.log(
			`Started refreshing ${commands.length} application (/) commands.`
		)

		const data = await rest.put(
			Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
			{ body: commands }
		)

		console.log(
			`Successfully reloaded ${data.length} application (/) commands.`
		)
	} catch (error) {
		console.error(error)
	}
}

export default deployCommands
