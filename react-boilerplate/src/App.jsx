import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Input from './components/Input/Input';
import Button from './components/Button/Button';
import IconButton from './components/IconButton/IconButton';
import Select from './components/Select/Select';
import SelectWithFirebaseDatabase from './components/SelectWithFirebaseDatabase/SelectWithFirebaseDatabase';
import DataGrid from './components/dataGrid/dataGrid';
import PageHeader from './components/pageHeader/pageHeader';
import DatePicker from './components/datepicker/datepicker';
import RadioButton from './components/radioButton/radioButton';
import Checkbox from './components/checkbox/checkbox';

const theme = createTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <PageHeader />
        <Typography variant="h4" component="h2" gutterBottom>
          MUI Components Boilerplate
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6">Input</Typography>
            <Input />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6">Button</Typography>
            <Button />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6">Icon Button</Typography>
            <IconButton />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6">Select</Typography>
            <Select />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6">Select with Firebase Database</Typography>
            <SelectWithFirebaseDatabase />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6">Date Picker</Typography>
            <DatePicker />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6">Radio Button</Typography>
            <RadioButton />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6">Checkbox</Typography>
            <Checkbox />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">Data Grid</Typography>
            <DataGrid />
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
}

export default App;
