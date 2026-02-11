import { useSearchParams } from 'react-router-dom';

import useAuth from '../hooks/useAuth';
import { useEffect } from 'react';
import useVerifyStripe from '../hooks/user/useVerifyStripe';
function Verify() {
  const { verifyStripe } = useVerifyStripe();
  const [searchParams] = useSearchParams();
  const { token } = useAuth();
  const sessionId = searchParams.get('session_id');
  const appointmentId = searchParams.get('appointmentId');
  console.log({ sessionId, appointmentId });
  useEffect(() => {
    if (token && appointmentId && sessionId) {
      verifyStripe({ appointmentId, sessionId });
    }
  }, [token, appointmentId, sessionId]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="w-20 h-20 border-4 border-gray-300 border-t-4 border-t-primary rounded-full animate-spin"></div>
    </div>
  );
}

export default Verify;
