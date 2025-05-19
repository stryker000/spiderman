import { Table, Card } from 'react-bootstrap';

export default function ResultTable({ student }) {
  if (!student) return (
    <Card>
      <Card.Body>
        <Card.Title>Result</Card.Title>
        <p>No student selected yet.</p>
      </Card.Body>
    </Card>
  );

  return (
    <Card>
      <Card.Body>
        <Card.Title>Result – {student.name} ({student.prn})</Card.Title>
        <Table striped bordered hover responsive>
          <thead className="table-light">
            <tr>
              <th>Subject</th>
              <th>MSE</th>
              <th>ESE</th>
              <th>Final (30/70)</th>
            </tr>
          </thead>
          <tbody>
            {student.marks.map(m => (
              <tr key={m.id ?? m.subject}>
                <td>{m.subject}</td>
                <td>{m.mse}</td>
                <td>{m.ese}</td>
                <td>{Number(m.finalScore).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
}
