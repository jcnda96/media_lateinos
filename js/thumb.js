document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('btn-thumb');
    const input = document.getElementById('thumb-url');
    
    if(!btn) return;

    btn.addEventListener('click', () => {
        const url = input.value.trim();
        if (!url) {
            UI.showError('thumb-result', 'Please enter a valid YouTube URL.');
            return;
        }

        UI.showLoading('thumb-result');
        
        try {
            // Extract Video ID
            const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
            const match = url.match(regExp);
            
            if (match && match[2].length === 11) {
                const videoId = match[2];
                const maxres = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
                const hq = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

                UI.showResult('thumb-result', `
                    <div style="padding:1rem; border:1px solid var(--cyber-green); border-radius:8px; background:rgba(0,0,0,0.5);">
                        <p style="color:var(--text-main); margin-bottom:1rem;">Thumbnail Extracted!</p>
                        <img src="${maxres}" onerror="this.src='${hq}'" style="max-width:100%; border-radius:8px; margin-bottom:1rem;" />
                        <br/>
                        <a href="${maxres}" target="_blank" class="cyber-btn" style="text-decoration:none; display:inline-block">View Full HD</a>
                    </div>
                `);
            } else {
                UI.showError('thumb-result', 'Invalid YouTube URL.');
            }
        } catch (err) {
            console.error(err);
            UI.showError('thumb-result', 'Failed to extract thumbnail.');
        }
    });
});
