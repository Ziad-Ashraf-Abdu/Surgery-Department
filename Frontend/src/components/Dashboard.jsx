import React, { useState, useEffect, useCallback } from 'react';
import {
    Box, CssBaseline, Typography, AppBar, Toolbar,
    Paper, Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Card, CardContent, Grid,
    Avatar, Stack, Button, Dialog, DialogTitle,
    DialogContent, DialogActions, TextField
} from '@mui/material';
import { LocalHospital } from '@mui/icons-material';
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
import { BarChart } from '@mui/x-charts/BarChart';
import Footer from './gen/Footer';

const palette = ['#3A59D1', '#3D90D7', '#7AC6D2', '#B5FCCD'];

function DashboardCard({ title, value, icon, colorIndex }) {
    return (

        <Card sx={{
            borderRadius: 2, boxShadow: 3, p: 2,
            backgroundColor: palette[colorIndex % palette.length]
        }}>
            <CardContent>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Stack spacing={1}>
                        <Typography color="#fff" variant="overline">{title}</Typography>
                        <Typography variant="h5" color="#fff">{value}</Typography>
                    </Stack>
                    <Avatar sx={{
                        bgcolor: '#fff',
                        color: palette[colorIndex % palette.length],
                        width: 56, height: 56
                    }}>
                        {icon}
                    </Avatar>
                </Stack>
            </CardContent>
        </Card>
    );
}

