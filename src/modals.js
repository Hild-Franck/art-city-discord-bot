import {
	ModalBuilder,
	TextInputBuilder,
	TextInputStyle,
	ActionRowBuilder
} from "discord.js"

const modals = {
	"delete-message-modal": () => {
		const modal = new ModalBuilder()
			.setCustomId("delete-message-modal")
			.setTitle("Delete message")
		const favoriteColorInput = new TextInputBuilder()
			.setCustomId("delete-message-reason")
			.setLabel("Why do you want to delete this message ?")
			.setStyle(TextInputStyle.Short)
		const firstActionRow = new ActionRowBuilder().addComponents(
			favoriteColorInput
		)
		modal.addComponents(firstActionRow)
		return modal
	}
}

const createModal = name => {
	const modalFactory = modals[name]
	if (!modalFactory) return console.error(`Modal ${name} does not exist`)

	return modalFactory()
}

export default createModal
