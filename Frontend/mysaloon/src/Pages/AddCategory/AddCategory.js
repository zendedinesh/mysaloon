import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AddCategory.css';
import { Link } from 'react-router-dom';

const AddCategory = () => {
    const [open, setOpen] = useState(false);
    const [categories, setCategories] = useState([]);
    const [categoryName, setCategoryName] = useState('');
    const [appointmentColor, setAppointmentColor] = useState('#000000');
    const [categoryDescription, setCategoryDescription] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [errors, setErrors] = useState({});
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [editId, setEditId] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const handleEditCategory = () => {
        if (selectedCategories.length !== 1) {
            alert("Please select exactly one category to edit");
            return;
        }
        const category = selectedCategories[0];
        setEditId(category._id);
        setCategoryName(category.categoryName);
        setAppointmentColor(category.appointmentColor);
        setCategoryDescription(category.categoryDescription);
        setImageFile(null); // Handle the image separately if necessary
        setOpen(true);
    };
    
    const handleSubmit = async () => {
        const newErrors = {};
        if (!categoryName.trim()) {
            newErrors.categoryName = 'Category Name is required';
        }
        if (!categoryDescription.trim()) {
            newErrors.categoryDescription = 'Category Description is required';
        }
    
        // Update errors state
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
    
        try {
            const formData = new FormData();
            formData.append("categoryName", categoryName);
            formData.append("categoryDescription", categoryDescription);
            formData.append("appointmentColor", appointmentColor);
            if (imageFile) {
                formData.append("image", imageFile);
            }
    
            let response;
            if (editId) {
                response = await axios.put(`http://localhost:9050/edit-Category/${editId}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
            } else {
                response = await axios.post('http://localhost:9050/addCategory', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
            }
    
            if (response.data.success) {
                console.log('Response:', response.data);
                fetchCategories();
                handleClose(); // Ensure modal closes after successful submission
            } else {
                console.error('Error response from server:', response.data);
            }
        } catch (error) {
            console.error('Error adding/updating category:', error);
        }
    };
    
    const handleCategorySelect = (cat) => {
        const present = selectedCategories.find((item) => item._id === cat._id);
        if (present) {
            setSelectedCategories((prev) => prev.filter((item) => item._id !== cat._id));
        } else {
            setSelectedCategories((prev) => [...prev, cat]);
        }
    };
    
    const handleOpen = () => setOpen(true);
    
    const handleClose = () => {
        setOpen(false);
        setCategoryName('');
        setAppointmentColor('#000000');
        setCategoryDescription('');
        setImageFile(null);
        setErrors({});
        setEditId(null); // Reset edit ID on close
    };
    
    const fetchCategories = async () => {
        try {
            const response = await axios.get('http://localhost:9050/getCategory');
            console.log(response.data);
            setCategories(response.data.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };
    
    const handleDelete = async () => {
        if (selectedCategories.length === 0) {
            alert("Please Select At least 1 Category");
        } else {
            try {
                const ids = selectedCategories.map((cat) => cat._id);
                console.log(ids);
                const res = await axios.post('http://localhost:9050/delete-category', { ids });
                console.log(res);
                fetchCategories();
            } catch (error) {
                alert("Error deleting Category");
            }
        }
    };
    
    useEffect(() => {
        fetchCategories();
    }, []);

    // Filter categories based on search term
    const filteredCategories = categories.filter(category =>
        category.categoryName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            <div className='main-container'>
                <div className='addandservicebtn'>
                    <h3>
                        <Link to={'/ViewServiceCategory'} className="view-category-button">
                            View Service Category
                        </Link>
                    </h3>
                    <button className="add-category-button" onClick={handleOpen}>
                        Add Category
                    </button>
                </div>

                <div className='header-container'>
                    <input type="checkbox" />
                    <h3>Service Category</h3>
                    <input
                        type="text"
                        placeholder='Search categories...'
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button   onClick={handleDelete}>Delete</button>
                    <button type='button' onClick={handleEditCategory}>Edit</button>
                </div>

                <div className='row-container'>
                    {filteredCategories.map((category, index) => {
                        const inputChecked = selectedCategories.find((item) => item._id === category._id) ? true : false;
                        return (
                            <div key={index} className='row' style={{ backgroundColor: `${category.appointmentColor}5a` }}>
                                <input type="checkbox" onChange={() => handleCategorySelect(category)} checked={inputChecked} />
                                <div className='img-cont'>
                                    {category.imageUrl ? (
                                        <img src={`http://localhost:9050/${category.imageUrl}`} alt={category.categoryName} style={{ width: "80px", height: "80px", borderRadius: "50%" }} />
                                    ) : (
                                        'No Image'
                                    )}
                                </div>
                                <div className='text-content'>
                                    <h3>{category.categoryName}</h3>
                                    <p>{category.categoryDescription}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {open && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>{editId ? 'Edit Category' : 'Add New Category'}</h2>
                        <input
                            className="input-field"
                            type="text"
                            placeholder="Category Name"
                            value={categoryName}
                            onChange={(e) => {
                                setCategoryName(e.target.value);
                                setErrors({ ...errors, categoryName: '' });
                            }}
                        />
                        {errors.categoryName && <p className="error-message">{errors.categoryName}</p>}
                        <input
                            className="input-field"
                            type="color"
                            value={appointmentColor}
                            onChange={(e) => setAppointmentColor(e.target.value)}
                        />
                        <textarea
                            className="input-fieldtext"
                            placeholder="Category Description"
                            value={categoryDescription}
                            onChange={(e) => {
                                setCategoryDescription(e.target.value);
                                setErrors({ ...errors, categoryDescription: '' });
                            }}
                        />
                        {errors.categoryDescription && <p className="error-message">{errors.categoryDescription}</p>}
                        <input
                            type="file"
                            onChange={(e) => setImageFile(e.target.files[0])}
                        />
                        <div style={{ display: 'flex', justifyContent: 'space-between', margin: "10px 10px" }}>
                            <button className="submit-button" onClick={handleSubmit}>
                                Submit
                            </button>
                            <button className="close-button" onClick={handleClose}>
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default AddCategory;
