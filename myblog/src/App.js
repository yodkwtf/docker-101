import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    fetch('http://localhost:5000/')
      .then((res) => res.json())
      .then((data) => setBlogs(data));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>All Blogs</h1>
        <section>
          {blogs &&
            blogs.map((blog) => (
              <div className="blog" key={blog.id}>
                <h4>{blog.title}</h4>
              </div>
            ))}
        </section>
      </header>
    </div>
  );
}

export default App;
