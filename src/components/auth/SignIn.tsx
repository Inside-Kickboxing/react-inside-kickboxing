import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { signInWithEmail } from '../../api/auth/supabaseAuth';
import { z } from 'zod';

const signInSchema = z.object({
  email: z.string().email('Invalid email address.'),
  password: z.string(),
});
type FormFields = z.infer<typeof signInSchema>;

const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>();

  const [signInError, setSignInError] = useState<string | null>(null);

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      // Call signIn function to authenticate user
      await signInWithEmail(data.email, data.password);

      // Redirect or handle successful sign-in based on your application flow
      console.log('Signed in successfully');
    } catch (error: any) {
      console.error('Error signing in:', error.message);
      setSignInError(error.message);
    }
  };

  return (
    <div>
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Email</label>
          <input type="text" {...register('email')} />
          {errors.email && <span>{errors.email.message}</span>}
        </div>
        <div>
          <label>Password</label>
          <input type="password" {...register('password')} />
          {errors.password && <span>{errors.password.message}</span>}
        </div>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Signing In...' : 'Sign In'}
        </button>
        {signInError && <div>{signInError}</div>}
      </form>
    </div>
  );
};

export default SignIn;
