document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href.startsWith('#')) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});


const fadeInElements = document.querySelectorAll('.fade-in');

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1
});

fadeInElements.forEach(element => observer.observe(element));

// Servers Tab
const servers = [
    { id: 'servers_ID', name: 'Server_Name', icon: './images/server-icon1.png' },
    { id: 'servers_ID', name: 'Server_Name', icon: './images/server-icon2.png' },
    { id: 'servers_ID', name: 'Server_Name', icon: './images/server-icon3.png' },
    { id: 'servers_ID', name: 'Server_Name', icon: './images/server-icon4.png' },
    { id: 'servers_ID', name: 'Server_Name', icon: './images/server-icon5.png' }, 
    { id: 'servers_ID', name: 'Server_Name', icon: './images/server-icon6.png' },
];

const serverContainer = document.getElementById('servers');

servers.forEach(server => {
    const container = document.createElement('div');
    container.classList.add('server-container');

    const icon = document.createElement('div');
    icon.classList.add('server-icon');
    icon.style.backgroundImage = `url(${server.icon})`;
    icon.onclick = () => showDetails(server.id);

    const name = document.createElement('div');
    name.classList.add('server-name');
    name.textContent = server.name;

    container.appendChild(icon);
    container.appendChild(name);
    serverContainer.appendChild(container);
});

function showDetails(serverId) {
    const overlay = document.getElementById('overlay');
    const details = document.getElementById('serverDetails');
    const iframe = document.getElementById('serverIframe');

    overlay.style.display = 'block';
    details.style.display = 'flex';
    iframe.src = `https://discord.com/widget?id=${serverId}&theme=dark`;
}

function hideDetails() {
    const overlay = document.getElementById('overlay');
    const details = document.getElementById('serverDetails');
    const iframe = document.getElementById('serverIframe');

    overlay.style.display = 'none';
    details.style.display = 'none';
    iframe.src = '';
}
