export const getTabIcon = (tab) => {
    const icons = {
        'View Schedule': '📅',
        'View Patients': '👥',
        'Settings': '⚙️'
    };
    return icons[tab] || '🔍';
};

export const calculateAge = dob => {
    if (!dob) return '';
    const birth = new Date(dob);
    const now = new Date();
    let age = now.getFullYear() - birth.getFullYear();
    const m = now.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && now.getDate() < birth.getDate())) {
        age--;
    }
}

export const calculateCompletion = normalizedData => {
    const values = [];
    Object.entries(normalizedData).forEach(([, val]) => {
        if (val && typeof val === 'object') {
            Object.values(val).forEach(v => values.push(v));
        } else {
            values.push(val);
        }
    });
    const total = values.length;
    const filled = values.filter(v => v !== null && v !== undefined && v !== '').length;
    return total ? Math.round((filled / total) * 100) : 0;
};
