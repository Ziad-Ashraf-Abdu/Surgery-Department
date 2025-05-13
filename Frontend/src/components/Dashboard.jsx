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
            const statsRes = await fetch(`${API_URL}/api/stats/`);
            const stats = statsRes.ok ? await statsRes.json() : [];

            const genderRes = await fetch(`${API_URL}/api/doctors_gender/`);
            const pie = genderRes.ok ? await genderRes.json() : [];

            const ageRes = await fetch(`${API_URL}/api/patients_age_distribution/`);
            const ageArr = ageRes.ok ? await ageRes.json() : [];

            const apptRes = await fetch(`${API_URL}/api/appointments/`);
            const allAppts = apptRes.ok ? await apptRes.json() : [];

            setStats(stats);
            setPieData(pie);
            setAgeData(ageArr);
            setAppointments(allAppts);
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
                                    <TableCell>ID</TableCell>
                                    <TableCell>Patient</TableCell>
                                    <TableCell>Status</TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {appointments.map(a => (
                                    <TableRow key={a.id}>
                                        <TableCell>{a.id}</TableCell>
                                        <TableCell>{a.name}</TableCell>
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
                            label={field.charAt(0).toUpperCase() + field.slice(1)}
                            name={field}
                            type={field === 'date' ? 'date' : field === 'time' ? 'time' : 'text'}
                            value={newSurg[field]}
                            onChange={handleChange}
                            InputLabelProps={{ shrink: true }}
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
