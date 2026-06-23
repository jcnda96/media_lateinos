document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('btn-zip');
    const input = document.getElementById('zip-upload');
    
    if(!btn) return;

    btn.addEventListener('click', async () => {
        if (!input.files || input.files.length === 0) {
            UI.showError('zip-result', 'Please select a .zip file.');
            return;
        }

        const file = input.files[0];
        UI.showLoading('zip-result');
        
        try {
            if (typeof JSZip === 'undefined') {
                throw new Error("JSZip is not loaded.");
            }

            const zip = new JSZip();
            const contents = await zip.loadAsync(file);
            let html = '<ul style="list-style:none; padding:0; color:var(--text-main);">';
            
            for (let filename of Object.keys(contents.files)) {
                if (!contents.files[filename].dir) {
                    const blob = await contents.files[filename].async("blob");
                    const url = URL.createObjectURL(blob);
                    html += `
                        <li style="margin-bottom:0.5rem; padding:0.5rem; border-bottom:1px solid var(--glass-border); display:flex; justify-content:space-between; align-items:center;">
                            <span>${filename}</span>
                            <a href="${url}" download="${filename.split('/').pop()}" style="color:var(--cyber-green); text-decoration:none;">Download</a>
                        </li>
                    `;
                }
            }
            html += '</ul>';

            UI.showResult('zip-result', `
                <div style="padding:1rem; border:1px solid var(--cyber-green); border-radius:8px; background:rgba(0,0,0,0.5);">
                    <p style="color:var(--text-main); margin-bottom:1rem; text-align:center;">Extraction Complete!</p>
                    ${html}
                </div>
            `);

        } catch (err) {
            console.error(err);
            UI.showError('zip-result', 'Failed to extract ZIP file. Ensure it is a valid format.');
        }
    });
});
