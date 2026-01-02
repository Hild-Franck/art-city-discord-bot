import { EmbedBuilder } from "discord.js"
import roles from "./roles"

export default {
	cancel: () =>
		new EmbedBuilder()
			.setColor(0x95a5a6)
			.setDescription("❌ Signalement annulé."),
	success: () =>
		new EmbedBuilder()
			.setColor(0x2ecc71)
			.setDescription(
				"✅ Merci, ton signalement a bien été transmis aux modérateurs."
			),
	timeout: () =>
		new EmbedBuilder()
			.setColor(0x95a5a6)
			.setDescription("❌ Signalement annulé (délai dépassé)."),
	confirm: interactionUser =>
		new EmbedBuilder()
			.setColor(0xf1c40f)
			.setTitle("⚠️ Demande de confirmation de signalement")
			.setDescription(
				`${interactionUser}, es-tu sûr(e) de vouloir signaler ce message ?\n` +
					"*Les signalements abusifs peuvent entraîner des sanctions.*"
			),
	report: (message, interactionUser) =>
		new EmbedBuilder()
			.setTitle(":rotating_light: Nouveau message signalé !")
			.setColor(0xe74c3c)
			.setDescription(
				`<@&${roles.get("mods").id}>, un signalement requiert votre attention !`
			)
			.addFields(
				{
					name: "Auteur",
					value: message.author.toString(),
					inline: true
				},
				{
					name: "Signalé par",
					value: interactionUser.toString(),
					inline: true
				},
				{
					name: "Message",
					value: `[Aller au message](${message.url})`,
					inline: true
				}
			)
}
