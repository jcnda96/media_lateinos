document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('btn-tt');
    const input = document.getElementById('tt-url');
    
    if(!btn) return;

    btn.addEventListener('click', async () => {
        const url = input.value.trim();
        if (!url) {
            UI.showError('tt-result', 'Please enter a valid TikTok URL.');
            return;
        }

        UI.showLoading('tt-result');
        
        try {
            // Using TikWM API
            const apiUrl = `https://www.tikwm.com/api/?url=${encodeURIComponent(url)}&hd=1`;

            const res = await fetch(apiUrl);
            if (!res.ok) throw new Error('API Error');

            const data = await res.json();
            
            if (data.code === 0 && data.data) {
                const videoUrl = data.data.play || data.data.hdplay;
                UI.showResult('tt-result', `
                    <div style="padding:1rem; border:1px solid var(--cyber-green); border-radius:8px; background:rgba(0,0,0,0.5);">
                        <img src="${data.data.cover}" style="max-width:200px; border-radius:8px; margin-bottom:1rem;" />
                        <p style="color:var(--text-main); margin-bottom:1rem;">Ready to Download!</p>
                        <a href="${videoUrl}" target="_blank" class="cyber-btn" style="text-decoration:none; display:inline-block">Download No Watermark</a>
                    </div>
                `);
            } else {
                UI.showError('tt-result', 'Video not found or API error.');
            }

        } catch (err) {
            console.error(err);
            UI.showError('tt-result', 'Failed to fetch TikTok video. Try again later.');
        }
    });
});
