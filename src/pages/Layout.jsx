// src/pages/Layout.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Layout = ({ children, userData }) => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-gray-800 text-white p-4">
        <nav>
          <ul className="flex space-x-4">
            {userData ? (
              <>
                <li>
                  <Link to="/dashboard">Dashboard</Link>
                </li>
                {userData.role === 'Authenticated' && (
                  <>
                    <li>
                      <Link to="/students">Students</Link>
                    </li>
                    <li>
                      <Link to="/reporting">Reporting</Link>
                    </li>
                  </>
                )}
                <li>
                  <button onClick={() => { localStorage.removeItem('jwtToken'); window.location.reload(); }}>Logout</button>
                </li>
              </>
            ) : (
              <li>
                <Link to="/login">Login</Link>
              </li>
            )}
          </ul>
        </nav>
      </header>

      {/* Main content */}
      <main className="flex-1 p-4">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white p-4 text-center">
        <p>© 2024 My Application</p>
      </footer>
    </div>
  );
};

export default Layout;
