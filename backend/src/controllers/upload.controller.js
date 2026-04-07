const uploadImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }
        return res.status(200).json({ url: req.file.path });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const uploadImages = async (req, res) => {
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ error: "No files uploaded" });
        }
        const urls = req.files.map((file) => file.path);
        return res.status(200).json({ urls });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export { uploadImage, uploadImages };
