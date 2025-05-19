import { useState } from 'react';
import { Form, Row, Col, Button, Card, Alert } from 'react-bootstrap';
import api from '../api';

const SUBJECTS = ['WT', 'SDAM', 'DAA', 'EDAI'];

export default function StudentForm({ onSaved }) {
  const emptyState = {
    prn: '',
    name: '',
    marks: SUBJECTS.map(s => ({ subject: s, mse: '', ese: '' }))
  };

  const [student, setStudent] = useState(emptyState);
  const [message, setMessage] = useState({ text: '', variant: '' });

  const update = (idx, field, val) => {
    const clone = { ...student };
    if (field === 'prn' || field === 'name') clone[field] = val;
    else clone.marks[idx][field] = val;
    setStudent(clone);
  };

  const isValid = () =>
    student.prn.trim() &&
    student.name.trim() &&
    student.marks.every(m =>
      [m.mse, m.ese].every(v => v !== '' && +v >= 0 && +v <= 100)
    );

  const handleSubmit = async e => {
    e.preventDefault();
    if (!isValid()) {
      setMessage({ text: 'Please fill every field (0-100).', variant: 'danger' });
      return;
    }

    const payload = {
      ...student,
      marks: student.marks.map(m => ({
        ...m,
        mse: Number(m.mse),
        ese: Number(m.ese)
      }))
    };

    try {
      const res = await api.post('/students', payload);
      if (res.status === 200) {
        setMessage({ text: 'Saved successfully!', variant: 'success' });
        onSaved(res.data);
        setStudent(emptyState);
      } else {
        setMessage({ text: res.data?.message || 'Server validation failed.', variant: 'danger' });
      }
    } catch (err) {
      setMessage({ text: 'Server Error – Could not save.', variant: 'danger' });
    }
  };

  return (
    <Card>
      <Card.Body>
        <Card.Title>Enter Student Details</Card.Title>

        {message.text && <Alert variant={message.variant}>{message.text}</Alert>}

        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Col>
              <Form.Control
                placeholder="PRN"
                value={student.prn}
                onChange={e => update(null, 'prn', e.target.value)}
                required
              />
            </Col>
            <Col>
              <Form.Control
                placeholder="Name"
                value={student.name}
                onChange={e => update(null, 'name', e.target.value)}
                required
              />
            </Col>
          </Row>

          {student.marks.map((m, idx) => (
            <Row className="mb-2" key={idx}>
              <Col sm={4}>
                <Form.Control value={m.subject} disabled />
              </Col>
              <Col>
                <Form.Control
                  type="number"
                  min="0"
                  max="100"
                  placeholder="MSE"
                  value={m.mse}
                  onChange={e => update(idx, 'mse', e.target.value)}
                  required
                />
              </Col>
              <Col>
                <Form.Control
                  type="number"
                  min="0"
                  max="100"
                  placeholder="ESE"
                  value={m.ese}
                  onChange={e => update(idx, 'ese', e.target.value)}
                  required
                />
              </Col>
            </Row>
          ))}

          <div className="text-center mt-4">
            <Button type="submit" variant="primary" size="lg">
              Save Record
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
}
