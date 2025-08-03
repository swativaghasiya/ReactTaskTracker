import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/tasks', {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      });
      const data = await res.json();
      if (res.ok) setTasks(data);
    } catch (err) {
      console.error('Failed to load tasks');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>📋 Your Tasks</h1>
      <Link to="/task/new" style={styles.createBtn}>➕ Create New Task</Link>

      {loading ? (
        <p>Loading...</p>
      ) : tasks.length === 0 ? (
        <p>No tasks found.</p>
      ) : (
        <div style={styles.cardGrid}>
          {tasks.map((task) => (
            <div key={task._id} style={styles.card}>
              <h3 style={styles.taskTitle}>
                <Link to={`/task/${task._id}`} style={styles.taskLink}>
                  {task.title}
                </Link>
              </h3>
              <p>
                Due: {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : '—'}
              </p>
              <p style={{ color: task.completed ? 'green' : 'crimson' }}>
                {task.completed ? '✅ Completed' : '❌ Not Completed'}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    maxWidth: '900px',
    margin: '0 auto',
  },
  heading: {
    fontSize: '2rem',
    marginBottom: '10px',
  },
  createBtn: {
    display: 'inline-block',
    padding: '10px 15px',
    backgroundColor: '#007bff',
    color: '#fff',
    textDecoration: 'none',
    borderRadius: '8px',
    marginBottom: '20px',
  },
  cardGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '15px',
  },
  card: {
    padding: '15px',
    borderRadius: '10px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    backgroundColor: '#f9f9f9',
  },
  taskTitle: {
    margin: '0 0 10px',
  },
  taskLink: {
    textDecoration: 'none',
    color: '#333',
  },
};

export default Dashboard;
