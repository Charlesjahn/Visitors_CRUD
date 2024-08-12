import React, { useState, useEffect } from 'react';
import { db, collection, addDoc } from '../database/firebase';
import Filter from 'bad-words';

function Create() {
    const [form, setForm] = useState({ name: '', age: '', pais: '', data: '', hora: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const filter = new Filter(); // Initialize the profanity filter

    useEffect(() => {
        const now = new Date();
        const currentDate = now.toISOString().split('T')[0];
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const currentTime = `${hours}:${minutes}`;
        setForm(prevForm => ({ ...prevForm, data: currentDate, hora: currentTime }));
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check for offensive language
        if (filter.isProfane(form.name) || filter.isProfane(form.pais)) {
            setError('Watch your mouth! XD');
            return;
        }

        if (!form.name || !form.age || !form.pais) {
            setError('Please fill in all required fields.');
            return;
        }
    
        setLoading(true);
        setError('');
        try {
            const newVisitor = { ...form };
            console.log('Adding visitor:', newVisitor); // Log the data being sent
    
            const visitorsCollection = collection(db, 'visitors');
            await addDoc(visitorsCollection, newVisitor);
            
            console.log('Visitor added successfully');
            
            setForm({ name: '', age: '', pais: '', data: '', hora: '' });
        } catch (err) {
            console.error("Failed to add visitor:", err);
            setError('Failed to add visitor.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <section>
            <h2>Register your visit!</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Name:"
                        value={form.name}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <input
                        type="number"
                        name="age"
                        id="age"
                        placeholder="Age:"
                        value={form.age}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <input
                        type="text"
                        name="pais"
                        id="pais"
                        placeholder="Country:"
                        value={form.pais}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="data">Date:</label>
                    <input
                        type="date"
                        name="data"
                        id="data"
                        value={form.data}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="hora">Time:</label>
                    <input
                        type="time"
                        name="hora"
                        id="hora"
                        placeholder="Time"
                        value={form.hora}
                        onChange={handleInputChange}
                    />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Adding...' : 'Add Visitor'}
                </button>
            </form>
        </section>
    );
}

export default Create;
