// Temporary local authentication
const ADMIN_EMAIL = 'pmcknight1020@googlemail.com';
const ADMIN_PASSWORD = 'Admin123!';

// Supabase Configuration
const SUPABASE_URL = 'https://ocyiricqofsyhzxttwcb.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9jeWlyaWNxb2ZzeWh6eHR0d2NiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQwNzgzNzQsImV4cCI6MjA3OTY1NDM3NH0.DXy_AudnBH3Zm1rQ_1reZGxT3a0SVmgKMkDyT-krm18';

let supabase = null;
try {
    supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
} catch (err) {
    console.error('Failed to create Supabase client:', err);
}

// Check authentication on page load
window.addEventListener('DOMContentLoaded', async () => {
    const isLoggedIn = localStorage.getItem('admin_logged_in') === 'true';

    if (isLoggedIn) {
        showDashboard();
        loadTrees();
        loadFungi();
    } else {
        showLogin();
    }
});

// Login
document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const errorDiv = document.getElementById('login-error');

    console.log('Attempting login with:', email);

    // Simple local authentication for now
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        console.log('Login successful!');
        localStorage.setItem('admin_logged_in', 'true');
        errorDiv.classList.add('hidden');
        showDashboard();
        loadTrees();
        loadFungi();
    } else {
        console.error('Login failed: Invalid credentials');
        errorDiv.textContent = 'Invalid email or password';
        errorDiv.classList.remove('hidden');
    }
});

// Logout
async function logout() {
    localStorage.removeItem('admin_logged_in');
    showLogin();
}

// UI Functions
function showLogin() {
    document.getElementById('login-screen').classList.remove('hidden');
    document.getElementById('admin-dashboard').classList.add('hidden');
}

function showDashboard() {
    document.getElementById('login-screen').classList.add('hidden');
    document.getElementById('admin-dashboard').classList.remove('hidden');
}

function switchTab(tab) {
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(t => t.classList.remove('active'));
    
    if (tab === 'trees') {
        document.querySelector('.tab:nth-child(1)').classList.add('active');
        document.getElementById('trees-tab').classList.remove('hidden');
        document.getElementById('fungi-tab').classList.add('hidden');
    } else {
        document.querySelector('.tab:nth-child(2)').classList.add('active');
        document.getElementById('trees-tab').classList.add('hidden');
        document.getElementById('fungi-tab').classList.remove('hidden');
    }
}

// Load Trees
async function loadTrees() {
    const treesList = document.getElementById('trees-list');

    if (!supabase) {
        treesList.innerHTML = '<p style="color: red; padding: 20px;">⚠️ Cannot connect to database. Please check your internet connection.</p>';
        return;
    }

    try {
        const { data: trees, error } = await supabase
            .from('tree_species')
            .select('*')
            .order('common_name');

        if (error) {
            console.error('Error loading trees:', error);
            treesList.innerHTML = '<p style="color: red; padding: 20px;">Error loading trees: ' + error.message + '</p>';
            return;
        }

        treesList.innerHTML = '';

        if (!trees || trees.length === 0) {
            treesList.innerHTML = '<p style="padding: 20px;">No trees found. Click "+ Add New Tree" to add one.</p>';
            return;
        }

        trees.forEach(tree => {
            const item = document.createElement('div');
            item.className = 'data-item';
            item.innerHTML = `
                <div>
                    <h3>${tree.common_name}</h3>
                    <p><em>${tree.latin_name}</em></p>
                </div>
                <div class="btn-group">
                    <button class="btn-edit" onclick="editTree('${tree.id}')">Edit</button>
                    <button class="btn-delete" onclick="deleteTree('${tree.id}')">Delete</button>
                </div>
            `;
            treesList.appendChild(item);
        });
    } catch (err) {
        console.error('Exception loading trees:', err);
        treesList.innerHTML = '<p style="color: red; padding: 20px;">Failed to connect to database: ' + err.message + '</p>';
    }
}

// Load Fungi
async function loadFungi() {
    const fungiList = document.getElementById('fungi-list');

    if (!supabase) {
        fungiList.innerHTML = '<p style="color: red; padding: 20px;">⚠️ Cannot connect to database. Please check your internet connection.</p>';
        return;
    }

    try {
        const { data: fungi, error } = await supabase
            .from('fungi')
            .select(`
                *,
                tree_species (common_name)
            `)
            .order('common_name');

        if (error) {
            console.error('Error loading fungi:', error);
            fungiList.innerHTML = '<p style="color: red; padding: 20px;">Error loading fungi: ' + error.message + '</p>';
            return;
        }

        fungiList.innerHTML = '';

        if (!fungi || fungi.length === 0) {
            fungiList.innerHTML = '<p style="padding: 20px;">No fungi found. Click "+ Add New Fungus" to add one.</p>';
            return;
        }

        fungi.forEach(fungus => {
            const item = document.createElement('div');
            item.className = 'data-item';
            item.innerHTML = `
                <div>
                    <h3>${fungus.common_name}</h3>
                    <p><em>${fungus.scientific_name}</em> - ${fungus.tree_species?.common_name || 'Unknown tree'}</p>
                    <p>Risk: ${fungus.risk_level}</p>
                </div>
                <div class="btn-group">
                    <button class="btn-edit" onclick="editFungus('${fungus.id}')">Edit</button>
                    <button class="btn-delete" onclick="deleteFungus('${fungus.id}')">Delete</button>
                </div>
            `;
            fungiList.appendChild(item);
        });
    } catch (err) {
        console.error('Exception loading fungi:', err);
        fungiList.innerHTML = '<p style="color: red; padding: 20px;">Failed to connect to database: ' + err.message + '</p>';
    }
}

// Delete Functions
async function deleteTree(id) {
    if (!confirm('Are you sure you want to delete this tree? This will also delete all associated fungi.')) {
        return;
    }
    
    const { error } = await supabase
        .from('tree_species')
        .delete()
        .eq('id', id);
    
    if (error) {
        alert('Error deleting tree: ' + error.message);
    } else {
        loadTrees();
        loadFungi();
    }
}

async function deleteFungus(id) {
    if (!confirm('Are you sure you want to delete this fungus?')) {
        return;
    }
    
    const { error } = await supabase
        .from('fungi')
        .delete()
        .eq('id', id);
    
    if (error) {
        alert('Error deleting fungus: ' + error.message);
    } else {
        loadFungi();
    }
}

// Placeholder functions for add/edit (will implement next)
function showAddTreeForm() {
    alert('Add tree form coming next...');
}

function editTree(id) {
    alert('Edit tree form coming next...');
}

function showAddFungusForm() {
    alert('Add fungus form coming next...');
}

function editFungus(id) {
    alert('Edit fungus form coming next...');
}

