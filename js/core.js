/**
 * Media Lateinos - Core Script
 * - Matrix Rain Background
 * - PWA Service Worker Registration
 * - Dynamic SEO / AEO Generation
 */

document.addEventListener("DOMContentLoaded", () => {
    initMatrixRain();
    initPWA();
    injectDynamicSEO();
});

function initMatrixRain() {
    const canvas = document.getElementById('matrix-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    const characters = 'LATEINOS369ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍ'.split('');
    const fontSize = 14;
    let columns = width / fontSize;
    const drops = [];

    for (let x = 0; x < columns; x++) {
        drops[x] = 1;
    }

    // Colors
    const isRed = Math.random() > 0.5;
    const color = isRed ? '#ff003c' : '#ccff00';

    function draw() {
        ctx.fillStyle = 'rgba(10, 10, 12, 0.05)'; // Trail effect
        ctx.fillRect(0, 0, width, height);

        ctx.fillStyle = color;
        ctx.font = fontSize + 'px monospace';

        for (let i = 0; i < drops.length; i++) {
            const text = characters[Math.floor(Math.random() * characters.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);

            if (drops[i] * fontSize > height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
        requestAnimationFrame(draw);
    }
    draw();

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        columns = width / fontSize;
        for (let x = 0; x < columns; x++) {
            if(!drops[x]) drops[x] = 1;
        }
    });
}

function initPWA() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js').catch(err => {
            console.warn('PWA SW Registration skipped (Likely Blogger restriction).', err);
        });
    }
}

function injectDynamicSEO() {
    const lang = navigator.language || 'en';
    const html = document.documentElement;
    html.lang = lang;

    // Hreflang
    const link = document.createElement('link');
    link.rel = 'alternate';
    link.hreflang = lang;
    link.href = window.location.href;
    document.head.appendChild(link);

    // Schema.org
    const schema = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": document.title,
        "url": window.location.href,
        "publisher": {
            "@type": "Organization",
            "name": "Lateinos Media"
        }
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schema);
    document.head.appendChild(script);
}

// Utility class for UI interactions
class UI {
    static showLoading(elementId) {
        const el = document.getElementById(elementId);
        if(el) el.innerHTML = '<div class="loader" style="display:block"></div>';
    }
    static showError(elementId, msg) {
        const el = document.getElementById(elementId);
        if(el) el.innerHTML = `<div style="color:var(--cyber-red); font-weight:bold; margin-top:1rem;">⚠️ ${msg}</div>`;
    }
    static showResult(elementId, html) {
        const el = document.getElementById(elementId);
        if(el) el.innerHTML = html;
    }
}
window.UI = UI;
