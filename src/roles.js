import config from "./config"

const roles = new Map()

export const populateRoles = async client => {
	const guild = await client.guilds.fetch(process.env.GUILD_ID)

	return Promise.all(
		config.roles.map(async ({ name, id }) => {
			const role = await guild.roles.fetch(id)
			roles.set(name, role)
		})
	)
}

export default roles
