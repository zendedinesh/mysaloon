
const express = require('express');
const router = express.Router();
const multer = require('multer');
const { addCategory, getCategories, deleteCategory, editCategory } = require('../Controller/Addcategory');
const { getServiceCategory, addServiceCategory, handleDeleteServiceCategories, editServiceCategory } = require('../Controller/ServiceCategory')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});
const upload = multer({ storage: storage });

// All routes 
//1) Add category  
 
router.post('/addCategory', upload.single('image'), addCategory);
router.put('/edit-Category/:id', upload.single('image'), editCategory)
router.get('/getCategory', getCategories); 
router.post('/delete-category', deleteCategory);
// 2)Add Service CAtegory 
router.get('/getServiceCategory', getServiceCategory)
router.post('/addserviceCategory', addServiceCategory)
router.post('/delete-Servicecategory', handleDeleteServiceCategories);
router.put('/edit-ServiceCategory/:id', editServiceCategory)
module.exports = router; 
