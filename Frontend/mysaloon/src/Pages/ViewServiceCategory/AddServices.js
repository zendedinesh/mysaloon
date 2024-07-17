import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Button, MenuItem, CircularProgress } from '@mui/material';
import axios from 'axios';
import EditIcon from '@mui/icons-material/Edit';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import { addbtn, container, deleteicon, editicon, icon, input, name, tableBody, tableHead } from './AddServiceStyle';

function AddService() {
    const [form, setForm] = useState({
        Service: '',
        Category: '',
        Price: '',
        Duration: '',
        Gender: ''
    });

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [serviceCategories, setServiceCategories] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [forceUpdate, setForceUpdate] = useState(false);
    const [editId, setEditId] = useState(null);

    const fetchCategories = async () => {
        try {
            const response = await axios.get('http://localhost:9050/getserviceCategory');
            console.log('Fetched categories:', response.data.data);
            setServiceCategories(response.data.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);
    const handleEditServiceCategory = (serviceCategory) => {
        setEditId(serviceCategory._id);
        setForm({
            Service: serviceCategory.Service,
            Category: serviceCategory.Category,
            Price: serviceCategory.Price,
            Duration: serviceCategory.Duration,
            Gender: serviceCategory.Gender
        });
    };


    const handleSelectServiceCategory = (cat) => {
        const present = selectedCategories.find((item) => item._id === cat._id);
        if (present) {
            setSelectedCategories(prev => prev.filter((item) => item._id !== cat._id));
        } else {
            setSelectedCategories(prev => [...prev, cat]);
        }
    };

    const handleDeleteServiceCategory = async (categoryId) => {
        try {
            const res = await axios.post('http://localhost:9050/delete-Servicecategory', { ids: [categoryId] });
            console.log("Response:", res);

            setServiceCategories(prevCategories => (
                prevCategories.filter(cat => cat._id !== categoryId)
            ));

            setSelectedCategories(prevCategories => (
                prevCategories.filter(cat => cat._id !== categoryId)
            ));

            alert('Service category deleted successfully');
        } catch (error) {
            console.error("Error deleting ServiceCategory:", error);
            alert("Error deleting ServiceCategory");
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prevForm) => ({
            ...prevForm,
            [name]: value,
        }));
    };

    const validateForm = () => {
        let tempErrors = {};
        if (!form.Service) tempErrors.Service = 'Service Name is required';
        if (!form.Category) tempErrors.Category = 'Category Name is required';
        if (!form.Price) tempErrors.Price = 'Price is required';
        if (!form.Duration) tempErrors.Duration = 'Duration is required';
        if (!form.Gender) tempErrors.Gender = 'Gender is required';
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };



  
    const handleSubmit = async () => {
        if (!validateForm()) return;

        setLoading(true);
        try {
            if (editId) {
                const response = await axios.put(`http://localhost:9050/edit-ServiceCategory/${editId}`, { ...form });
                setEditId(null);
                alert('Service category updated successfully');
            } else {
                const response = await axios.post('http://localhost:9050/addserviceCategory', form);
                setServiceCategories([...serviceCategories, response.data.data]);
                alert('Service category added successfully');
            }
            setForm({
                Service: '',
                Category: '',
                Price: '',
                Duration: '',
                Gender: ''
            });
            fetchCategories() 
        } catch (error) {
            console.error('Error adding/editing service category:', error);
        } finally {
            setLoading(false);
        }
    };
    return (
        <div  >
            <TableContainer component={Paper} style={{padding:"15px"}}>
                <Table >
                    <TableHead sx={tableHead}>
                        <TableRow>
                            <TableCell>Select</TableCell>
                            <TableCell>Service Name</TableCell>
                            <TableCell>Category</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Duration</TableCell>
                            <TableCell>Gender</TableCell>
                            <TableCell>Action</TableCell> 
                        </TableRow>
                    </TableHead>
                    <TableBody sx={tableBody}>
                        {serviceCategories.map((serviceCategory) => {
                            const inputChecked = selectedCategories.find((item) => item._id === serviceCategory._id) ? true : false;
                            return (
                                <TableRow key={serviceCategory._id}>
                                    <TableCell>
                                        <input type="checkbox" style={{ height: "20px", width: '40px' }} onChange={() => handleSelectServiceCategory(serviceCategory)} checked={inputChecked} />
                                    </TableCell>
                                    <TableCell style={name}>{serviceCategory.Service}</TableCell>
                                    <TableCell style={name}>{serviceCategory.Category}</TableCell>
                                    <TableCell style={name}>{serviceCategory.Price}</TableCell>
                                    <TableCell style={name}>{serviceCategory.Duration}</TableCell>
                                    <TableCell style={name}>{serviceCategory.Gender}</TableCell>
                                    <TableCell style={icon}>
                                        <EditIcon sx={editicon} onClick={() => handleEditServiceCategory(serviceCategory)} />
                                        <ClearOutlinedIcon
                                            sx={deleteicon}
                                            onClick={() => handleDeleteServiceCategory(serviceCategory._id)}
                                        />
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <form key={forceUpdate} style={container}>
                
                <TextField
                    name="Service"
                    label="ServiceName"
                    value={form.Service}
                    onChange={handleChange}
                    error={!!errors.Service}
                    helperText={errors.Service}
                    style={name}
                    InputProps={{ style: input }}
                    InputLabelProps={{
                        style: {
                            fontSize: '16px',
                            margin: '5px 30px'
                        },
                    }}
                />
                <TextField
                    select
                    name="Category"
                    label="Category"
                    value={form.Category}
                    onChange={handleChange}
                    error={!!errors.Category}
                    helperText={errors.Category}
                    style={name}
                    InputProps={{ style: input }}
                    InputLabelProps={{
                        style: {
                            fontSize: '16px',
                            margin: '5px 30px'
                        },
                    }}
                >
                    <MenuItem value="Hair">Hair</MenuItem>
                    <MenuItem value="Makeup">Makeup</MenuItem>
                    <MenuItem value="Nails">Nails</MenuItem>
                    <MenuItem value="Masage">Masage</MenuItem>
                </TextField>
                <TextField
                    name="Price"
                    label="Price"
                    value={form.Price}
                    onChange={handleChange}
                    error={!!errors.Price}
                    helperText={errors.Price}
                    style={name}
                    InputProps={{ style: input }}
                    InputLabelProps={{
                        style: {
                            fontSize: '16px',
                            margin: '5px 30px'
                        },
                    }}
                />
                <TextField
                    name="Duration"
                    label="Duration"
                    value={form.Duration}
                    onChange={handleChange}
                    error={!!errors.Duration}
                    helperText={errors.Duration}
                    style={name}
                    InputProps={{ style: input }}
                    InputLabelProps={{
                        style: {
                            fontSize: '16px',
                            margin: '5px 30px'
                        },
                    }}
                />
                <TextField
                    select
                    name="Gender"
                    label="Gender"
                    value={form.Gender}
                    onChange={handleChange}
                    error={!!errors.Gender}
                    helperText={errors.Gender}
                    style={name}
                    InputProps={{ style: input }}
                    InputLabelProps={{
                        style: {
                            fontSize: '16px',
                            margin: '5px 30px'
                        },
                    }}
                >
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                </TextField>
                <Button style={addbtn} onClick={handleSubmit} disabled={loading}>
                    {loading ? <CircularProgress size={24} /> : editId ? 'Update Service Category' : 'Add Service Category'}
                </Button>
            </form>
        </div>
    );
}

export default AddService;
