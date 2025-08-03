import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

const TaskDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [error, setError] = useState('');

  const fetchTask = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/tasks/${id}`, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      });

      const data = await res.json();
      if (res.ok) {
        setTask(data);
      } else {
        setError(data.message || 'Task not found');
      }
    } catch (err) {
      setError('Error fetching task');
    }
  };

  const toggleComplete = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/tasks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
        body: JSON.stringify({ ...task, completed: !task.completed }),
      });

      const updated = await res.json();
      if (res.ok) {
        setTask(updated);
      }
    } catch (err) {
      console.error('Failed to update task');
    }
  };

  const deleteTask = async () => {
    try {
      await fetch(`http://localhost:5000/api/tasks/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      });
      navigate('/');
    } catch (err) {
      console.error('Failed to delete task');
    }
  };

  useEffect(() => {
    fetchTask();
  }, []);

  if (error) return <p style={styles.error}>{error}</p>;
  if (!task) return <p>Loading...</p>;

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>📌 Task Details</h2>

      <div style={styles.card}>
        <h3 style={styles.title}>{task.title}</h3>
        <p><strong>Due Date:</strong> {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : '—'}</p>
        <p>
          <strong>Status:</strong>{' '}
          <span style={{ color: task.completed ? 'green' : 'crimson' }}>
            {task.completed ? '✅ Completed' : '❌ Not Completed'}
          </span>
        </p>

        <div style={styles.actions}>
          <button onClick={toggleComplete} style={styles.toggleBtn}>
            Mark as {task.completed ? 'Incomplete' : 'Complete'}
          </button>
          <button onClick={deleteTask} style={styles.deleteBtn}>
            🗑️ Delete Task
          </button>
        </div>

        <Link to="/" style={styles.backLink}>← Back to Dashboard</Link>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    maxWidth: '600px',
    margin: '0 auto',
  },
  heading: {
    fontSize: '1.8rem',
    marginBottom: '20px',
  },
  card: {
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 2px 12px rgba(0,0,0,0.1)',
    backgroundColor: '#f9f9f9',
  },
  title: {
    margin: '0 0 10px',
  },
  actions: {
    display: 'flex',
    gap: '10px',
    marginTop: '20px',
    marginBottom: '10px',
  },
  toggleBtn: {
    padding: '10px',
    borderRadius: '8px',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
  },
  deleteBtn: {
    padding: '10px',
    borderRadius: '8px',
    backgroundColor: '#dc3545',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
  },
  backLink: {
    display: 'inline-block',
    marginTop: '15px',
    color: '#007bff',
    textDecoration: 'none',
  },
  error: {
    color: 'red',
    fontWeight: 'bold',
    padding: '10px',
  },
};

export default TaskDetail;
