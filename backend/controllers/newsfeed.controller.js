import newsFeedModel from "../models/newsfeed.model.js";

export const getAllNewsFeed = async (req, res) => {
    await newsFeedModel
        .find({})
        .populate("author")
        // .populate("name")
        .then((newsfeed) => res.json(newsfeed))
        .catch((err) => res.json("Error on the backend"));
};

export const getNewsFeedById = async (req, res) => {
    const id = req.params.id;
    await newsFeedModel
        .findById({ _id: id })
        .populate("author")
        .populate("comments")
        .then((newsfeed) => res.json(newsfeed))
        .catch((err) => res.json(err));
};

export const getNewsFeedByAuthorId = async (req, res) => {
    try {
        const { id } = req.params;

        const newsfeeds = await newsFeedModel
            .find({ author: id })
            .populate("author")
            // .populate("name")
            .populate("comments");

        res.json(newsfeeds);
    } catch (error) {
        console.error("Error fetching news feeds:", error);
        res.status(500).json({ message: "Error fetching news feeds" });
    }
};

export const updateNewsFeedById = async (req, res) => {
    const id = req.params.id;
    try {
        const newsfeed = await newsFeedModel.findByIdAndUpdate(
            id,
            {
                name: req.body.name,
                title: req.body.title,
                content: req.body.content,
                images: req.body.images,
            },
            { new: true }
        );
        res.json(newsfeed);
    } catch (err) {
        res.status(500).json(err);
    }
};

export const updateNewsStatusById = async (req, res) => {
    const id = req.params.id;
    try {
        const newsfeed = await newsFeedModel.findByIdAndUpdate(
            id,
            {
                status: req.body.status,
            },
            { new: true }
        );
        res.json(newsfeed);
    } catch (err) {
        res.status(500).json(err);
    }
};

export const uploadNewsFeed = async (req, res) => {
    try {
        const newsfeed = await newsFeedModel.create(req.body);
        res.json(newsfeed);
    } catch (err) {
        res.status(500).json(err);
    }
};

export const deleteNewsFeedById = async (req, res) => {
    const id = req.params.id;
    newsFeedModel
        .findByIdAndDelete({
            _id: id,
        })
        .then((res) => res.json(res))
        .catch((err) => res.json(err));
};
