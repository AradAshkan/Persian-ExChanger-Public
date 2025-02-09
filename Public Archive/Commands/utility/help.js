const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Bot Cmd Info')
		.setDMPermission(false),
    async execute(interaction) {
        const helpEmbed = new EmbedBuilder()
            .setTitle('اطلاعات کامند های ربات')
            // .setDescription(``)
            .setThumbnail(interaction.client.user.displayAvatarURL())
            .addFields(
                { name: '</setup:1314886968210882633>', value: 'تنظیمات سرور', inline: true },
                { name: '</remove-setup:1314384461110055006>', value: 'حذف تنظیمات سرور', inline: true },
                { name: '</daily-reward:1314384461110055004>', value: 'دریافت کوین روزانه', inline: true },
                { name: '</info:1315002024064061614>', value: 'اطلاعات سرور', inline: true },
                { name: '</like:1315024199114293290>', value: 'لایک سرور', inline: true },
            )
            .setColor(0xfa948f);


        interaction.reply({ content: `<@${interaction.user.id}>`, embeds: [helpEmbed], ephemeral : true });
    }
};
