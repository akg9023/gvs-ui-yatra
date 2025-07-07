// PaymentStatus.jsx or .tsx (React Router v6+)
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function PaymentResponse() {
  const location = useLocation();
  const [status, setStatus] = useState('Verifying...');
  const [details, setDetails] = useState({});

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);

    // Atom may or may not send full info here; it's mostly for UI.
    const fCode = queryParams.get('f_code');     // e.g., "Ok" or "F"
    const txnId = queryParams.get('mmp_txn');    // merchant txn
    const amt = queryParams.get('amt');

    if (fCode === 'Ok') {
      setStatus('Payment Successful!');
    } else if (fCode === 'F') {
      setStatus('Payment Failed.');
    } else {
      setStatus('Unknown Payment Status');
    }

    setDetails({
      f_code: fCode,
      mmp_txn: txnId,
      amt,
    });
  }, [location.search]);

  return (
    <div className="p-6 max-w-md mx-auto shadow-md bg-white rounded-lg mt-10">
      <h2 className="text-2xl font-semibold mb-4">Payment Status</h2>
      <p className="text-lg mb-2">{status}</p>
      {details.mmp_txn && (
        <div className="text-sm text-gray-700 mt-4">
          <p><strong>Transaction ID:</strong> {details.mmp_txn}</p>
          <p><strong>Amount:</strong> ₹{details.amt}</p>
          <p><strong>Status Code:</strong> {details.f_code}</p>
        </div>
      )}
    </div>
  );
}
