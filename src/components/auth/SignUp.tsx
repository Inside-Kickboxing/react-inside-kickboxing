import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { ZodError, z } from 'zod';
import { signUp } from '../../api/auth/supabaseAuth'; // Importing the signUp function from supabaseAuth
import { NavLink } from 'react-router-dom';

const signupSchema = z.object({
  email: z.string().email('Invalid email address.'),
  password: z.string().min(8, 'Password must be at least 8 characters.'),
});
type FormFields = z.infer<typeof signupSchema>;

const SignUp = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    resolver: async (data) => {
      try {
        // Validate form data using Zod
        signupSchema.parse(data);
        return { values: data, errors: {} };
      } catch (error) {
        if (error instanceof ZodError) {
          // Convert Zod errors to match react-hook-form's error structure
          const formErrors: Record<string, { message: string }> = Object.fromEntries(
            error.errors.map((err) => [err.path.join('.'), { message: err.message }]),
          );
          return { values: {}, errors: formErrors };
        } else {
          console.error((error as Error).message);
          return { values: {}, errors: {} };
        }
      }
    },
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      // Call signUp function to create account
      const userData = await signUp(data.email, data.password);

      // Check for successful account creation
      if (userData) {
        // Create a session for the user (you can handle this part based on your application flow)
        console.log('Account created successfully:', userData);
      }
    } catch (error: any) {
      console.error((error as Error).message);

      if (error.response && error.response.status === 409) {
        setError('email', {
          type: 'manual',
          message: 'An account with this email address already exists. Please sign in instead',
        });
      }
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
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
          {isSubmitting ? 'Submitting...' : 'Sign Up'}
        </button>
      </form>
      <NavLink to="/sign-in" end className="">
        Back to Sign In
      </NavLink>
    </div>
  );
};

export default SignUp;
