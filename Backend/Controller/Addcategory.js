const Category = require('../Model/AddCategory');

exports.addCategory = async (req, res) => {
    try {
        const { categoryName, categoryDescription, appointmentColor } = req.body;


        const newCategory = await Category.create({
            categoryName,
            categoryDescription,
            appointmentColor,
            imageUrl: req.file ? req.file.path : null
        });


        res.status(200).json({
            success: true,
            data: newCategory,
            alert: "Category added successfully"
        });
    } catch (error) {
        console.error('Error adding category:', error.message);

        res.status(500).json({
            success: false,
            error: "Category not added",
            alert: 'unsuccessful'
        });
    }
};


exports.getCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json({
            success: true,
            data: categories,
            alert: "Categories fetched successfully"
        });
    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).json({
            success: false,
            error: "Categories not fetched",
            alert: 'unsuccessful'
        });
    }
};
exports.deleteCategory = async (req, res) => {
    try {
        const { ids } = req.body;



        // Validate that ids is an array and contains values
        if (!Array.isArray(ids) || ids.length === 0) {
            return res.status(400).json({
                success: false,
                error: 'Invalid input',
                alert: 'No category IDs provided'
            });
        }

        // Delete the categories with the given IDs
        const result = await Category.deleteMany({ _id: { $in: ids } });

        // If no categories were deleted, return a not found status
        if (result.deletedCount === 0) {
            return res.status(404).json({
                success: false,
                error: 'No categories found',
                alert: 'No categories deleted'
            });
        }

        res.status(200).json({
            success: true,
            data: result,
            alert: 'Categories deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Categories not deleted',
            alert: 'Deletion unsuccessful'
        });
    }
};

exports.editCategory = async (req, res) => {
    const { id } = req.params;
    const { categoryName, categoryDescription, appointmentColor } = req.body;
    let updateData = { categoryName, categoryDescription, appointmentColor };

    if (req.file) {
        updateData.imageUrl = req.file.path;
    }

    try { // edit by id 
        const updatedData = await Category.findByIdAndUpdate(id, updateData, { new: true });

        if (!updatedData) {
            return res.status(404).json({
                success: false,
                message: 'Category not found',
                alert: 'Category Not Found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Category successfully updated',
            alert: 'Successfully updated the Category'
        });
    } catch (error) {
        console.error('Error updating category:', error);
        res.status(500).json({
            success: false,
            message: 'An error occurred while updating the category',
            alert: 'Error while updating the Category'
        });
    }
};

