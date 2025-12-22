module.exports = api => {
	api.cache(true)
	return {
		ignore: [/node_modules/],
		presets: [["@babel/preset-env", { targets: { node: "current" } }]],
		plugins: ["@babel/plugin-transform-runtime"]
	}
}
