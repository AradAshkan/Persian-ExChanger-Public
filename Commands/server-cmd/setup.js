const { SlashCommandBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder, PermissionFlagsBits } = require('discord.js');
const { connectToDatabase } = require('../../events/database-schema.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('setup')
        .setDescription('Tanzim Kardane Channel Baraye Tablighat')
        .setDMPermission(false)
        .addChannelOption(option =>
            option.setName('channel')
                .setDescription('Select the channel')
                .setRequired(true)),
    async execute(interaction) {
        const guildId = interaction.guild.id;
        const channel = interaction.options.getChannel('channel');
        const owner = await interaction.guild.members.fetch(interaction.guild.ownerId);

        if (!interaction.member.permissions.has(PermissionFlagsBits.Administrator)) {
            return interaction.reply({
                content: 'Baraye Estefade Az in CMD Niaz Be Permission Administrator Darid',
                ephemeral: true,
            });
        }

        if (!channel) {
            await interaction.reply({ content: 'Invalid channel selected. Please select a valid channel.', ephemeral: true });
            return;
        }

        const channelId = channel.id;
        const connection = connectToDatabase();

        const checkQuery = 'SELECT 1 FROM idf WHERE GuildID = ?';
        connection.query(checkQuery, [guildId], async (err, results) => {
            if (err) {
                console.error('Error checking database:', err);
                await interaction.reply({ content: 'Database error occurred.', ephemeral: true });
                return;
            }

            if (results.length > 0) {
                const updateQuery = 'UPDATE idf SET ChannelID = ?, OwnerID = ? WHERE GuildID = ?';
                connection.query(updateQuery, [channelId, owner.id, guildId], async (err) => {
                    if (err) {
                        console.error('Error updating channel in database:', err);
                        await interaction.reply({ content: 'Error updating the channel.', ephemeral: true });
                    } else {
                        await showConfirmationModal(interaction, channel);
                    }
                });
            } else {
                const insertQuery = 'INSERT INTO idf (GuildID, ChannelID, Premium, Verify, OwnerID) VALUES (?, ?, ?, ?, ?)';
                connection.query(insertQuery, [guildId, channelId, "false", "false", owner.id], async (err) => {
                    if (err) {
                        console.error('Error inserting new channel into database:', err);
                        await interaction.reply({ content: 'Error registering the channel.', ephemeral: true });
                    } else {
                        await showConfirmationModal(interaction, channel);
                    }
                });
            }
        });
    }
};

async function showConfirmationModal(interaction, channel) {
    const modal = new ModalBuilder()
        .setCustomId('Setup-Modal-ADS')
        .setTitle('Banere Tabligh');

    const paragraphInput = new TextInputBuilder()
        .setCustomId('ADS-TEXT')
        .setLabel('Matne Tabligh')
        .setStyle(TextInputStyle.Paragraph)
        .setRequired(true);

    const bannerlinkInput = new TextInputBuilder()
        .setCustomId('Banner-Link')
        .setLabel("Linke Banner")
        .setStyle(TextInputStyle.Short)
        .setRequired(false);

    const firstActionRow = new ActionRowBuilder().addComponents(paragraphInput);
    const secondActionRow = new ActionRowBuilder().addComponents(bannerlinkInput);

    modal.addComponents(firstActionRow, secondActionRow);

    await interaction.showModal(modal);
}
