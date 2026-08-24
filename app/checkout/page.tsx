'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCartStore, parsePrice } from '@/store/cartStore';
import { INDIAN_STATES_AND_UTS } from '@/data/indianStates';
import Link from 'next/link';
import Script from 'next/script';
export default function CheckoutPage() {
  const router = useRouter();
  const items = useCartStore((state) => state.items);
  const totalPrice = useCartStore((state) => state.totalPrice);
  const [mounted, setMounted] = useState(false);

  // Form states
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    addressLine: '',
    city: '',
    state: '',
    pincode: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phone: '',
    addressLine: '',
    city: '',
    state: '',
    pincode: '',
  });
  
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    phone: false,
    addressLine: false,
    city: false,
    state: false,
    pincode: false,
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!mounted) return null;

  if (items.length === 0 && !isSubmitted) {
    return (
      <div className="min-h-screen bg-cream pt-[120px] pb-[80px] flex flex-col items-center justify-center px-4">
        <div className="text-[64px] mb-[24px] animate-bounce">🫙</div>
        <h1 className="font-cormorant text-[36px] md:text-[48px] font-bold text-greenDark mb-[12px] text-center">
          Your cart is empty
        </h1>
        <p className="text-[16px] text-textMid mb-[32px] text-center max-w-md leading-relaxed">
          It looks like you haven't added any REGGI products to your cart yet. Let's fix that!
        </p>
        <Link 
          href="/"
          className="bg-greenDark text-white px-[32px] py-[16px] rounded-full text-[16px] font-bold hover:bg-greenMid transition-all shadow-md inline-block cursor-pointer"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  const validateField = (field: string, value: string) => {
    let error = '';
    switch (field) {
      case 'name':
        if (value.trim().length < 2) error = 'Name must be at least 2 characters';
        break;
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) error = 'Please enter a valid email address';
        break;
      case 'phone':
        const phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(value)) error = 'Please enter a valid 10-digit mobile number';
        break;
      case 'addressLine':
        if (value.trim().length < 5) error = 'Address line must be at least 5 characters';
        break;
      case 'city':
        if (value.trim().length < 2) error = 'City must be at least 2 characters';
        break;
      case 'state':
        if (!value || !INDIAN_STATES_AND_UTS.includes(value as any)) error = 'Please select a state or UT';
        break;
      case 'pincode':
        const pincodeRegex = /^[0-9]{6}$/;
        if (!pincodeRegex.test(value)) error = 'Pincode must be exactly 6 digits';
        break;
    }
    return error;
  };

  const handleBlur = (field: string) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    const error = validateField(field, formData[field as keyof typeof formData]);
    setErrors(prev => ({ ...prev, [field]: error }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === 'phone' && value && !/^\d*$/.test(value)) {
      return;
    }
    if (name === 'pincode' && value && !/^\d*$/.test(value)) {
      return;
    }
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (touched[name as keyof typeof touched]) {
       const error = validateField(name, value);
       setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  const isFormValid = () => {
    const nameError = validateField('name', formData.name);
    const emailError = validateField('email', formData.email);
    const phoneError = validateField('phone', formData.phone);
    const addressLineError = validateField('addressLine', formData.addressLine);
    const cityError = validateField('city', formData.city);
    const stateError = validateField('state', formData.state);
    const pincodeError = validateField('pincode', formData.pincode);
    return !nameError && !emailError && !phoneError && !addressLineError && !cityError && !stateError && !pincodeError;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError('');
    
    const nameError = validateField('name', formData.name);
    const emailError = validateField('email', formData.email);
    const phoneError = validateField('phone', formData.phone);
    const addressLineError = validateField('addressLine', formData.addressLine);
    const cityError = validateField('city', formData.city);
    const stateError = validateField('state', formData.state);
    const pincodeError = validateField('pincode', formData.pincode);
    
    setErrors({
      name: nameError,
      email: emailError,
      phone: phoneError,
      addressLine: addressLineError,
      city: cityError,
      state: stateError,
      pincode: pincodeError,
    });
    setTouched({
      name: true,
      email: true,
      phone: true,
      addressLine: true,
      city: true,
      state: true,
      pincode: true,
    });

    if (!nameError && !emailError && !phoneError && !addressLineError && !cityError && !stateError && !pincodeError) {
      setIsSubmitting(true);
      try {
        const orderPayload = {
          customer: {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            addressLine: formData.addressLine,
            city: formData.city,
            state: formData.state,
            pincode: formData.pincode,
          }
        };

        const response = await fetch('/api/orders', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(orderPayload),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Failed to submit order. Please try again.');
        }

        const rpResponse = await fetch('/api/razorpay/create-order', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ orderId: data.orderId }),
        });

        const rpData = await rpResponse.json();

        if (!rpResponse.ok) {
          throw new Error(rpData.error || 'Failed to initialize payment.');
        }

        const options = {
          key: rpData.keyId,
          amount: rpData.amount,
          currency: rpData.currency,
          name: 'REGGI',
          description: 'Order Payment',
          order_id: rpData.razorpayOrderId,
          prefill: {
            name: formData.name,
            email: formData.email,
            contact: formData.phone,
          },
          theme: {
            color: '#1A331E', // This is your greenDark token
          },
          handler: function () {
             router.push(`/order-confirmation?orderId=${data.orderId}`);
          },
          modal: {
            ondismiss: function () {
              setApiError('Payment was not completed — you can try again.');
              setIsSubmitting(false);
            },
          },
        };

        const rzp1 = new (window as any).Razorpay(options);
        rzp1.on('payment.failed', function (response: any) {
          setApiError(response.error.description || 'Payment failed. Please try again.');
          setIsSubmitting(false);
        });
        rzp1.open();

      } catch (err: any) {
        setApiError(err.message || 'An unexpected error occurred while creating order.');
        setIsSubmitting(false);
      }
    }
  
  return (
    <div className="min-h-screen bg-cream relative">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
      <div className={`fixed top-0 left-0 w-full z-[100] bg-cream transition-all duration-200 ${isScrolled ? 'border-b border-creamDark shadow-sm py-[16px] md:py-[20px]' : 'py-[24px] md:py-[32px]'}`}>
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <Link href="/" className="inline-flex items-center text-textMid hover:text-greenDark font-medium text-[14px] mb-[12px] transition-colors">
            <svg className="w-[16px] h-[16px] mr-[8px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            Back to shopping
          </Link>
          <h1 className="font-cormorant text-[40px] md:text-[54px] font-bold text-greenDark leading-tight">
            Checkout
          </h1>
        </div>
      </div>

      <div className="pt-[180px] md:pt-[220px] pb-[80px]">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="flex flex-col-reverse md:flex-row gap-[32px] md:gap-[48px] items-start">
          {/* Left Column: Form */}
          <div className="w-full md:w-[60%] bg-white rounded-card p-[24px] md:p-[40px] shadow-card border border-creamDark">
            <h2 className="font-cormorant text-[28px] font-bold text-greenDark mb-[24px]">
              Shipping Details
            </h2>
            <form onSubmit={handleSubmit} className="space-y-[24px]" noValidate>
              
              <div>
                <label htmlFor="name" className="block text-[14px] font-bold text-greenDark mb-[8px]">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={() => handleBlur('name')}
                  className={`w-full px-[16px] py-[14px] bg-cream/50 rounded-[12px] border ${touched.name && errors.name ? 'border-redAccent focus:border-redAccent' : 'border-creamDark focus:border-greenDark'} focus:outline-none focus:ring-1 ${touched.name && errors.name ? 'focus:ring-redAccent' : 'focus:ring-greenDark'} transition-all text-[16px] text-textDark placeholder:text-textLight`}
                  placeholder="John Doe"
                />
                {touched.name && errors.name && (
                  <p className="text-redAccent text-[13px] mt-[8px] font-medium flex items-center gap-[6px]">
                    <svg className="w-[14px] h-[14px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-[14px] font-bold text-greenDark mb-[8px]">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={() => handleBlur('email')}
                  className={`w-full px-[16px] py-[14px] bg-cream/50 rounded-[12px] border ${touched.email && errors.email ? 'border-redAccent focus:border-redAccent' : 'border-creamDark focus:border-greenDark'} focus:outline-none focus:ring-1 ${touched.email && errors.email ? 'focus:ring-redAccent' : 'focus:ring-greenDark'} transition-all text-[16px] text-textDark placeholder:text-textLight`}
                  placeholder="john@example.com"
                />
                {touched.email && errors.email && (
                  <p className="text-redAccent text-[13px] mt-[8px] font-medium flex items-center gap-[6px]">
                    <svg className="w-[14px] h-[14px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="phone" className="block text-[14px] font-bold text-greenDark mb-[8px]">
                  Phone Number
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-[16px] flex items-center pointer-events-none border-r border-creamDark pr-[12px] py-[14px]">
                    <span className="text-textMid font-medium text-[16px]">+91</span>
                  </div>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    maxLength={10}
                    value={formData.phone}
                    onChange={handleChange}
                    onBlur={() => handleBlur('phone')}
                    className={`w-full pl-[72px] pr-[16px] py-[14px] bg-cream/50 rounded-[12px] border ${touched.phone && errors.phone ? 'border-redAccent focus:border-redAccent' : 'border-creamDark focus:border-greenDark'} focus:outline-none focus:ring-1 ${touched.phone && errors.phone ? 'focus:ring-redAccent' : 'focus:ring-greenDark'} transition-all text-[16px] text-textDark placeholder:text-textLight`}
                    placeholder="9876543210"
                  />
                </div>
                {touched.phone && errors.phone && (
                  <p className="text-redAccent text-[13px] mt-[8px] font-medium flex items-center gap-[6px]">
                    <svg className="w-[14px] h-[14px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                    {errors.phone}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="addressLine" className="block text-[14px] font-bold text-greenDark mb-[8px]">
                  Address Line (Street / House / Locality)
                </label>
                <input
                  type="text"
                  id="addressLine"
                  name="addressLine"
                  value={formData.addressLine}
                  onChange={handleChange}
                  onBlur={() => handleBlur('addressLine')}
                  className={`w-full px-[16px] py-[14px] bg-cream/50 rounded-[12px] border ${touched.addressLine && errors.addressLine ? 'border-redAccent focus:border-redAccent' : 'border-creamDark focus:border-greenDark'} focus:outline-none focus:ring-1 ${touched.addressLine && errors.addressLine ? 'focus:ring-redAccent' : 'focus:ring-greenDark'} transition-all text-[16px] text-textDark placeholder:text-textLight`}
                  placeholder="Flat No, Building, Street, Area"
                />
                {touched.addressLine && errors.addressLine && (
                  <p className="text-redAccent text-[13px] mt-[8px] font-medium flex items-center gap-[6px]">
                    <svg className="w-[14px] h-[14px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                    {errors.addressLine}
                  </p>
                )}
              </div>

              {/* City, State, Pincode responsive row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-[16px]">
                <div>
                  <label htmlFor="city" className="block text-[14px] font-bold text-greenDark mb-[8px]">
                    City
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    onBlur={() => handleBlur('city')}
                    className={`w-full px-[16px] py-[14px] bg-cream/50 rounded-[12px] border ${touched.city && errors.city ? 'border-redAccent focus:border-redAccent' : 'border-creamDark focus:border-greenDark'} focus:outline-none focus:ring-1 ${touched.city && errors.city ? 'focus:ring-redAccent' : 'focus:ring-greenDark'} transition-all text-[16px] text-textDark placeholder:text-textLight`}
                    placeholder="Mumbai"
                  />
                  {touched.city && errors.city && (
                    <p className="text-redAccent text-[13px] mt-[8px] font-medium flex items-center gap-[6px]">
                      <svg className="w-[14px] h-[14px] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                      {errors.city}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="state" className="block text-[14px] font-bold text-greenDark mb-[8px]">
                    State / UT
                  </label>
                  <select
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    onBlur={() => handleBlur('state')}
                    className={`w-full px-[16px] py-[14px] bg-cream/50 rounded-[12px] border ${touched.state && errors.state ? 'border-redAccent focus:border-redAccent' : 'border-creamDark focus:border-greenDark'} focus:outline-none focus:ring-1 ${touched.state && errors.state ? 'focus:ring-redAccent' : 'focus:ring-greenDark'} transition-all text-[16px] ${formData.state ? 'text-textDark' : 'text-textLight'}`}
                  >
                    <option value="" disabled>Select State</option>
                    {INDIAN_STATES_AND_UTS.map((st) => (
                      <option key={st} value={st} className="text-textDark bg-white">
                        {st}
                      </option>
                    ))}
                  </select>
                  {touched.state && errors.state && (
                    <p className="text-redAccent text-[13px] mt-[8px] font-medium flex items-center gap-[6px]">
                      <svg className="w-[14px] h-[14px] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                      {errors.state}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="pincode" className="block text-[14px] font-bold text-greenDark mb-[8px]">
                    Pincode
                  </label>
                  <input
                    type="text"
                    id="pincode"
                    name="pincode"
                    maxLength={6}
                    value={formData.pincode}
                    onChange={handleChange}
                    onBlur={() => handleBlur('pincode')}
                    className={`w-full px-[16px] py-[14px] bg-cream/50 rounded-[12px] border ${touched.pincode && errors.pincode ? 'border-redAccent focus:border-redAccent' : 'border-creamDark focus:border-greenDark'} focus:outline-none focus:ring-1 ${touched.pincode && errors.pincode ? 'focus:ring-redAccent' : 'focus:ring-greenDark'} transition-all text-[16px] text-textDark placeholder:text-textLight`}
                    placeholder="400001"
                  />
                  {touched.pincode && errors.pincode && (
                    <p className="text-redAccent text-[13px] mt-[8px] font-medium flex items-center gap-[6px]">
                      <svg className="w-[14px] h-[14px] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                      {errors.pincode}
                    </p>
                  )}
                </div>
              </div>

              {apiError && (
                <div className="p-[14px] bg-redAccent/10 border border-redAccent/30 rounded-[12px] text-redAccent text-[14px] font-medium flex items-center gap-[8px]">
                  <svg className="w-[18px] h-[18px] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                  <span>{apiError}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting || (!isFormValid() && (touched.name || touched.email || touched.phone || touched.addressLine || touched.city || touched.state || touched.pincode))}
                className="w-full bg-gradient-to-b from-greenDark to-[#1E3821] text-white shadow-sm transition-all duration-200 ease-out hover:scale-[1.03] hover:shadow-order-btn-hover active:scale-95 py-[16px] px-[24px] rounded-full text-[18px] font-bold disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-sm disabled:active:scale-100 mt-[8px] flex items-center justify-center gap-[8px]"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-[20px] w-[20px] text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Creating Order...</span>
                  </>
                ) : (
                  'Proceed to Payment'
                )}
              </button>
            </form>
          </div>

          {/* Right Column: Summary */}
          <div className="w-full md:w-[40%] md:sticky md:top-[100px]">
            <div className="bg-white rounded-card p-[24px] md:p-[32px] shadow-card border border-creamDark">
              <h2 className="font-cormorant text-[24px] font-bold text-greenDark mb-[20px] pb-[16px] border-b border-creamDark">
                Order Summary
              </h2>
              
              <div className="space-y-[16px] max-h-[400px] overflow-y-auto pr-2">
                {items.map((item) => {
                  const product = item.product;
                  if (!product) return null;

                  const unitPrice = parsePrice(product.priceCurrent);
                  const subtotal = unitPrice * item.quantity;

                  return (
                    <div key={item.productId} className="flex items-center gap-[14px] p-[12px] rounded-[16px] border border-cream hover:border-creamDark transition-colors bg-cream/30">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-[64px] h-[64px] object-cover rounded-[12px] bg-white shrink-0 shadow-sm"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-cormorant font-bold text-[18px] text-greenDark truncate leading-[1.2]">
                          {product.name}
                        </h4>
                        <p className="text-[13px] text-textMid mt-[4px]">
                          Qty: {item.quantity} × {product.priceCurrent}
                        </p>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="text-[16px] font-bold text-greenDark">
                          ₹{subtotal}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-[24px] pt-[24px] border-t border-creamDark space-y-[16px]">
                <div className="flex justify-between items-center text-[15px] text-textMid">
                  <span>Subtotal</span>
                  <span className="font-semibold text-textDark">₹{totalPrice}</span>
                </div>
                <div className="flex justify-between items-center text-[15px] text-textMid">
                  <span>Shipping</span>
                  <span className="text-whatsapp font-bold">Free</span>
                </div>
                
                <div className="pt-[20px] mt-[8px] border-t border-creamDark flex justify-between items-end">
                  <div>
                    <p className="text-[20px] font-bold text-greenDark">Total</p>
                    <p className="text-[13px] text-textMid">Including GST</p>
                  </div>
                  <span className="font-cormorant text-[36px] font-bold text-greenDark leading-none">
                    ₹{totalPrice}
                  </span>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
      </div>
    </div>
  );
}
