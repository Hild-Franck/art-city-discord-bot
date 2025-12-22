import fs from "node:fs"
import path from "node:path"

const commands = new Map()

export const initContextCommands = () =>
	Promise.all(
		fs.readdirSync(__dirname).map(async file => {
			if (!file.endsWith(".js") || file === "index.js") return

			const command = await import(path.join(__dirname, file))
			commands.set(command.data.name, command)
		})
	)

export const handleContextCommands = interaction => {
	const name = interaction.commandName
	const command = commands.get(name)
	if (!command) return console.error(`Unknown command ${name}`)

	return command.execute(interaction)
}

export default commands
