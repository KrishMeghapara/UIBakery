export const docSections = [
  {
    id: 'intro',
    emoji: '🔥',
    title: 'What they ACTUALLY test',
    content: `
They don’t care about fancy UI. They check:

- ✅ **JWT Auth working**
- ✅ **Role-based access**
- ✅ **API integration** (correct endpoints)
- ✅ **CRUD working**
- ✅ **Clean structure** (VERY IMPORTANT)
`,
  },
  {
    id: 'structure',
    emoji: '🧠',
    title: 'Ready-Made React Structure',
    content: `
Create project:
\`\`\`bash
npx create-react-app exam-app
cd exam-app
npm install axios react-router-dom
\`\`\`

📁 **Folder Structure (MUST FOLLOW)**
\`\`\`text
src/
 ├── api/
 │    └── api.js
 ├── context/
 │    └── AuthContext.js
 ├── pages/
 │    ├── Login.js
 │    ├── Dashboard.js
 │    ├── Tables.js
 │    ├── Users.js
 │    └── Restaurants.js
 ├── components/
 │    ├── Navbar.js
 │    └── ProtectedRoute.js
 ├── App.js
└── index.js
\`\`\`
`,
  },
  {
    id: 'api-setup',
    emoji: '🔗',
    title: 'API Setup (VERY IMPORTANT)',
    content: `
> 👉 **Pro Tip:** This is your life saver (no need to manually add token every time).

**📄 \`src/api/api.js\`**
\`\`\`javascript
import axios from "axios";

const API = axios.create({
  baseURL: "https://resback.sampaarsh.cloud", // change in exam if needed
});

// Add token automatically
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = \`Bearer \${token}\`;
  }
  return req;
});

export default API;
\`\`\`
`,
  },
  {
    id: 'auth-context',
    emoji: '🔐',
    title: 'Authentication (Context)',
    content: `
**📄 \`src/context/AuthContext.js\`**
\`\`\`javascript
import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (data) => {
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data));
    setUser(data);
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
\`\`\`
`,
  },
  {
    id: 'login',
    emoji: '🔐',
    title: 'LOGIN (REQUIRED FIRST)',
    content: `
**📄 \`src/pages/Login.js\`**
\`\`\`javascript
import { useState } from "react";
import API from "../api/api";

const Login = () => {
  const [form, setForm] = useState({ username: "", password: "" });

  const login = async () => {
    try {
      const res = await API.post("/users/login", form);

      localStorage.setItem("token", res.data.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.data));

      window.location.href = "/users";
    } catch {
      alert("Login failed");
    }
  };

  return (
    <div>
      <h2>Login</h2>

      <input
        placeholder="Username"
        onChange={(e) =>
          setForm({ ...form, username: e.target.value })
        }
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) =>
          setForm({ ...form, password: e.target.value })
        }
      />

      <button onClick={login}>Login</button>
    </div>
  );
};

export default Login;
\`\`\`
`,
  },
  {
    id: 'protected-route',
    emoji: '🚪',
    title: 'PROTECTED ROUTE',
    content: `
**📄 \`src/components/ProtectedRoute.js\`**
\`\`\`javascript
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, role }) => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  if (!token) return <Navigate to="/" />;

  if (role && user?.role !== role) {
    return <h2>Access Denied</h2>;
  }

  return children;
};

export default ProtectedRoute;
\`\`\`
`,
  },
  {
    id: 'users-module',
    emoji: '👤',
    title: 'USERS MODULE (FULL CRUD)',
    content: `
**📄 \`src/pages/Users.js\`**
\`\`\`javascript
import { useEffect, useState } from "react";
import API from "../api/api";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({
    username: "",
    password: "",
    role: "Waiter",
  });

  // GET USERS
  const fetchUsers = async () => {
    const res = await API.get("/users");
    setUsers(res.data.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // CREATE USER
  const addUser = async () => {
    await API.post("/users", form);
    fetchUsers();
  };

  // DELETE USER
  const deleteUser = async (id) => {
    await API.delete(\`/users/\${id}\`);
    fetchUsers();
  };

  // UPDATE USER
  const updateUser = async (id) => {
    await API.patch(\`/users/\${id}\`, { role: "Chef" });
    fetchUsers();
  };

  return (
    <div>
      <h2>Users</h2>

      <input
        placeholder="Username"
        onChange={(e) =>
          setForm({ ...form, username: e.target.value })
        }
      />

      <input
        placeholder="Password"
        onChange={(e) =>
          setForm({ ...form, password: e.target.value })
        }
      />

      <select
        onChange={(e) =>
          setForm({ ...form, role: e.target.value })
        }
      >
        <option>Manager</option>
        <option>Waiter</option>
        <option>Chef</option>
        <option>Cashier</option>
      </select>

      <button onClick={addUser}>Add User</button>

      <hr />

      {users.map((u) => (
        <div key={u.id}>
          {u.username} - {u.role}

          <button onClick={() => updateUser(u.id)}>
            Update
          </button>

          <button onClick={() => deleteUser(u.id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default Users;
\`\`\`
`,
  },
  {
    id: 'restaurants-module',
    emoji: '🏪',
    title: 'RESTAURANTS MODULE (FULL CRUD)',
    content: `
**📄 \`src/pages/Restaurants.js\`**
\`\`\`javascript
import { useEffect, useState } from "react";
import API from "../api/api";

const Restaurants = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [name, setName] = useState("");

  // GET
  const fetchRestaurants = async () => {
    const res = await API.get("/restaurants");
    setRestaurants(res.data.data);
  };

  useEffect(() => {
    fetchRestaurants();
  }, []);

  // CREATE
  const addRestaurant = async () => {
    await API.post("/restaurants", { name });
    fetchRestaurants();
  };

  // DELETE
  const deleteRestaurant = async (id) => {
    await API.delete(\`/restaurants/\${id}\`);
    fetchRestaurants();
  };

  // UPDATE
  const updateRestaurant = async (id) => {
    await API.patch(\`/restaurants/\${id}\`, {
      name: "Updated Name",
    });
    fetchRestaurants();
  };

  return (
    <div>
      <h2>Restaurants</h2>

      <input
        placeholder="Restaurant Name"
        onChange={(e) => setName(e.target.value)}
      />

      <button onClick={addRestaurant}>Add</button>

      <hr />

      {restaurants.map((r) => (
        <div key={r.id}>
          {r.name}

          <button onClick={() => updateRestaurant(r.id)}>
            Update
          </button>

          <button onClick={() => deleteRestaurant(r.id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default Restaurants;
\`\`\`
`,
  },
  {
    id: 'routing',
    emoji: '🔀',
    title: 'ROUTING',
    content: `
**📄 \`src/App.js\`**
\`\`\`javascript
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Users from "./pages/Users";
import Restaurants from "./pages/Restaurants";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route
          path="/users"
          element={
            <ProtectedRoute>
              <Users />
            </ProtectedRoute>
          }
        />

        <Route
          path="/restaurants"
          element={
            <ProtectedRoute>
              <Restaurants />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
\`\`\`
`,
  },
  {
    id: 'how-to',
    emoji: '🧠',
    title: 'HOW TO WRITE IN EXAM (IMPORTANT)',
    content: `
Step-by-step:

- Login API ✔
- Store token ✔
- Axios interceptor ✔
- ProtectedRoute ✔
- One CRUD (Users) ✔
- Copy same for Restaurants ✔

> 👉 **PRO TIPS (EXAM GOLD)**
> Always use:
> \`try { } catch { }\`
> Always refresh list after POST/DELETE
>
> If stuck → just implement:
> GET + POST → enough for marks

🎯 **If Same Question Comes**

Just replace:
- \`/users\` → new endpoint
- \`/restaurants\` → new module

If you want next:
🔥 I can give Orders + OrderItems full code
🔥 OR a 1-page cheat sheet for revision
`,
  },
  {
    id: 'full-restaurants',
    emoji: '🏪',
    title: 'FULL RESTAURANT MODULE (EXAM READY)',
    content: `
**📄 \`src/pages/Restaurants.js\`**
\`\`\`javascript
import { useEffect, useState } from "react";
import API from "../api/api";

const Restaurants = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [form, setForm] = useState({ name: "", address: "" });
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);

  // ✅ GET ALL
  const fetchRestaurants = async () => {
    try {
      setLoading(true);
      const res = await API.get("/restaurants");
      setRestaurants(res.data.data);
    } catch (err) {
      alert("Error fetching restaurants");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRestaurants();
  }, []);

  // ✅ CREATE / UPDATE
  const handleSubmit = async () => {
    try {
      setLoading(true);

      if (editId) {
        // UPDATE
        await API.patch(\`/restaurants/\${editId}\`, form);
      } else {
        // CREATE
        await API.post("/restaurants", form);
      }

      setForm({ name: "", address: "" });
      setEditId(null);
      fetchRestaurants();
    } catch (err) {
      alert("Error saving data");
    } finally {
      setLoading(false);
    }
  };

  // ✅ DELETE
  const deleteRestaurant = async (id) => {
    try {
      setLoading(true);
      await API.delete(\`/restaurants/\${id}\`);
      fetchRestaurants();
    } catch {
      alert("Delete failed");
    } finally {
      setLoading(false);
    }
  };

  // ✅ EDIT (FILL FORM)
  const editRestaurant = (r) => {
    setForm({
      name: r.name,
      address: r.address || "",
    });
    setEditId(r.id);
  };

  return (
    <div>
      <h2>Restaurants</h2>

      {/* FORM */}
      <input
        placeholder="Name"
        value={form.name}
        onChange={(e) =>
          setForm({ ...form, name: e.target.value })
        }
      />

      <input
        placeholder="Address"
        value={form.address}
        onChange={(e) =>
          setForm({ ...form, address: e.target.value })
        }
      />

      <button onClick={handleSubmit}>
        {editId ? "Update" : "Add"}
      </button>

      <hr />

      {/* LOADING */}
      {loading && <p>Loading...</p>}

      {/* LIST */}
      {restaurants.map((r) => (
        <div key={r.id}>
          <b>{r.name}</b> - {r.address}

          <button onClick={() => editRestaurant(r)}>
            Edit
          </button>

          <button onClick={() => deleteRestaurant(r.id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default Restaurants;
\`\`\`

### 🔐 ROLE-BASED CONTROL (IMPORTANT)

Managers only → add this check:

\`\`\`javascript
const user = JSON.parse(localStorage.getItem("user"));
\`\`\`

Then:

\`\`\`jsx
{user?.role === "Manager" && (
  <button onClick={handleSubmit}>
    {editId ? "Update" : "Add"}
  </button>
)}
\`\`\`
`,
  },
  {
    id: 'navbar',
    emoji: '🧱',
    title: '1. CREATE NAVBAR',
    content: `
**📄 \`src/components/Navbar.js\`**
\`\`\`javascript
import { Link } from "react-router-dom";

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <div style={{ padding: "10px", background: "#222", color: "#fff" }}>
      <Link to="/dashboard" style={{ marginRight: "10px", color: "#fff" }}>
        Dashboard
      </Link>

      {user?.role === "Manager" && (
        <>
          <Link to="/users" style={{ marginRight: "10px", color: "#fff" }}>
            Users
          </Link>

          <Link to="/restaurants" style={{ marginRight: "10px", color: "#fff" }}>
            Restaurants
          </Link>
        </>
      )}

      <button onClick={logout} style={{ float: "right" }}>
        Logout
      </button>
    </div>
  );
};

export default Navbar;
\`\`\`
`,
  },
  {
    id: 'dashboard',
    emoji: '🏠',
    title: '2. DASHBOARD PAGE',
    content: `
**📄 \`src/pages/Dashboard.js\`**
\`\`\`javascript
import Navbar from "../components/Navbar";

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div>
      <Navbar />

      <h2>Dashboard</h2>
      <p>Welcome: {user?.username}</p>
      <p>Role: {user?.role}</p>
    </div>
  );
};

export default Dashboard;
\`\`\`
`,
  },
  {
    id: 'react-crud',
    emoji: '⚛️',
    title: '3. RESTAURANTS PAGE (UI + TABLE)',
    content: `
**📄 \`src/pages/Restaurants.js\`**
\`\`\`javascript
import { useEffect, useState } from "react";
import API from "../api/api";
import Navbar from "../components/Navbar";

const Restaurants = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [form, setForm] = useState({ name: "", address: "" });
  const [editId, setEditId] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));

  // GET
  const fetchRestaurants = async () => {
    const res = await API.get("/restaurants");
    setRestaurants(res.data.data);
  };

  useEffect(() => {
    fetchRestaurants();
  }, []);

  // SUBMIT
  const handleSubmit = async () => {
    if (editId) {
      await API.patch(\`/restaurants/\${editId}\`, form);
    } else {
      await API.post("/restaurants", form);
    }

    setForm({ name: "", address: "" });
    setEditId(null);
    fetchRestaurants();
  };

  // DELETE
  const deleteRestaurant = async (id) => {
    await API.delete(\`/restaurants/\${id}\`);
    fetchRestaurants();
  };

  // EDIT
  const editRestaurant = (r) => {
    setForm({ name: r.name, address: r.address || "" });
    setEditId(r.id);
  };

  return (
    <div>
      <Navbar />

      <h2>Restaurant Management</h2>

      {/* FORM */}
      {user?.role === "Manager" && (
        <div style={{ marginBottom: "20px" }}>
          <input
            placeholder="Name"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />

          <input
            placeholder="Address"
            value={form.address}
            onChange={(e) =>
              setForm({ ...form, address: e.target.value })
            }
          />

          <button onClick={handleSubmit}>
            {editId ? "Update" : "Add"}
          </button>
        </div>
      )}

      {/* TABLE UI */}
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Address</th>
            {user?.role === "Manager" && <th>Actions</th>}
          </tr>
        </thead>

        <tbody>
          {restaurants.map((r) => (
            <tr key={r.id}>
              <td>{r.id}</td>
              <td>{r.name}</td>
              <td>{r.address}</td>

              {user?.role === "Manager" && (
                <td>
                  <button onClick={() => editRestaurant(r)}>
                    Edit
                  </button>

                  <button onClick={() => deleteRestaurant(r.id)}>
                    Delete
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Restaurants;
\`\`\`
`,
  },
  {
    id: 'update-routes',
    emoji: '🔀',
    title: '4. UPDATE ROUTES',
    content: `
**📄 \`src/App.js\`**
\`\`\`javascript
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Restaurants from "./pages/Restaurants";
import Users from "./pages/Users";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/restaurants"
          element={
            <ProtectedRoute>
              <Restaurants />
            </ProtectedRoute>
          }
        />

        <Route
          path="/users"
          element={
            <ProtectedRoute>
              <Users />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
\`\`\`
`,
  },
  {
    id: 'api-service-tables',
    emoji: '🚀',
    title: '1. API SERVICE (Same for all)',
    content: `
**📄 \`src/api/api.js\`**
\`\`\`javascript
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000", // change to your API URL
});

// Attach token (VERY IMPORTANT FOR EXAM)
API.interceptors.request.use((req) => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user?.token) {
    req.headers.Authorization = \`Bearer \${user.token}\`;
  }

  return req;
});

export default API;
\`\`\`
`,
  },
  {
    id: 'tables-list-api',
    emoji: '📁',
    title: '2. TABLES LIST (API)',
    content: `
**📁 \`src/pages/Tables.js\`**

\`\`\`javascript
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api";

const Tables = () => {
  const [tables, setTables] = useState([]);

  const fetchTables = async () => {
    try {
      const res = await API.get("/tables");
      setTables(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchTables();
  }, []);

  const handleDelete = async (id) => {
    try {
      await API.delete(\`/tables/\${id}\`);
      fetchTables();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h2>Tables</h2>

      <Link to="/tables/add">
        <button>Add Table</button>
      </Link>

      <table border="1">
        <thead>
          <tr>
            <th>Name</th>
            <th>Capacity</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {tables.map((t) => (
            <tr key={t.id}>
              <td>{t.name}</td>
              <td>{t.capacity}</td>
              <td>
                <Link to={\`/tables/edit/\${t.id}\`}>
                  <button>Edit</button>
                </Link>

                <button onClick={() => handleDelete(t.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Tables;
\`\`\`
`,
  },
  {
    id: 'add-table-api',
    emoji: '➕',
    title: '3. ADD TABLE (API)',
    content: `
**📁 \`src/pages/AddTable.js\`**

\`\`\`javascript
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

const AddTable = () => {
  const [form, setForm] = useState({
    name: "",
    capacity: ""
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/tables", form);
      navigate("/tables");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h2>Add Table</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Table Name"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />

        <input
          type="number"
          placeholder="Capacity"
          value={form.capacity}
          onChange={(e) =>
            setForm({ ...form, capacity: e.target.value })
          }
        />

        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default AddTable;
\`\`\`
`,
  },
  {
    id: 'edit-table-api',
    emoji: '✏️',
    title: '4. EDIT TABLE (API – SEPARATE)',
    content: `
**📁 \`src/pages/EditTable.js\`**

\`\`\`javascript
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../api";

const EditTable = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    capacity: ""
  });

  // GET BY ID
  useEffect(() => {
    const fetchTable = async () => {
      try {
        const res = await API.get(\`/tables/\${id}\`);
        setForm(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchTable();
  }, [id]);

  // UPDATE
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.patch(\`/tables/\${id}\`, form);
      navigate("/tables");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h2>Edit Table</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />

        <input
          type="number"
          value={form.capacity}
          onChange={(e) =>
            setForm({ ...form, capacity: e.target.value })
          }
        />

        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default EditTable;
\`\`\`
`,
  },
  {
    id: 'routing-tables',
    emoji: '🛣️',
    title: '5. ROUTING',
    content: `
**📁 \`src/App.js\`**

\`\`\`javascript
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Tables from "./pages/Tables";
import AddTable from "./pages/AddTable";
import EditTable from "./pages/EditTable";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/tables" element={<Tables />} />
        <Route path="/tables/add" element={<AddTable />} />
        <Route path="/tables/edit/:id" element={<EditTable />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
\`\`\`
`,
  },
  {
    id: 'role-control-bonus',
    emoji: '🔐',
    title: '(OPTIONAL) ROLE CONTROL (EXAM BONUS)',
    content: `
\`\`\`javascript
const user = JSON.parse(localStorage.getItem("user"));
\`\`\`

\`\`\`jsx
{user?.role === "Manager" && (
  <Link to="/tables/add">
    <button>Add</button>
  </Link>
)}
\`\`\`
`,
  }
];
