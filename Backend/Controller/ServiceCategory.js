const ServiceCategory = require('../Model/ServiceCategory');

exports.addServiceCategory = async (req, res) => {
    try {
        const { Service, Category, Price, Duration, Gender } = req.body;




        const newCategory = await ServiceCategory.create({
            Service,
            Category,
            Price,
            Duration,
            Gender
        });

        res.status(201).json({
            success: true,
            data: newCategory,
            alert: "Service Category added successfully"
        });
    } catch (error) {
        console.error('Error adding Service Category:', error.message);

        res.status(500).json({
            success: false,
            error: "Service Category not added",
            alert: 'Unsuccessful'
        });
    }
};

exports.getServiceCategory = async (req, res) => {
    try {
        const serviceCategory = await ServiceCategory.find()
        res.status(200).json({
            success: true,
            data: serviceCategory,
            alert: 'ServiceCategory fetched successfully'
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'ServiceCategory is not Fetched',
            alert: 'unsuccessfull'
        })
    }
}

//   
exports.handleDeleteServiceCategories = async (req, res) => {
    try {
        const { ids } = req.body;
        // Assuming you're using Mongoose
        await ServiceCategory.deleteMany({ _id: { $in: ids } });
        res.status(200).json({ message: 'Service categories deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting service categories', error });
    }
};
exports.editServiceCategory = async (req, res) => {
    const { id } = req.params;
const updatedData = req.body; 

    try {
        const updatedCategory = await ServiceCategory.findByIdAndUpdate(id, updatedData, { new: true });
        if (!updatedCategory) {
            return res.status(404).send({ message: 'Service category not found' });
        }
        res.status(200).send({ message: 'Service category updated successfully', data: updatedCategory });
    } catch (error) {
        res.status(500).send({ message: 'Error updating service category', error });
    }
};

