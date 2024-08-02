import React, { useState, useEffect } from 'react';
import axios from 'axios';



function App() {
    const [input, setInput] = useState('');
    const [response, setResponse] = useState(null);
    const [filters, setFilters] = useState([]);
    const [error, setError] = useState(null);


    const handleSubmit = async () => {
        console.log('Submit button clicked');
        try {
            const parsedInput = JSON.parse(input);
            console.log('Parsed Input:', parsedInput);
            const res = await axios.post('https://backend-bajaj.vercel.app/bfhl', { data: parsedInput.data });
            console.log('Response:', res.data);
            setResponse(res.data);
            setError(null); // Clear previous errors if successful
        } catch (error) {
            console.error('Invalid JSON or error in API call', error);
            setError('An error occurred. Please check the input and try again.');
        }
    };

    const handleFilterChange = (filter) => {
        setFilters((prevFilters) =>
            prevFilters.includes(filter)
                ? prevFilters.filter((f) => f !== filter)
                : [...prevFilters, filter]
        );
    };

    const renderResponse = () => {
        if (!response) return null;
        return (
            <div>
                {filters.includes('Numbers') && <div>Numbers: {response.numbers?.join(', ')}</div>}
                {filters.includes('Alphabets') && <div>Alphabets: {response.alphabets?.join(', ')}</div>}
                {filters.includes('Highest alphabet') && <div>Highest Alphabet: {response.highest_alphabet?.join(', ')}</div>}
            </div>
        );
    };

    return (
        <div className="App">
            <h1>{rollNumber}</h1>
            <textarea value={input} onChange={(e) => setInput(e.target.value)} />
            <button onClick={handleSubmit}>Submit</button>
            <div>
                <label>
                    <input type="checkbox" onChange={() => handleFilterChange('Numbers')} />
                    Numbers
                </label>
                <label>
                    <input type="checkbox" onChange={() => handleFilterChange('Alphabets')} />
                    Alphabets
                </label>
                <label>
                    <input type="checkbox" onChange={() => handleFilterChange('Highest alphabet')} />
                    Highest alphabet
                </label>
            </div>
            {error && <div style={{ color: 'red' }}>{error}</div>}
            {renderResponse()}
        </div>
    );
}

export default App;
