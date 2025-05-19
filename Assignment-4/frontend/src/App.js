import { useState } from 'react';
import { Container } from 'react-bootstrap';
import StudentForm from './components/StudentForm';
import ResultTable from './components/ResultTable';

function App() {
  const [student, setStudent] = useState(null);

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4 text-success fw-bold">
        🎓 Semester Result
      </h2>
      
      {/* Form Section */}
      <div className="p-3 mb-4 rounded shadow bg-light">
        <StudentForm onSaved={setStudent} />
      </div>

      {/* Result Section */}
      {student && (
        <div className="p-3 rounded shadow bg-white border border-success">
          <ResultTable student={student} />
        </div>
      )}
    </Container>
  );
}

export default App;
