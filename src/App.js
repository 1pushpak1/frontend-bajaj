import React, { useState, useEffect } from 'react';
import axios from 'axios';

const rollNumber = 'RA2111003030345';

function App() {
    const [input, setInput] = useState('');
    const [response, setResponse] = useState(null);
    const [filters, setFilters] = useState([]);

    useEffect(() => {
        document.title = rollNumber;
    }, []);

    const handleSubmit = async () => {
        console.log('Submit button clicked');
        try {
            const parsedInput = JSON.parse(input);
            console.log('Parsed Input:', parsedInput);
            const res = await axios.post('https://backend-bajaj.vercel.app/bfhl', { data: parsedInput.data });
            console.log('Response:', res.data);
            setResponse(res.data);
        } catch (error) {
            console.error('Invalid JSON or error in API call', error);
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
                {filters.includes('Numbers') && <div>Numbers: {response.numbers.join(', ')}</div>}
                {filters.includes('Alphabets') && <div>Alphabets: {response.alphabets.join(', ')}</div>}
                {filters.includes('Highest alphabet') && <div>Highest Alphabet: {response.highest_alphabet.join(', ')}</div>}
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
            {renderResponse()}
        </div>
    );
}

export default App;
