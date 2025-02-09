const { EmbedBuilder, ChannelType, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    name: 'ready',
    once: true,
    execute(client) {
        client.on('guildCreate', async guild => {
            try {
                const owner = await guild.members.fetch(guild.ownerId);
                const welcomeMessage = 'از اینکه **Persian Exchanger **را به سرور خود اضافه کرده‌اید، سپاسگزاریم. ما هستیم تا به شما کمک کنیم تبلیغات حرفه‌ای و مؤثر کسب‌وکارهای مختلف را در دیسکورد اجرا کنید.\n**لطفاً برای استفاده بهتر از خدمات ما، قوانین زیر را مرور کنید:**\n\n- **محتوای مجاز:** تبلیغات باید حرفه‌ای و بدون محتوای غیرقانونی، خشونت‌آمیز، یا توهین‌آمیز باشد\n- **ممنوعیت محتوای غیراخلاقی:** ارسال ویدیوها یا تصاویر پورنوگرافی، محتوای جنسی صریح، یا مطالب مرتبط با قمار، مواد مخدر و خشونت ممنوع است\n- **مسئولیت محتوا: ** مسئولیت تبلیغات ارسال‌شده از طریق بات بر عهده شما و مدیران سرور است\n\n**در صورت رعایت نکردن قوانین:**\n**ابتدا** یک اخطار رسمی دریافت خواهید کرد. **در صورت تکرار تخلف،** ممکن است دسترسی سرور شما به بات موقتاً محدود شود\n**نقض جدی قوانین یا تخلفات مکرر** ممکن است منجر به مسدودسازی دائمی بات در سرور شما شود\n\n**پشتیبانی و سؤالات:**\nاگر در استفاده از بات با مشکلی روبرو شدید یا سؤالی دارید، تیم پشتیبانی ما آماده کمک به شماست. برای ارتباط با پشتیبانی، به صفحه رسمی بات، سایت یا سرور پشتیبانی ما مراجعه کنید. اطلاعات در بایو بات دیسکورد نوشته شده‌است\nبرای مشاهده کامندهای بات می‌توانید از دستور help/ استفاده کنید\n\n**از اینکه به ایجاد محیطی حرفه‌ای و امن برای تبلیغات کمک می‌کنید، سپاسگزاریم. بیایید با همکاری یکدیگر تجربه‌ای بی‌نظیر ایجاد کنیم!** 🖐️\n* **Website:** https://persian-exchanger.ir/\n* **Discord:** https://persian-exchanger.ir/discord';
                const OwnerEmbed = new EmbedBuilder()
                .setTitle('سلام! :wave:')
                .setDescription(welcomeMessage)
                .setThumbnail(client.user.displayAvatarURL())
                .setColor(0xfa948f)
                await owner.send({ embeds : [OwnerEmbed], ephemeral : false });
                console.log(`Pm Be Owner Server ${guild.name} Join Shod`);
            } catch (error) {
                console.error('مشکلی در ارسال پیام خوشامدگویی رخ داد:', error);            
            }

            try {
                const mainServerId = 'Your_Main_ServerID';
                const mainChannelId = 'Your_Main_ChannelID';
                const mainGuild = client.guilds.cache.get(mainServerId);
                const mainChannel = mainGuild.channels.cache.get(mainChannelId);
                const totalGuilds = client.guilds.cache.size;

                if (!mainChannel || mainChannel.type !== ChannelType.GuildText) {
                    console.error('Channel Yaft Nashod');
                    return;
                }

                const firstTextChannel = guild.channels.cache.find(channel => channel.type === ChannelType.GuildText);
                if (!firstTextChannel) {
                    console.error('Hich Text Channeli Yaft Nashod');
                    return;
                }
                const invite = await firstTextChannel.createInvite({ maxAge: 0, maxUses: 0 });
                const inviteUrl = invite.url;

                const embed = new EmbedBuilder()
                    .setTitle('سرور جدید!')
                    .setDescription(`**بات به سرور __${guild.name}__ اضافه شد.\nتعداد ممبر های سرور: ${guild.memberCount}\n\nتعداد سرور های ربات: ${totalGuilds}**`)
                    .setThumbnail(guild.iconURL({ dynamic: true }))
                    .setColor(0xfa948f);

                const row = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setLabel('Join Server')
                            .setStyle(ButtonStyle.Link)
                            .setURL(inviteUrl)
                    );

                await mainChannel.send({ embeds: [embed], components: [row] });
            } catch (error) {
                console.error('مشکلی در ارسال پیام اطلاعات سرور جدید رخ داد:', error);
            }
        });
    },
};
