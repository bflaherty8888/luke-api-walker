import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const StarForm = (props) => {
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState('');
    const [id, setId] = useState(0);
    const history = useHistory();

    useEffect(() => {
        axios.get("https://swapi.dev/api/").then((response) => {
            setCategories(Object.keys(response.data));
            setCategory(Object.keys(response.data)[0]);
        })
    }, []);

    const submitHandler = (e) => {
        e.preventDefault();
        history.push(`/${category}/${id}`);
    }

    return (
        <>
            <form onSubmit={submitHandler} className='form-control d-flex align-items-center'>
                <div className='col d-flex mx-3 align-items-center'>
                    <label>Category: </label>
                    <select className='form-select mx-2' value={category} onChange={(e) => { setCategory(e.target.value) }}>
                        {categories.map((cat, i) => {
                            return (
                                <option key={i} value={cat}>{cat.charAt(0).toUpperCase().concat(cat.slice(1))}</option>
                            );
                        }
                        )}
                    </select>
                </div>
                <div className='col d-flex mx-3 align-items-center'>
                    <label>ID:</label>
                    <input type={'number'} className='form-control mx-2' value={id} onChange={(e) => { setId(e.target.value) }} />
                </div>
                <input type={'submit'} value='Submit' className='form-control btn btn-primary col' />
            </form>
        </>
    );
}

export default StarForm;