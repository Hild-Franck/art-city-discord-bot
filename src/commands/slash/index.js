import fs from "node:fs"
import path from "node:path"

const commands = new Map()

export const initSlashCommands = () =>
	Promise.all(
		fs.readdirSync(__dirname).map(async file => {
			if (!file.endsWith(".js") || file === "index.js") return

			const command = await import(path.join(__dirname, file))
			commands.set(command.data.name, command)
		})
	)
export default commands
