import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Result = (props) => {
    const [data, setData] = useState({});
    const [error, setError] = useState('');
    const { category, id } = useParams();

    useEffect(() => {
        axios.get(`https://swapi.dev/api/${category}/${id}`)
            .then(response => {
                setData(response.data);
                setError('');
            })
            .catch(e => {
                setError("These aren't the droids you're looking for.")
                setData({});
            });
    }, [category, id]);

    const format = (str = "") => {
        return str.split(/[_ ]/).map(s => s.charAt(0).toUpperCase().concat(s.slice(1))).join(' ').split('-').map(s => s.charAt(0).toUpperCase().concat(s.slice(1))).join('-');
    }

    return (
        <div className='m-3'>
            {error ? <h3 className='alert alert-danger'>{error}</h3> : null}
            <h1>{format(data.name)}</h1>
            <h1>{format(data.title)}</h1>
            {Object.keys(data).slice(1).map((key, i) => {
                let datum = data[key];
                datum = isNaN(datum) ? datum : "" + datum;
                // console.log(datum);
                if(key == "created" || key == "edited" || datum == "" || datum == "n/a" || Array.isArray(datum) || datum.match(/https:/g) != null){
                    return '';
                }
                return <p key={i}><b>{format(key)}:</b> {format(datum)}</p>
            })}
        </div>
    );
}

export default Result;