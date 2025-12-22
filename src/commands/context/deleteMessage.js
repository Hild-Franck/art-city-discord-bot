import {
	ContextMenuCommandBuilder,
	ApplicationCommandType,
	MessageFlags
} from "discord.js"
import channels from "../../channels"
import createModal from "../../modals"

export const data = new ContextMenuCommandBuilder()
	.setName("Delete message")
	.setType(ApplicationCommandType.Message)

export const execute = async interaction => {
	const message = await interaction.channel.messages.fetch(interaction.targetId)
	await message.delete()
	const modal = createModal("delete-message-modal")
	await interaction.showModal(modal)
	const modalInteraction = await interaction.awaitModalSubmit({
		filter: m => m.customId === "delete-message-modal",
		time: 15_000
	})
	const reason = modalInteraction.fields.fields.get(
		"delete-message-reason"
	).value
	await channels
		.get("logs")
		.send(
			`Message de ${message.author.toString()} a ete supprime.\n\n${message.content}\n\nModerateur: ${interaction.user.toString()}\n\nRaison: ${reason}`
		)
	await modalInteraction.reply({
		content: `Thank you for your report ! You deleted the message for the following reason:\\n\\n${reason}`,
		flags: MessageFlags.Ephemeral
	})
}
