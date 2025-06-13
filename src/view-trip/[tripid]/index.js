import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState, useCallback } from 'react';
import { useParams } from "react-router-dom";
import { db } from '../../service/firebaseConfig';
import Infosection from './components/infosection';
import ErrorBoundary from './components/ErrorBoundary';
import LoadingSpinner from './components/LoadingSpinner';
import Navbar2 from '../../components/Navbar2';

function Viewtrip() {
    const { tripid } = useParams();
    const [trip, setTrip] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getTripData = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            
            if (!tripid) {
                setError('No trip ID provided');
                return;
            }

            const docRef = doc(db, 'AItrips', tripid);
            const docSnap = await getDoc(docRef);
            
            if (docSnap.exists()) {
                setTrip(docSnap.data());
            } else {
                setError('Trip not found');
                console.log('No document found');
            }
        } catch (err) {
            setError('Failed to load trip data');
            console.error('Error fetching trip:', err);
        } finally {
            setLoading(false);
        }
    }, [tripid]);

    useEffect(() => {
        getTripData();
    }, [getTripData]);

    if (loading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return (
            <div className="error-container">
                <h2>Error Loading Trip</h2>
                <p>{error}</p>
                {error === 'Trip not found' && (
                    <p>Please check the trip ID and try again</p>
                )}
                <button onClick={getTripData}>Retry</button>
            </div>
        );
    }

    if (!trip) {
        return <div className="no-trip">No trip data available</div>;
    }

    return (
    <div>
        <Navbar2/>
        <ErrorBoundary>
            <Infosection trip={trip} />
        </ErrorBoundary>
    </div>
    );
}

export default Viewtrip;