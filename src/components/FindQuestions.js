import React, { useState, useEffect } from 'react';
import { Card, Button, Input, Form } from 'semantic-ui-react';
import { collection, onSnapshot, deleteDoc, doc, query, where } from 'firebase/firestore';
import { db } from '../firebase';
import Draggable from 'react-draggable'; // For optional reordering

const FindQuestions = () => {
  const [questions, setQuestions] = useState([]);
  const [filterTitle, setFilterTitle] = useState('');
  const [filterTag, setFilterTag] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const [expandedId, setExpandedId] = useState(null);
  const [positions, setPositions] = useState({}); // For draggable positions

  useEffect(() => {
    const q = query(collection(db, 'posts'), where('postType', '==', 'Question'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setQuestions(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    return unsubscribe;
  }, []);

  const filteredQuestions = questions.filter((q) => {
    const dateMatch = !filterDate || q.date.toDate().toISOString().slice(0, 10) === filterDate;
    const titleMatch = !filterTitle || q.title.toLowerCase().includes(filterTitle.toLowerCase());
    const tagMatch = !filterTag || q.tags.some((tag) => tag.toLowerCase().includes(filterTag.toLowerCase()));
    return dateMatch && titleMatch && tagMatch;
  });

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, 'posts', id));
  };

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  // Optional: Handle drag stop to update positions
  const handleStop = (id, e, data) => {
    setPositions((prev) => ({ ...prev, [id]: { x: data.x, y: data.y } }));
  };

  return (
    <div>
      <Form>
        <Form.Group widths="equal">
          <Form.Field>
            <label>Filter by Title</label>
            <Input value={filterTitle} onChange={(e) => setFilterTitle(e.target.value)} />
          </Form.Field>
          <Form.Field>
            <label>Filter by Tag</label>
            <Input value={filterTag} onChange={(e) => setFilterTag(e.target.value)} />
          </Form.Field>
          <Form.Field>
            <label>Filter by Date</label>
            <Input type="date" value={filterDate} onChange={(e) => setFilterDate(e.target.value)} />
          </Form.Field>
        </Form.Group>
      </Form>
      <Card.Group>
        {filteredQuestions.map((q) => (
          <Draggable
            key={q.id}
            position={positions[q.id] || { x: 0, y: 0 }}
            onStop={(e, data) => handleStop(q.id, e, data)}
            disabled={false} // Enable dragging for reordering
          >
            <Card onClick={() => toggleExpand(q.id)}>
              <Card.Content>
                <Card.Header>{q.title}</Card.Header>
                <Card.Meta>{q.date.toDate().toLocaleDateString()} | Tags: {q.tags.join(', ')}</Card.Meta>
                <Card.Description>{q.abstract}</Card.Description>
                {expandedId === q.id && (
                  <div>
                    <p>Full Article: {q.article}</p>
                 
                    {/* Add answer input or solutions here if needed */}
                  </div>
                )}
              </Card.Content>
              <Button negative onClick={() => handleDelete(q.id)}>Delete</Button>
            </Card>
          </Draggable>
        ))}
      </Card.Group>
    </div>
  );
};

export default FindQuestions;
