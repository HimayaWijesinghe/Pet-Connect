import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const cardSchema = z.object({
  cardName: z.string().min(1, 'Cardholder name is required'),
  cardNumber: z.string().regex(/^\d{16}$/, 'Invalid card number'),
  cardExpiry: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Invalid expiry date'),
  cardCvc: z.string().regex(/^\d{3}$/, 'Invalid CVC').max(3),
});

const addressSchema = z.object({
  email: z.string().email('Invalid email address'),
  street: z.string().min(1, 'Street is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  zip: z.string().min(1, 'ZIP code is required'),
  country: z.string().min(1, 'Country is required'),
});

const confirmSchema = z.object({
  message: z.string().optional(),
});

const formSchema = cardSchema.merge(addressSchema).merge(confirmSchema);

export default function PaymentForm({ email, amount, onSubmit }) {
  const [step, setStep] = useState(0);
  const { register, handleSubmit, formState, trigger, setValue } = useForm({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    setValue('amount', amount);
  }, [amount, setValue]);

  const handleNext = async () => {
    const fields = step === 0 ? ['cardName', 'cardNumber', 'cardExpiry', 'cardCvc'] :
                 step === 1 ? ['email', 'street', 'city', 'state', 'zip', 'country'] :
                 [];
    
    const isValid = await trigger(fields);
    if (isValid) setStep(step + 1);
  };

  return (
      <div className="w-full p-8">
        <ProgressBar step={step} />
        
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
          {step === 0 && <CardDetails register={register} errors={formState.errors} setValue={setValue} />}
          {step === 1 && <BillingAddress register={register} email={email} errors={formState.errors} />}
          {step === 2 && <Confirmation register={register} errors={formState.errors} amount={amount} />}

          <div className="flex justify-between">
            {step > 0 && (
              <motion.button
                type="button"
                onClick={() => setStep(step - 1)}
                className="px-6 py-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                whileHover={{ scale: 1.05 }}
              >
                Back
              </motion.button>
            )}
            {
                step < 2 && (
                    <motion.button
                        type='button'
                        onClick={handleNext}
                        className="ml-auto px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        whileHover={{ scale: 1.05 }}
                        >
                        Next
                    </motion.button>
                )
            }
            {
                step === 2 && (
                // Update the Confirm & Pay button
                <motion.button
                  type='submit'
                  className="ml-auto px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
                  whileHover={{ scale: 1.05 }}
                  disabled={formState.isSubmitting}
                >
                  {formState.isSubmitting ? 'Processing...' : 'Confirm & Pay'}
                </motion.button>
                )
            }
            
          </div>
        </form>
      </div>
  );
}

const ProgressBar = ({ step }) => (
  <div className="h-2 bg-blue-100 rounded-full">
    <motion.div
      className="h-2 bg-blue-600 rounded-full"
      initial={{ width: 0 }}
      animate={{ width: `${(step + 1) * 33.33}%` }}
      transition={{ duration: 0.3 }}
    />
  </div>
);

const CardDetails = ({ register, errors, setValue }) => {
  const formatCardNumber = (value) => {
    return value.replace(/\D/g, '')
      .slice(0, 16)
      .replace(/(\d{4})(?=\d)/g, '$1 ');
  };

  const handleExpiryChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 2) {
      value = value.slice(0, 2) + '/' + value.slice(2, 4);
    }
    e.target.value = value.slice(0, 5);
    setValue('cardExpiry', value);
  };

  return (
    <motion.div
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -100, opacity: 0 }}
      className="space-y-4"
    >
      <h2 className="text-2xl font-semibold text-blue-900">Card Details</h2>
      <div>
        <input
          {...register('cardName')}
          placeholder="Cardholder Name"
          className="w-full p-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500"
        />
        {errors.cardName && <Error message={errors.cardName.message} />}
      </div>
      <div>
        <input
          {...register('cardNumber')}
          placeholder="0000 0000 0000 0000"
          className="w-full p-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500"
          onChange={(e) => {
            const formatted = formatCardNumber(e.target.value);
            e.target.value = formatted;
            setValue('cardNumber', formatted.replace(/ /g, ''));
          }}
        />
        {errors.cardNumber && <Error message={errors.cardNumber.message} />}
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <input
            {...register('cardExpiry')}
            placeholder="MM/YY"
            className="w-full p-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500"
            onChange={handleExpiryChange}
            maxLength={5}
          />
          {errors.cardExpiry && <Error message={errors.cardExpiry.message} />}
        </div>
        <div>
          <input
            {...register('cardCvc')}
            placeholder="CVC"
            className="w-full p-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500"
            maxLength={3}
          />
          {errors.cardCvc && <Error message={errors.cardCvc.message} />}
        </div>
      </div>
    </motion.div>
  );
};

const BillingAddress = ({ email, register, errors }) => (
  <motion.div
    initial={{ x: 100, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    exit={{ x: -100, opacity: 0 }}
    className="space-y-4"
  >
    <h2 className="text-2xl font-semibold text-blue-900">Billing Address</h2>
    <div>
      <input
        {...register('email')}
        type="email"
        placeholder="Email for e-bill"
        className="w-full p-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500"
        value={email}
        disabled
      />
      {errors.email && <Error message={errors.email.message} />}
    </div>
    <div>
      <input
        {...register('street')}
        placeholder="Street Address"
        className="w-full p-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500"
      />
      {errors.street && <Error message={errors.street.message} />}
    </div>
    <div className="grid grid-cols-2 gap-4">
      <div>
        <input
          {...register('city')}
          placeholder="City"
          className="w-full p-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500"
        />
        {errors.city && <Error message={errors.city.message} />}
      </div>
      <div>
        <input
          {...register('state')}
          placeholder="State"
          className="w-full p-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500"
        />
        {errors.state && <Error message={errors.state.message} />}
      </div>
    </div>
    <div className="grid grid-cols-2 gap-4">
      <div>
        <input
          {...register('zip')}
          placeholder="ZIP Code"
          className="w-full p-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500"
        />
        {errors.zip && <Error message={errors.zip.message} />}
      </div>
      <div>
        <input
          {...register('country')}
          placeholder="Country"
          className="w-full p-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500"
        />
        {errors.country && <Error message={errors.country.message} />}
      </div>
    </div>
  </motion.div>
);

const Confirmation = ({ register, errors, amount }) => (
  <motion.div
    initial={{ x: 100, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    exit={{ x: -100, opacity: 0 }}
    className="space-y-4"
  >
    <h2 className="text-2xl font-semibold text-blue-900">Confirmation</h2>
    <div className="p-4 bg-blue-50 rounded-lg">
      <p className="text-lg font-medium text-blue-900">Amount: {Number(amount).toFixed(2)} LKR</p>
    </div>
    <div>
      <textarea
        {...register('message')}
        placeholder="Message (optional)"
        className="w-full p-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500"
        rows="3"
      />
    </div>
  </motion.div>
);

const Error = ({ message }) => (
  <motion.p
    initial={{ y: -5, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    className="mt-1 text-sm text-red-600"
  >
    {message}
  </motion.p>
);