/**
 * @file OrderStatus.jsx
 */
import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../services/firebase';
import { CheckCircle2, ChefHat, PackageCheck, Loader2 } from 'lucide-react';

const OrderStatus = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [orderData, setOrderData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!orderId) {
      setError('No Order ID provided.');
      setLoading(false);
      return;
    }

    const orderDocRef = doc(db, 'orders', orderId);
    
    const unsubscribe = onSnapshot(
      orderDocRef,
      (docSnapshot) => {
        if (docSnapshot.exists()) {
          setOrderData(docSnapshot.data());
          setError(null);
        } else {
          setError('Order not found.');
          setOrderData(null);
        }
        setLoading(false);
      },
      (err) => {
        console.error("Error listening to order:", err);
        setError('Failed to load order status.');
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [orderId]);

  const getStatusInfo = (status) => {
    switch (status) {
      case 'placed':
        return { 
          label: 'Order Received', 
          color: 'bg-blue-500', 
          textColor: 'text-blue-700',
          icon: <CheckCircle2 className="w-8 h-8 text-white" />,
          step: 1
        };
      case 'preparing':
        return { 
          label: 'Preparing', 
          color: 'bg-amber-500', 
          textColor: 'text-amber-700',
          icon: <ChefHat className="w-8 h-8 text-white" />,
          step: 2
        };
      case 'delivered':
        return { 
          label: 'Delivered', 
          color: 'bg-green-500', 
          textColor: 'text-green-700',
          icon: <PackageCheck className="w-8 h-8 text-white" />,
          step: 3
        };
      default:
        return { 
          label: 'Processing', 
          color: 'bg-gray-400',
          textColor: 'text-gray-600', 
          icon: <Loader2 className="w-8 h-8 text-white animate-spin" />,
          step: 0
        };
    }
  };

  const statusInfo = orderData ? getStatusInfo(orderData.status) : getStatusInfo('unknown');

  return (
    <main className="min-h-full flex-1 bg-white animate-in slide-in-from-bottom-8 fade-in duration-500 flex flex-col">
      <header className="px-6 py-4 flex items-center justify-between border-b border-gray-100 bg-white">
        <h1 className="text-2xl font-black text-gray-900 tracking-tight">Track Order</h1>
        <button 
          onClick={() => navigate('/home')}
          className="bg-gray-100 text-gray-700 rounded-full px-5 py-2 text-sm font-bold hover:bg-gray-200 transition min-h-[44px] flex items-center justify-center uppercase tracking-wide"
        >
          Close
        </button>
      </header>

      <section className="px-6 pt-8 pb-24 flex-1">
        {loading && (
          <div className="flex flex-col items-center justify-center py-24 text-indigo-600">
             <Loader2 className="w-12 h-12 animate-spin mb-4" />
             <p className="font-bold text-gray-400 uppercase tracking-widest text-sm">Synchronizing</p>
          </div>
        )}
        
        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-2xl mb-6 text-sm font-bold flex items-center gap-3">
             <span className="shrink-0 text-xl">⚠️</span>
             {error}
          </div>
        )}

        {!loading && !error && orderData && (
          <div className="space-y-12">
            {/* Status Visualizer */}
            <div className="flex flex-col items-center pt-6">
              <div className={`relative flex items-center justify-center w-28 h-28 rounded-full shadow-xl mb-8 ${statusInfo.color} transition-colors duration-500`}>
                <div className={`absolute inset-0 rounded-full ${statusInfo.color} animate-ping opacity-20`}></div>
                <div className="relative z-10 drop-shadow-md">
                  {statusInfo.icon}
                </div>
              </div>
              <h2 className={`text-4xl font-black mb-2 tracking-tight ${statusInfo.textColor}`}>{statusInfo.label}</h2>
              <p className="text-gray-500 font-medium text-lg text-center">
                We'll bring it right to seat <span className="font-black text-gray-900 border-b-2 border-gray-300 pb-0.5">{orderData.seatNumber}</span>
              </p>
            </div>

            {/* Progress Bar Container */}
            <div className="relative px-6">
              <div className="absolute top-1/2 left-10 right-10 h-2 bg-gray-100 -translate-y-1/2 rounded-full overflow-hidden shadow-inner">
                <div 
                  className={`h-full transition-all duration-1000 ease-out rounded-full ${statusInfo.color}`}
                  style={{ width: `${((statusInfo.step - 1) / 2) * 100}%` }}
                ></div>
              </div>
              <div className="relative flex justify-between">
                {[1, 2, 3].map((step) => (
                  <div key={step} className={`w-10 h-10 rounded-full border-[6px] flex items-center justify-center bg-white z-10 transition-colors duration-500 ${statusInfo.step >= step ? `border-${statusInfo.color.split('-')[1]}-500` : 'border-gray-100'}`}>
                    {statusInfo.step >= step && <div className={`w-3.5 h-3.5 rounded-full ${statusInfo.color}`}></div>}
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-4 text-[11px] font-black uppercase tracking-widest text-gray-400 px-1">
                <span className={statusInfo.step >= 1 ? statusInfo.textColor : ''}>Placed</span>
                <span className={statusInfo.step >= 2 ? statusInfo.textColor : ''}>Cooking</span>
                <span className={statusInfo.step >= 3 ? statusInfo.textColor : ''}>Arrived</span>
              </div>
            </div>

            {/* Receipt Box */}
            <div className="bg-gray-50 rounded-[2rem] p-8 border border-gray-100 shadow-sm mt-8">
               <div className="flex justify-between items-center mb-6 pb-6 border-b border-gray-200 border-dashed">
                 <p className="text-sm font-black text-gray-400 uppercase tracking-widest">Order Receipt</p>
                 <p className="text-sm font-mono font-bold text-gray-400 bg-gray-200 px-2 py-0.5 rounded-md">#{orderId.slice(0, 8)}</p>
               </div>
               
               <ul className="space-y-5 mb-8 text-lg">
                 {orderData.items && orderData.items.map((item, idx) => (
                   <li key={idx} className="flex items-start gap-4">
                     <span className="font-black text-gray-900 bg-white border border-gray-200 px-2.5 py-0.5 rounded-lg shadow-sm">{item.quantity}</span>
                     <span className="font-bold text-gray-700 mt-0.5">{item.name}</span>
                   </li>
                 ))}
               </ul>

               <div className="pt-6 border-t border-gray-200 flex justify-between items-end">
                 <span className="font-black text-gray-400 text-lg uppercase tracking-widest">Total Paid</span>
                 <span className="font-black text-gray-900 text-3xl tracking-tight">${orderData.total.toFixed(2)}</span>
               </div>
            </div>
          </div>
        )}
      </section>
    </main>
  );
};

export default OrderStatus;
