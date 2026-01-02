import config from "./config"

const roles = new Map()

export const populateRoles = async client => {
	const guild = await client.guilds.fetch(process.env.GUILD_ID)

	await Promise.all(
		(config.roles ?? []).map(async ({ name, id }) => {
			const role = await guild.roles.fetch(id)

			if (!role) {
				console.error(`Role "${name}" not found (id: ${id})`)
				return
			}

			roles.set(name, role)
		})
	)
}

export default roles