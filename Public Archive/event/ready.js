const { ActivityType } = require('discord.js');

module.exports = {
    name: 'ready',
    once: true,
    execute(client) {
        console.log(`Logged in as ${client.user.tag}!`);

        const updateStatus = () => {
            const totalGuilds = client.guilds.cache.size;
            let totalMembers = 0;

            client.guilds.cache.forEach(guild => {
                totalMembers += guild.memberCount;
            });

            const status = `${totalGuilds} Servers And ${totalMembers} Members`;
            client.user.setActivity(status, { type: ActivityType.Watching });
        };

        updateStatus();
        setInterval(updateStatus, 60000);
    },
};
