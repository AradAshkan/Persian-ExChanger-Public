const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const { connectToDatabase } = require('../../events/database-schema.js');
const { randomRange } = require('../../config.sample.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('daily-reward')
        .setDescription('Daryaft Reward Roozane')
        .setDMPermission(false),
    async execute(interaction) {
        const guildId = interaction.guild.id;
        const now = new Date();

        try {
            await interaction.deferReply({ ephemeral: true });

            const connection = connectToDatabase();

            const checkQuery = 'SELECT Coins, DailyReward FROM idf WHERE GuildID = ?';
            connection.query(checkQuery, [guildId], (err, results) => {
                if (err) {
                    console.error('Error querying the database:', err);
                    return interaction.editReply({ content: 'An error occurred while accessing the database.', ephemeral: true });
                }

                const randomCoins = Math.floor(Math.random() * (randomRange.max - randomRange.min + 1)) + randomRange.min;

                if (results.length === 0) {
                    const insertQuery = 'INSERT INTO idf (GuildID, Coins, DailyReward) VALUES (?, ?, ?)';
                    connection.query(insertQuery, [guildId, randomCoins, now], (insertErr) => {
                        if (insertErr) {
                            console.error('Error inserting new guild data:', insertErr);
                            return interaction.editReply({ content: 'An error occurred while saving data.', ephemeral: true });
                        }

                        const RecieveCoin = new EmbedBuilder()
                            .setDescription(`***You received ${randomCoins} coins for today.***`)
                            .setColor(0xfa948f);

                        interaction.editReply({ embeds: [RecieveCoin], ephemeral: true });
                    });
                } else {
                    const coins = parseInt(results[0].Coins) || 0;
                    const lastUsed = results[0].DailyReward ? new Date(results[0].DailyReward) : null;

                    if (lastUsed) {
                        const nextAvailableTime = new Date(lastUsed.getTime() + (24 * 60 * 60 * 1000)); // 24h
                        if (now < nextAvailableTime) {
                            const timeLeftMs = nextAvailableTime - now;
                            const days = Math.floor(timeLeftMs / (24 * 60 * 60 * 1000));
                            const hours = Math.floor((timeLeftMs % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
                            const minutes = Math.floor((timeLeftMs % (60 * 60 * 1000)) / (60 * 1000));

                            let timeLeftString = '';
                            if (days > 0) timeLeftString += `${days} day${days > 1 ? 's' : ''}`;
                            if (hours > 0) timeLeftString += `${timeLeftString ? ', ' : ''}${hours} hour${hours > 1 ? 's' : ''}`;
                            if (minutes > 0) timeLeftString += `${timeLeftString ? ' and ' : ''}${minutes} minute${minutes > 1 ? 's' : ''}`;

                            const cooldownEmbed = new EmbedBuilder()
                                .setDescription(`***You can use this command again in ${timeLeftString} ⏳***`)
                                .setColor(0xfa948f);
                            return interaction.editReply({ embeds: [cooldownEmbed], ephemeral: true });
                        }
                    }

                    const newCoins = coins + randomCoins;
                    const updateQuery = 'UPDATE idf SET Coins = ?, DailyReward = ? WHERE GuildID = ?';
                    connection.query(updateQuery, [newCoins, now, guildId], (updateErr) => {
                        if (updateErr) {
                            console.error('Error updating guild data:', updateErr);
                            return interaction.editReply({ content: 'An error occurred while updating data.', ephemeral: true });
                        }
                        const RecieveCoin = new EmbedBuilder()
                            .setDescription(`***You received ${randomCoins} coins for today. Your total coins: ${newCoins}***`)
                            .setColor(0xfa948f);

                        interaction.editReply({ embeds: [RecieveCoin], ephemeral: true });
                    });
                }
            });
        } catch (error) {
            console.error('Error handling interaction:', error);
            interaction.editReply({ content: 'An error occurred while processing your request.', ephemeral: true });
        }
    }
};
