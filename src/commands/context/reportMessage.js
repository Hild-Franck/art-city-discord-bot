import {
	ContextMenuCommandBuilder,
	ApplicationCommandType,
	MessageFlags,
	ActionRowBuilder,
	ButtonBuilder,
	ButtonStyle
} from "discord.js"
import channels from "../../channels"
import embeds from "../../embeds"
import roles from "../../roles"

const getButtonInteraction = async (replyMessage, interaction) => {
	try {
		const buttonInteraction = await replyMessage.awaitMessageComponent({
			filter: i =>
				i.user.id === interaction.user.id &&
				(i.customId === "reportConfirm" || i.customId === "reportCancel"),
			time: 15_000
		})
		return buttonInteraction
	} catch {
		return null
	}
}

export const data = new ContextMenuCommandBuilder()
	.setName("Signaler le message")
	.setType(ApplicationCommandType.Message)

export const execute = async interaction => {
	const message = await interaction.channel.messages.fetch(interaction.targetId)
	const row = new ActionRowBuilder().addComponents(
		new ButtonBuilder()
			.setCustomId("reportConfirm")
			.setLabel("Confirmer")
			.setStyle(ButtonStyle.Danger),
		new ButtonBuilder()
			.setCustomId("reportCancel")
			.setLabel("Annuler")
			.setStyle(ButtonStyle.Secondary)
	)

	await interaction.reply({
		embeds: [embeds.confirm(interaction.user)],
		components: [row],
		flags: MessageFlags.Ephemeral
	})

	const replyMessage = await interaction.fetchReply()
	const buttonInteraction = await getButtonInteraction(
		replyMessage,
		interaction
	)

	if (!buttonInteraction)
		return interaction.editReply({
			embeds: [embeds.timeout()],
			components: []
		})
	if (buttonInteraction.customId === "reportCancel") {
		return buttonInteraction.update({
			embeds: [embeds.cancel()],
			components: []
		})
	}

	await buttonInteraction.update({
		embeds: [embeds.success()],
		components: []
	})

	return channels.get("logs").send({
		content: `<@&${roles.get("mods").id}>`,
		embeds: [embeds.report(message, interaction.user)]
	})
}
