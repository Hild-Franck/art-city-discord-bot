import fs from "node:fs"

const env = { ...process.env }

const injectEnvironmentVariables = rawConfig =>
	rawConfig.replace(/\$\{(\w+)\}/g, (_, varName) => {
		const value = env[varName]

		if (value === undefined)
			throw new Error(`Missing env var ${varName} from config file`)
		return value
	})

const rawData = fs.existsSync("config.json")
	? fs.readFileSync("config.json", { encoding: "utf8" })
	: null

const config = rawData ? JSON.parse(injectEnvironmentVariables(rawData)) : null

export default config
