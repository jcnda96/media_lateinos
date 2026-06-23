document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('btn-remove-bg');
    const input = document.getElementById('bg-upload');
    
    if(!btn || !input) return;

    btn.addEventListener('click', async () => {
        if (!input.files || input.files.length === 0) {
            UI.showError('bg-result', 'Please select an image first.');
            return;
        }

        const file = input.files[0];
        UI.showLoading('bg-result');
        
        try {
            // Utilizando a lib do imgly disponível no global scope via CDN
            const blob = await imglyRemoveBackground(file);
            const url = URL.createObjectURL(blob);
            
            UI.showResult('bg-result', `
                <img src="${url}" style="max-width:100%; border-radius:8px; margin-bottom:1rem; border: 1px dashed var(--cyber-green);" alt="Removed Background Result" />
                <br/>
                <a href="${url}" download="no-bg-${file.name}" class="cyber-btn" style="text-decoration:none; display:inline-block">Download HD Image</a>
            `);
        } catch (err) {
            console.error(err);
            UI.showError('bg-result', 'Failed to remove background. Please try another image or check browser compatibility.');
        }
    });
});
