const Job = require('../models/Job');
const Business = require('../models/Business');

// Create a new job posting
exports.createJob = async (req, res) => {
    const { title, description, requirements, location } = req.body;

    try {
        const business = await Business.findById(req.user.businessId);

        if (!business) {
            return res.status(404).json({ message: 'Business not found' });
        }

        const job = new Job({
            business: req.user.businessId,
            title,
            description,
            requirements,
            location,
        });

        await job.save();
        res.status(201).json(job);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all jobs for a business
exports.getJobs = async (req, res) => {
    try {
        const jobs = await Job.find({ business: req.params.businessId });
        res.json(jobs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a job posting
exports.deleteJob = async (req, res) => {
    try {
        const job = await Job.findById(req.params.jobId);

        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }

        if (job.business.toString() !== req.user.businessId) {
            return res.status(401).json({ message: 'Not authorized to delete this job' });
        }

        await job.remove();
        res.json({ message: 'Job removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
