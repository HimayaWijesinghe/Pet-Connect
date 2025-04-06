import React from 'react';
import PaymentForm from '../components/ui/forms/sponsor_payment';
import SponserCard from '../components/ui/custom/sponser_widgets';
import { useParams } from 'react-router-dom';
import { getSponsorDetails } from '../server/sponser_function';
import { pdf } from '@react-pdf/renderer';
import { saveAs } from 'file-saver';
import InvoiceTemplate from '../components/ui/custom/sponser_invoice';
import { own_a_Pet } from '../server/sponser_function';
import useSessionStore from '../store/sessionStore'

function BookAPet() {
  const { id } = useParams();
  const activeEmail = useSessionStore((state) => state.activeEmail);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  const [punk, setPunk] = React.useState(null);
  // const [bob, setBob] = React.useState(null);

  React.useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await getSponsorDetails(id);
        setPunk(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const confirmPayment = async (formData) => {
    try {
      setLoading(true);
      setError('');

      // Generate PDF
      const blob = await pdf(
        <InvoiceTemplate formData={formData} petData={punk} />
      ).toBlob();

      // Save PDF
      saveAs(blob, `invoice-${Date.now()}.pdf`);

      
      // Here you would typically send data to your backend
      const response_data = {
        pId: punk.id,
        sponserEmail: formData.email,
        sponserName: formData.cardName,
        amount: punk.amount,
        message: formData.message,
      }
      const response = await own_a_Pet(response_data);
      console.log(response);
      
      // Update state
      // setBob(response_data);

      // Redirect after success
      window.location.href = `/sponsor/${activeEmail}`;

    } catch (error) {
      setError('Failed to generate invoice: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='w-full flex flex-col items-center py-5'>
      {error && <div className="text-red-600 mb-4">{error}</div>}
      {loading && <div className="text-blue-600 mb-4">Processing payment...</div>}
      {/* <p className="">{JSON.stringify(bob)}</p> */}
      
      {punk ? (
        <div className="w-5/6 flex items-stretch">
          <div className="flex-1 flex items-center justify-center border-dashed border-r border-r-blue-400">
            <PaymentForm 
              onSubmit={confirmPayment} 
              email={activeEmail}
              amount={Number(punk.amount)} 
              isSubmitting={loading}
            />
          </div>
          <div className="flex-1 flex">
            <SponserCard pet={punk} />
          </div>
        </div>
      ) : (
        <div>{loading ? 'Loading...' : 'No pet data available'}</div>
      )}
    </div>
  );
}

export default BookAPet;