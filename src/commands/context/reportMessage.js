import {
	ContextMenuCommandBuilder,
	ApplicationCommandType,
	MessageFlags,
    EmbedBuilder,
    ActionRowBuilder,
	ButtonBuilder,
	ButtonStyle
} from "discord.js"
import channels from "../../channels"
import roles from "../../roles"

export const data = new ContextMenuCommandBuilder()
	.setName("Signaler le message")
	.setType(ApplicationCommandType.Message)

export const execute = async interaction => {
	const message = await interaction.channel.messages.fetch(interaction.targetId)
    const images = [...message.attachments.values()].filter(att =>
        att.contentType?.startsWith("image/")
    )
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
    const embedLogs = new EmbedBuilder()
        .setTitle(":rotating_light: Nouveau message signalé !")
        .setColor(0xe74c3c)
        .setDescription(
            `${roles.get("mods")}, un signalement requiert votre attention !`)
        .addFields(
            {
                name:"Auteur",
                value: message.author.toString(),
                inline: true
            },
            {
                name: "Signalé par",
                value: interaction.user.toString(),
                inline: true
            },
            {
                name: "Message",
                value: `[Aller au message](${message.url})`,
                inline: true
            }

        )

    const embedConfirm = new EmbedBuilder()
	.setColor(0xf1c40f)
	.setTitle("⚠️ Demande de confirmation de signalement")
	.setDescription(
		`${interaction.user}, es-tu sûr(e) de vouloir signaler ce message ?\n` +
		"*Les signalements abusifs peuvent entraîner des sanctions.*"
	)
    const embedCancel = new EmbedBuilder()
	.setColor(0x95a5a6)
	.setDescription("❌ Signalement annulé.")

    const embedSuccess = new EmbedBuilder()
	.setColor(0x2ecc71)
	.setDescription("✅ Merci, ton signalement a bien été transmis aux modérateurs.")

    const embedTimeout = new EmbedBuilder()
	.setColor(0x95a5a6)
	.setDescription("❌ Signalement annulé (délai dépassé).")

	await interaction.reply({
		embeds: [embedConfirm],
        components: [row],
		flags: MessageFlags.Ephemeral
	})
    const replyMessage = await interaction.fetchReply()
    let buttonInteraction
	try {
		buttonInteraction = await replyMessage.awaitMessageComponent({
			filter: i =>
				i.user.id === interaction.user.id &&
				(i.customId === "reportConfirm" || i.customId === "reportCancel"),
			time: 15_000
		})
    } catch {
        return interaction.editReply({
		    embeds: [embedTimeout],
			components: []
		})
	}
    if (buttonInteraction.customId === "reportCancel") {
		return buttonInteraction.update({
			embeds: [embedCancel],
			components: []
		})
	}
    if (buttonInteraction.customId === "reportConfirm") {
	await buttonInteraction.update({
		embeds: [embedSuccess],
		components: []
	})
    await channels
		.get("logs")
		.send({ embeds: [embedLogs] })

	return
}
}