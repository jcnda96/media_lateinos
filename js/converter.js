document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('btn-conv');
    const input = document.getElementById('conv-upload');
    const formatSelect = document.getElementById('conv-format');
    const qualitySelect = document.getElementById('conv-quality');
    
    if(!btn) return;
    btn.addEventListener('click', () => {
        if (!input.files || input.files.length === 0) {
            UI.showError('conv-result', 'Please select an image first.');
            return;
        }
        const file = input.files[0];
        const format = formatSelect.value;
        const quality = parseFloat(qualitySelect.value);
        
        UI.showLoading('conv-result');
        
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                canvas.width = img.width;
                canvas.height = img.height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0);
                const dataUrl = canvas.toDataURL(format, quality);
                const ext = format.split('/')[1];
                const newName = file.name.split('.')[0] + '-converted.' + ext;
                UI.showResult('conv-result', `
                    <div style="padding:1rem; border:1px solid var(--cyber-green); border-radius:8px; background:rgba(0,0,0,0.5);">
                        <p style="color:var(--text-main); margin-bottom:1rem;">Conversion Successful!</p>
                        <a href="${dataUrl}" download="${newName}" class="cyber-btn" style="text-decoration:none; display:inline-block">Download ${ext.toUpperCase()}</a>
                    </div>
                `);
            };
            img.onerror = () => UI.showError('conv-result', 'Invalid image file.');
            img.src = e.target.result;
        };
        reader.onerror = () => UI.showError('conv-result', 'Error reading file.');
        reader.readAsDataURL(file);
    });
});
