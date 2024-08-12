import React, { useState, useEffect } from 'react';
import { db, collection, getDocs, deleteDoc, doc, updateDoc } from '../database/firebase';

function AllVisit() {
    const [visitors, setVisitors] = useState([]);
    const [editingVisitor, setEditingVisitor] = useState(null);
    const [form, setForm] = useState({ name: '', age: '', pais: '', data: '', hora: '' });

    useEffect(() => {
        const fetchVisitors = async () => {
            try {
                const visitorsCollection = collection(db, 'visitors');
                const snapshot = await getDocs(visitorsCollection);
                // Map the documents correctly to include the id
                const visitorsList = snapshot.docs.map(docSnapshot => ({
                    id: docSnapshot.id,
                    ...docSnapshot.data()
                }));
                setVisitors(visitorsList);
            } catch (error) {
                console.error("Error fetching visitors: ", error);
            }
        };

        fetchVisitors();
    }, []);

    const handleDelete = async (id) => {
        try {
            // Delete the visitor from Firestore
            const visitorDoc = doc(db, 'visitors', id);
            await deleteDoc(visitorDoc);

            // Update the local list of visitors
            setVisitors(visitors.filter(visitor => visitor.id !== id));
        } catch (error) {
            console.error("Error deleting visitor: ", error);
        }
    };

    const handleEdit = (visitor) => {
        setEditingVisitor(visitor.id);
        setForm({
            name: visitor.name,
            age: visitor.age,
            pais: visitor.pais,
            data: visitor.data,
            hora: visitor.hora,
        });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const visitorDoc = doc(db, 'visitors', editingVisitor);
            await updateDoc(visitorDoc, form);
            setVisitors(visitors.map(visitor => (visitor.id === editingVisitor ? { ...form, id: visitor.id } : visitor)));
            setEditingVisitor(null);
            setForm({ name: '', age: '', pais: '', data: '', hora: '' });
        } catch (error) {
            console.error("Error updating visitor: ", error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    return (
        <section>
            <h2>Visitor List</h2>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Country</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {visitors.map((visitor, index) => (
                        <tr key={index}>
                            <td>{visitor.name}</td>
                            <td>{visitor.age}</td>
                            <td>{visitor.pais}</td>
                            <td>{visitor.data}</td>
                            <td>{visitor.hora}</td>
                            <td>
                                <button onClick={() => handleEdit(visitor)}>Edit</button>
                                <button onClick={() => handleDelete(visitor.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {editingVisitor && (
                <form onSubmit={handleUpdate}>
                    <h3>Edit Visitor</h3>
                    <div>
                        <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            value={form.name}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div>
                        <input
                            type="number"
                            name="age"
                            placeholder="Age"
                            value={form.age}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            name="pais"
                            placeholder="Country"
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
                            value={form.data}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="hora">Time:</label>
                        <input
                            type="time"
                            name="hora"
                            value={form.hora}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <button type="submit">Update Visitor</button>
                </form>
            )}
        </section>
    );
}

export default AllVisit;
