document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('btn-yt');
    const input = document.getElementById('yt-url');
    const format = document.getElementById('yt-format');
    
    if(!btn) return;

    btn.addEventListener('click', async () => {
        const url = input.value.trim();
        if (!url) {
            UI.showError('yt-result', 'Please enter a valid YouTube URL.');
            return;
        }

        UI.showLoading('yt-result');
        
        try {
            // Fallback public instance of Cobalt API
            const apiUrl = 'https://co.wuk.sh/api/json'; 
            const isAudio = format.value === 'audio';

            const res = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    url: url,
                    isAudioOnly: isAudio,
                    aFormat: isAudio ? "mp3" : "best",
                    vQuality: "1080"
                })
            });

            if (!res.ok) throw new Error('API Error');

            const data = await res.json();
            
            if (data.status === 'stream' || data.status === 'redirect') {
                UI.showResult('yt-result', `
                    <div style="padding:1rem; border:1px solid var(--cyber-green); border-radius:8px; background:rgba(0,0,0,0.5);">
                        <p style="color:var(--text-main); margin-bottom:1rem;">Ready to Download!</p>
                        <a href="${data.url}" target="_blank" class="cyber-btn" style="text-decoration:none; display:inline-block">Download Now</a>
                    </div>
                `);
            } else {
                UI.showError('yt-result', 'Error processing video. It might be age-restricted or unavailable.');
            }

        } catch (err) {
            console.error(err);
            UI.showError('yt-result', 'Cobalt API is currently rate-limited or unavailable. Try again later.');
        }
    });
});
