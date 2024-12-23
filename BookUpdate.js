import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useParams } from "react-router-dom";

function Book_UpDateForm() {
    const [state, setState] = useState({
        booktitle: "",
        author: "",
        formate: "",
        Topic: "",
        PubYear: 1990,
    });
    const [error, setError] = useState(""); // State for error message
    const [success, setSuccess] = useState(""); // State for success message

    const params = useParams();
    const url = "http://localhost:5000/";

    const handleChange = (e) => {
        const value = e.target.value;
        setState({
            ...state,
            [e.target.name]: value,
        });
    };

    useEffect(() => {
        axios.get(`${url}getbook/${params.id}`)
            .then(res => {
                console.log("Book data for update:", res.data);
                setState(res.data);
            })
            .catch(err => {
                console.log("Error fetching book:", err);
            });
    }, [params.id]);

    const OnSubmit = (e) => {
        e.preventDefault();
        const bookData = {
            booktitle: state.booktitle,
            PubYear: state.PubYear,
            author: state.author,
            Topic: state.Topic,
            formate: state.formate,
        };

        axios.post(`${url}updatebook/${params.id}`, bookData)
            .then(res => {
                console.log(res.data);
                setSuccess("Book updated successfully!");
                setError("");  // Clear any previous errors
            })
            .catch(err => {
                console.log("Error updating book:", err);
                setError("Failed to update book. Please try again.");
                setSuccess("");  // Clear any previous success messages
            });
    };

    return (
        <div style={{ marginTop: 10 }}>
            <h3>Update Book Id: {state.booktitle}</h3>
            <form onSubmit={OnSubmit} method="Post">
                <div className="form-group">
                    <label>Book Title: </label>
                    <input className="form-control" type="text" name="booktitle"
                        value={state.booktitle}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Book Authors: </label>
                    <input className="form-control" name="author"
                        value={state.author}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label>Pick Book topic: </label>
                    <select className="form-control" name="Topic" value={state.Topic} onChange={handleChange}>
                        <option value="Computer Science">Computer Science</option>
                        <option value="Programming">Programming</option>
                        <option value="Data Science">Data Science</option>
                        <option value="AI">AI</option>
                        <option value="Engineering">Engineering</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Format: </label>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input"
                            type="radio"
                            name="formate"
                            value="Hard Copy"
                            checked={state.formate === "Hard Copy"}
                            onChange={handleChange}
                        />
                        <label className="form-check-label"> Hard Copy </label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input"
                            type="radio"
                            name="formate"
                            value="Electronic Copy"
                            checked={state.formate === "Electronic Copy"}
                            onChange={handleChange}
                        />
                        <label className="form-check-label"> Electronic Copy</label>
                    </div>
                </div>

                <label>Publication Year (1980-2025):</label>
                <input
                    type="range"
                    name="PubYear"
                    min="1980"
                    max="2025"
                    value={state.PubYear}
                    onChange={handleChange}
                />
                
                <div className="form-group">
                    <input type="submit" value="Update" className="btn btn-primary" />
                </div>
            </form>

            {success && <div className="alert alert-success">{success}</div>}
            {error && <div className="alert alert-danger">{error}</div>}
        </div>
    );
}

export default Book_UpDateForm;
