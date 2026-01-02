import { SlashCommandBuilder } from "discord.js"

export default {
	data: new SlashCommandBuilder()
		.setName("ok")
		.setDescription("Pouette"),

	async execute(interaction) {
		await interaction.reply("ok")
	}
}