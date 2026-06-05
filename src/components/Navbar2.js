import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';
import { db, auth } from '../service/firebaseConfig';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { collection, query, where, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import './Navbar2.css';

export default function Navbar2() {
  const [user, setUser] = useState(null);
  const [myTrips, setMyTrips] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let unsubscribeSnapshot = () => {};

    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        // Query Firestore in real-time for current user's trips
        const q = query(
          collection(db, "AItrips"),
          where("userEmail", "==", currentUser.email)
        );
        unsubscribeSnapshot = onSnapshot(q, (querySnapshot) => {
          const trips = [];
          querySnapshot.forEach((doc) => {
            trips.push({ id: doc.id, ...doc.data() });
          });
          // Sort trips by id descending (time based Docid)
          trips.sort((a, b) => b.id.localeCompare(a.id));
          setMyTrips(trips);
        }, (error) => {
          console.error("Error in trips onSnapshot:", error);
        });
      } else {
        setMyTrips([]);
        unsubscribeSnapshot();
      }
    });

    return () => {
      unsubscribeAuth();
      unsubscribeSnapshot();
    };
  }, []);

  // Close dropdown on click outside
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (!e.target.closest('.dropdown')) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const handleDeleteTrip = async (e, tripId) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this trip?")) {
      try {
        await deleteDoc(doc(db, "AItrips", tripId));
        setMyTrips((prev) => prev.filter((t) => t.id !== tripId));
      } catch (error) {
        console.error("Error deleting trip:", error);
        alert("Failed to delete trip. Please try again.");
      }
    }
  };

  return (
    <nav className="navbar navbar-expand-lg fixed-top premium-navbar">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">
          Travel Planner
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">
            {!user && (
              <>
                <li className="nav-item">
                  <Link 
                    className="nav-link text-black ms-lg-2" 
                    to="/aboutus"
                  >
                    About Us
                  </Link>
                </li>
                <li className="nav-item">
                  <Link 
                    className="nav-link text-black ms-lg-2" 
                    to="/contactus"
                  >
                    Contact Us
                  </Link>
                </li>
              </>
            )}
            <li className="nav-item">
              <Link 
                className="nav-link text-black ms-lg-2" 
                to="/nearby"
              >
                LiveService
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                className="nav-link text-black ms-lg-2" 
                to="/tracking"
              >
                Live Tracking
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                className="nav-link text-black ms-lg-2 fw-semibold" 
                to="/create-trip"
                style={{ color: '#4f46e5' }}
              >
                Generate Trip
              </Link>
            </li>
            
            {/* Real-time trips dropdown for logged in users */}
            {user && (
              <li className="nav-item dropdown ms-lg-2" style={{ position: 'relative' }}>
                <button 
                  className="btn btn-link nav-link dropdown-toggle text-black fw-semibold d-flex align-items-center"
                  onClick={() => setShowDropdown(!showDropdown)}
                  style={{ textDecoration: 'none', border: 'none', background: 'none' }}
                >
                  💼 My Trips {myTrips.length > 0 && <span className="badge ms-1" style={{ background: '#6366f1', color: '#ffffff' }}>{myTrips.length}</span>}
                </button>
                {showDropdown && (
                  <div 
                    className="dropdown-menu show shadow-lg border-0" 
                    style={{ 
                      position: 'absolute', 
                      right: 0, 
                      top: '100%', 
                      minWidth: '280px', 
                      maxHeight: '350px', 
                      overflowY: 'auto',
                      background: 'rgba(255, 255, 255, 0.98)',
                      backdropFilter: 'blur(16px)',
                      borderRadius: '16px',
                      padding: '0.75rem 0',
                      border: '1px solid rgba(0, 0, 0, 0.05)',
                      zIndex: 1050
                    }}
                  >
                    <div className="px-3 py-1 text-muted border-bottom small fw-bold text-uppercase tracking-wider" style={{ fontSize: '0.75rem', marginBottom: '0.5rem' }}>
                      Saved Itineraries
                    </div>
                    {myTrips.length === 0 ? (
                      <div className="dropdown-item text-muted text-center py-3 small">
                        No saved trips yet.
                      </div>
                    ) : (
                      myTrips.map((trip) => {
                        const locationLabel = trip.userSelection?.location?.label || "Unknown Destination";
                        const days = trip.userSelection?.noOfDays || 1;
                        return (
                          <div 
                            key={trip.id} 
                            className="dropdown-item d-flex align-items-center justify-content-between py-2 px-3 hover-item" 
                            style={{ cursor: 'pointer', transition: 'all 0.2s' }}
                            onClick={() => {
                              setShowDropdown(false);
                              navigate(`/view-trip/${trip.id}`);
                            }}
                          >
                            <div className="text-truncate" style={{ maxWidth: '180px' }}>
                              <div className="fw-semibold text-dark text-truncate" style={{ fontSize: '0.90rem' }}>
                                📍 {locationLabel}
                              </div>
                              <div className="text-muted small" style={{ fontSize: '0.75rem' }}>
                                {days} {days === 1 ? 'day' : 'days'} plan
                              </div>
                            </div>
                            <button
                              className="btn btn-light btn-sm text-danger border-0"
                              style={{ 
                                background: 'rgba(239, 68, 68, 0.08)', 
                                width: '28px', 
                                height: '28px', 
                                padding: 0, 
                                borderRadius: '8px', 
                                display: 'flex', 
                                alignItems: 'center', 
                                justifyContent: 'center' 
                              }}
                              onClick={(e) => handleDeleteTrip(e, trip.id)}
                            >
                              🗑️
                            </button>
                          </div>
                        );
                      })
                    )}
                  </div>
                )}
              </li>
            )}

            {user ? (
              <>
                <li className="nav-item ms-lg-3">
                  <span className="navbar-text fw-medium text-muted small">
                    👤 {user.email}
                  </span>
                </li>
                <li className="nav-item ms-lg-2">
                  <button 
                    onClick={handleLogout}
                    className="btn btn-outline-danger btn-sm"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item ms-lg-3">
                  <Link className="btn btn-outline-primary btn-sm" to="/login">
                    Login
                  </Link>
                </li>
                <li className="nav-item ms-lg-2">
                  <Link className="btn btn-primary btn-sm text-white" to="/signup" style={{ background: '#4f46e5', borderColor: '#4f46e5' }}>
                    Sign Up
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
