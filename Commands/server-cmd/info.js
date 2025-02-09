const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const { connectToDatabase } = require('../../events/database-schema.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('info')
        .setDescription('Daryafte Etelate Server')
        .setDMPermission(false),
    async execute(interaction) {
        const guildId = interaction.guild.id;
        const guild = interaction.guild;

        try {
            await interaction.deferReply({ ephemeral: true });

            const connection = connectToDatabase();

            connection.query('SELECT Coins FROM idf WHERE GuildID = ?', [guildId], (err, coinResults) => {
                if (err) {
                    console.error('Error retrieving coins from the database:', err);
                }

                const coins = coinResults.length > 0 && coinResults[0].Coins != null ? coinResults[0].Coins : 0;

                connection.query('SELECT Likes FROM Count WHERE GuildID = ?', [guildId], (err, likeResults) => {
                    if (err) {
                        console.error('Error retrieving likes from the database:', err);
                    }

                    const likes = likeResults.length > 0 && likeResults[0].Likes != null ? likeResults[0].Likes : 0;

                    const infoEmbed = new EmbedBuilder()
                        .setTitle(`Server Profile: ${guild.name}`)
                        .setThumbnail(guild.iconURL({ dynamic: true }))
                        .addFields(
                            { name: '<:Id:1319018618104582175> Server ID', value: guildId, inline: false },
                            { name: '<:Owner:1319017449110245377> Owner ID', value: `<@${guild.ownerId}>`, inline: false },
                            { name: '<:Member:1319019248462467162> Members', value: `${guild.memberCount}`, inline: false },
                            { name: '<:Coin:1319018157691637760> Coins', value: `${coins}`, inline: false },
                            { name: '<:Like:1319019092778422353> Likes', value: `${likes}`, inline: false },
                            { name: '<:Time:1319018759897219082> Created At', value: guild.createdAt.toDateString(), inline: false },
                        )
                        .setColor(0xfa948f); // Set Embed Color

                    return interaction.editReply({ embeds: [infoEmbed], ephemeral: true });
                });
            });
        } catch (error) {
            console.error('Error handling interaction:', error);
            return interaction.editReply({ content: 'An error occurred while processing your request.', ephemeral: true });
        }
    }
};