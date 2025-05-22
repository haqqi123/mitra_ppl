document.addEventListener('DOMContentLoaded', function() {
    // Menu navigation
    const menuItems = document.querySelectorAll('.menu-item');
    const panels = document.querySelectorAll('.panel');
    const pageTitle = document.getElementById('page-title');

    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            // Handle logout separately
            if (!this.querySelector('.menu-icon').textContent.includes('🚪')) {
                // Remove active class from all menu items and panels
                menuItems.forEach(i => i.classList.remove('active'));
                panels.forEach(p => p.classList.remove('active'));
                
                // Add active class to clicked menu item
                this.classList.add('active');
                
                // Show corresponding panel
                const target = this.getAttribute('data-target');
                if (target) {
                    document.getElementById(target).classList.add('active');
                    // Update page title based on menu item text
                    pageTitle.textContent = this.querySelector('span').textContent;
                }
            } else {
                // Logout functionality
                if (confirm('Apakah Anda yakin ingin keluar?')) {
                    // In a real app, this would redirect to logout URL
                    alert('Anda telah keluar. Mengarahkan ke halaman login...');
                    window.location.href = 'login.html'; // Assuming login page
                }
            }
        });
    });

    // Save profile button functionality
    const saveProfileBtn = document.getElementById('save-profile');
    if (saveProfileBtn) {
        saveProfileBtn.addEventListener('click', function() {
            const newPassword = document.getElementById('new-password').value;
            const confirmPassword = document.getElementById('confirm-password').value;
            
            if (newPassword && newPassword !== confirmPassword) {
                alert('Kata sandi baru dan konfirmasi kata sandi tidak cocok!');
                return;
            }
            
            // In a real app, this would send data to server
            alert('Perubahan profil berhasil disimpan!');
            
            // Clear password fields
            document.getElementById('new-password').value = '';
            document.getElementById('confirm-password').value = '';
        });
    }

    // File upload interaction
    const fileUploads = document.querySelectorAll('.file-upload');
    fileUploads.forEach(upload => {
        const fileInput = upload.querySelector('.file-input');
        const dropZone = upload.querySelector('div');
        
        // Highlight drop zone when dragging over
        upload.addEventListener('dragover', (e) => {
            e.preventDefault();
            upload.classList.add('dragover');
        });
        
        upload.addEventListener('dragleave', () => {
            upload.classList.remove('dragover');
        });
        
        upload.addEventListener('drop', (e) => {
            e.preventDefault();
            upload.classList.remove('dragover');
            if (e.dataTransfer.files.length) {
                fileInput.files = e.dataTransfer.files;
                updateFileName(upload, e.dataTransfer.files[0].name);
            }
        });
        
        // Handle file selection via button
        fileInput.addEventListener('change', () => {
            if (fileInput.files.length) {
                updateFileName(upload, fileInput.files[0].name);
            }
        });
        
        // Click on drop zone triggers file input
        dropZone.addEventListener('click', () => {
            fileInput.click();
        });
    });
    
    function updateFileName(uploadElement, fileName) {
        const dropZone = uploadElement.querySelector('div');
        dropZone.textContent = `📄 ${fileName}`;
        dropZone.style.color = '#4CAF50';
    }

    // Table row actions
    document.querySelectorAll('.data-table tbody tr').forEach(row => {
        const deleteBtn = row.querySelector('.btn-danger');
        if (deleteBtn) {
            deleteBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                if (confirm('Apakah Anda yakin ingin menghapus item ini?')) {
                    row.remove();
                    // In a real app, this would send a delete request to the server
                    alert('Item berhasil dihapus!');
                }
            });
        }
        
        // View/edit buttons would open modals or redirect in a real app
        row.querySelectorAll('.btn-secondary').forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.stopPropagation();
                const action = btn.textContent.trim();
                alert(`${action} action would be performed here.`);
            });
        });
    });
});