export default function Dashboard() {
    const API_URL = import.meta.env.VITE_API_URL;

    // — Data state —
    const [stats, setStats]           = useState([]);
    const [pieData, setPieData]       = useState([]);
    const [ageData, setAgeData]       = useState([]);
    const [appointments, setAppointments] = useState([]);
    const [surgeries, setSurgeries]   = useState([]);

    // — Create Surgery dialog —
    const [openNew, setOpenNew]       = useState(false);
    const [newSurg, setNewSurg]       = useState({
        date:'', time:'', procedure:'', doctor:'', patient:'', room:''
    });
    const [saving, setSaving]         = useState(false);

    // Fetch all pieces of dashboard data
    const fetchDashboardData = useCallback(async () => {
        try {
            // 1) Total appointments
            const apptRes = await fetch(`${API_URL}/api/appointments/`);
            const allAppts = apptRes.ok ? await apptRes.json() : [];

            // 2) Total doctors
            const docRes = await fetch(`${API_URL}/api/doctors/`);
            const allDocs = docRes.ok ? await docRes.json() : [];

            // 3) Total patients
            const patRes = await fetch(`${API_URL}/api/patients/`);
            const allPats = patRes.ok ? await patRes.json() : [];

            // 4) All surgeries
            const surgRes = await fetch(`${API_URL}/api/surgeries/`);
            const allSurgs = surgRes.ok ? await surgRes.json() : [];

            // 5) Doctors by gender
            const genderCount = allDocs.reduce((acc, d) => {
                acc[d.gender] = (acc[d.gender] || 0) + 1;
                return acc;
            }, {});
            const pie = Object.entries(genderCount).map(([label, value]) => ({ label, value }));

            // 6) Patient age distribution
            const buckets = { '0-18':0,'19-35':0,'36-60':0,'60+':0 };
            allPats.forEach(p => {
                const age = Math.floor((Date.now() - new Date(p.dob)) / 3.15576e10);
                if (age < 19) buckets['0-18']++;
                else if (age < 36) buckets['19-35']++;
                else if (age < 61) buckets['36-60']++;
                else buckets['60+']++;
            });
            const ageArr = Object.entries(buckets).map(([ageGroup, count]) => ({ ageGroup, count }));

            setStats([
                { title: 'Total Appointments', value: allAppts.length },
                { title: 'Number of Doctors', value: allDocs.length },
                { title: 'Number of Patients', value: allPats.length },
                { title: 'Total Surgeries', value: allSurgs.length }
            ]);
            setPieData(pie);
            setAgeData(ageArr);
            setAppointments(allAppts);
            setSurgeries(allSurgs);
        } catch (err) {
            console.error('Dashboard fetch error:', err);
        }
    }, [API_URL]);

    useEffect(() => {
        fetchDashboardData();
    }, [fetchDashboardData]);

    // — Handlers for Create Surgery —
    const handleOpenNew = () => setOpenNew(true);
    const handleCloseNew = () => {
        setOpenNew(false);
        setNewSurg({ date:'', time:'', procedure:'', doctor:'', patient:'', room:'' });
    };
    const handleChange = e =>
        setNewSurg(s => ({ ...s, [e.target.name]: e.target.value }));

    const handleCreate = async () => {
        setSaving(true);
        const res = await fetch(`${API_URL}/api/surgeries/`, {
            method: 'POST',
            headers: { 'Content-Type':'application/json' },
            body: JSON.stringify(newSurg)
        });
        setSaving(false);
        if (res.ok) {
            handleCloseNew();
            fetchDashboardData();
        } else {
            console.error('Create surgery failed:', await res.json());
        }
    };

    return (
        <Box sx={{ backgroundColor:'#f5f5f5', minHeight:'100vh' }}>
            <CssBaseline />
            <AppBar position="static" sx={{ backgroundColor: palette[0] }}>
                <Toolbar>
                    <Typography variant="h6">Surgery Department Dashboard</Typography>
                </Toolbar>
            </AppBar>

            <Box sx={{ p:3 }}>
                <Typography variant="h5" gutterBottom>Overview</Typography>

                <Grid container spacing={3}>
                    {stats.map((s,i) => (
                        <Grid key={i} item xs={12} sm={6} md={3}>
                            <DashboardCard
                                title={s.title}
                                value={s.value}
                                icon={<LocalHospital />}
                                colorIndex={i}
                            />
                        </Grid>
                    ))}
                </Grid>

                <Button
                    variant="contained"
                    sx={{ mt:3 }}
                    onClick={handleOpenNew}
                >
                    Create New Surgery
                </Button>

                <Grid container spacing={3} sx={{ mt:2 }}>
                    <Grid item xs={12} md={6}>
                        <Paper sx={{ p:2 }}>
                            <Typography variant="h6" gutterBottom>Doctors by Gender</Typography>
                            <PieChart
                                series={[{ data: pieData, arcLabel: i => `${i.label} (${i.value})` }]}
                                width={400}
                                height={250}
                                sx={{ [`& .${pieArcLabelClasses.root}`]: { fill: '#fff', fontSize: 14 } }}
                            />
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Paper sx={{ p:2 }}>
                            <Typography variant="h6" gutterBottom>Patients Age Distribution</Typography>
                            <BarChart
                                xAxis={[{ scaleType: 'band', data: ageData.map(a => a.ageGroup) }]}
                                series={[{ data: ageData.map(a => a.count), label:'Patients' }]}
                                width={400}
                                height={250}
                            />
                        </Paper>
                    </Grid>
                </Grid>

                <Paper sx={{ p:2, mt:4 }}>
                    <Typography variant="h6" gutterBottom>Current Appointments</Typography>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>ID</TableCell><TableCell>Patient</TableCell>
                                    <TableCell>Doctor</TableCell><TableCell>Date</TableCell>
                                    <TableCell>Status</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {appointments.map(a => (
                                    <TableRow key={a.id}>
                                        <TableCell>{a.id}</TableCell>
                                        <TableCell>{a.patient_name || a.patient}</TableCell>
                                        <TableCell>{a.doctor_name || a.doctor}</TableCell>
                                        <TableCell>{new Date(a.date).toLocaleDateString()}</TableCell>
                                        <TableCell>{a.status}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </Box>

            {/* — Create Surgery Dialog — */}
            <Dialog open={openNew} onClose={handleCloseNew}>
                <DialogTitle>New Surgery</DialogTitle>
                <DialogContent sx={{ display:'grid', gap:2, width:400 }}>
                    {['date','time','procedure','doctor','patient','room'].map(field => (
                        <TextField
                            key={field}
                            label={field.charAt(0).toUpperCase()+field.slice(1)}
                            name={field}
                            type={field==='date'? 'date' : field==='time'? 'time' : 'text'}
                            value={newSurg[field]}
                            onChange={handleChange}
                            InputLabelProps={{ shrink: field==='date'||field==='time' }}
                            fullWidth
                        />
                    ))}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseNew} disabled={saving}>Cancel</Button>
                    <Button onClick={handleCreate} disabled={saving}>
                        {saving ? 'Saving…' : 'Save'}
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
