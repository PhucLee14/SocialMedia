import axios from "axios";
import React, { useEffect, useState } from "react";

const HomeAdmin = () => {
    const [newsFeeds, setNewsFeeds] = useState([]);
    const [certificates, setCertificates] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:5000/newsfeed")
            .then((res) => setNewsFeeds(res.data))
            .catch((err) => console.log(err));
    }, [newsFeeds]);

    useEffect(() => {
        axios
            .get("http://localhost:5000/certificate")
            .then((res) => setCertificates(res.data))
            .catch((err) => console.log(err));
    }, [certificates]);

    return (
        <div className="mt-16">
            <div>Số bài viết: {newsFeeds.length}</div>
            <div>Số minh chứng: {certificates.length}</div>
        </div>
    );
};

export default HomeAdmin;
