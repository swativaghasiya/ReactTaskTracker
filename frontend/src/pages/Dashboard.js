import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all'); // "all" | "completed"
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/tasks', {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      });
      const data = await res.json();
      setTasks(data || []);
    } catch (err) {
      console.error('Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const filteredTasks = tasks.filter((task) => {
    const matchesFilter =
      filter === 'all' || (filter === 'completed' && task.completed);
    const matchesSearch = task.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>📋 Your Tasks</h2>

      <div style={styles.toolbar}>
        <input
          type="text"
          placeholder="🔍 Search by title..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={styles.search}
        />

        <div style={styles.filterBtns}>
          <button
            onClick={() => setFilter('all')}
            style={{
              ...styles.filterBtn,
              backgroundColor: filter === 'all' ? '#007bff' : '#ccc',
            }}
          >
            All
          </button>
          <button
            onClick={() => setFilter('completed')}
            style={{
              ...styles.filterBtn,
              backgroundColor: filter === 'completed' ? '#007bff' : '#ccc',
            }}
          >
            Completed
          </button>
        </div>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : filteredTasks.length === 0 ? (
        <p>Failed to load tasks.</p>
      ) : (
        <ul style={styles.list}>
          {filteredTasks.map((task) => (
            <li key={task._id} style={styles.item}>
              <Link to={`/task/${task._id}`} style={styles.link}>
                {task.title}
              </Link>
              <span style={{ color: task.completed ? 'green' : 'crimson' }}>
                {task.completed ? '✅' : '❌'}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
  },
  heading: {
    fontSize: '1.8rem',
    marginBottom: '20px',
  },
  toolbar: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    marginBottom: '20px',
  },
  search: {
    padding: '10px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    fontSize: '16px',
  },
  filterBtns: {
    display: 'flex',
    gap: '10px',
  },
  filterBtn: {
    flex: 1,
    padding: '10px',
    border: 'none',
    borderRadius: '6px',
    color: '#fff',
    cursor: 'pointer',
  },
  list: {
    listStyle: 'none',
    padding: 0,
  },
  item: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '12px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    marginBottom: '10px',
    backgroundColor: '#f9f9f9',
  },
  link: {
    textDecoration: 'none',
    color: '#333',
    fontWeight: '500',
  },
};

export default Dashboard;
