import { useForm, SubmitHandler } from 'react-hook-form';
import { ZodError, z } from 'zod';
import { signUp, checkDisplayNameUnique } from '../../api/auth/supabaseAuth'; // Importing the signUp function from supabaseAuth
import { NavLink } from 'react-router-dom';
import { useState } from 'react';

const signUpSchema = z.object({
  displayName: z
    .string()
    .refine((value) => value.length <= 36, {
      message: 'Display name must be 36 characters or less.',
    })
    .refine((value) => /^[a-zA-Z0-9_-]+$/.test(value), {
      message:
        'Invalid character in display name. Only uppercase/lowercase letters, numbers, underscores and hyphens are allowed.',
    }),
  email: z.string().email('Invalid email address.'),
  password: z.string().min(8, 'Password must be at least 8 characters.'),
});
type FormFields = z.infer<typeof signUpSchema>;

const SignUp = () => {
  const [isAccountCreated, setIsAccountCreated] = useState(false);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    resolver: async (data) => {
      try {
        signUpSchema.parse(data);
        return { values: data, errors: {} };
      } catch (error) {
        if (error instanceof ZodError) {
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
      const isDisplayNameUnique = await checkDisplayNameUnique(data.displayName);

      if (!isDisplayNameUnique) {
        setError('displayName', {
          type: 'manual',
          message: 'Display name is not unique.',
        });
        return;
      }

      // Call signUp function to create account
      const userData = await signUp(data.email, data.password, data.displayName);

      // Check for successful account creation
      if (userData) {
        setIsAccountCreated(true);
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

  if (isAccountCreated) {
    return (
      <div>
        <h2>Account Created</h2>
        <p>Your account has been created successfully. Please verify your email before continuing..</p>
        <NavLink to="/sign-in" end className="">
          Go to Sign In
        </NavLink>
      </div>
    );
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input type="text" placeholder="Username" {...register('displayName')} />
          {errors.displayName && <span>{errors.displayName.message}</span>}
        </div>
        <div>
          <input type="text" placeholder="Email" {...register('email')} />
          {errors.email && <span>{errors.email.message}</span>}
        </div>
        <div>
          <input type="password" placeholder="Password" {...register('password')} />
          {errors.password && <span>{errors.password.message}</span>}
        </div>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Sign Up'}
        </button>
      </form>
    </div>
  );
};

export default SignUp;
