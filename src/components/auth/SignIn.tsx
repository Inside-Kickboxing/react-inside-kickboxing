import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { signInWithEmail } from '../../api/auth/supabaseAuth';
import { z } from 'zod';
import { NavLink, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const signInSchema = z.object({
  email: z.string().email('Invalid email address.'),
  password: z.string(),
});
type FormFields = z.infer<typeof signInSchema>;

const SignIn = () => {
  const navigate = useNavigate();
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
      navigate('/');
    } catch (error: any) {
      console.error('Error signing in:', error.message);
      setSignInError(error.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input type="text" placeholder="Email" {...register('email')} />
          {errors.email && <span>{errors.email.message}</span>}
        </div>
        <div>
          <input type="password" placeholder="Password" {...register('password')} />
          {errors.password && <span>{errors.password.message}</span>}
        </div>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Signing In...' : 'Sign In'}
        </button>
        {signInError && <div>{signInError}</div>}
      </form>
      <span>Or</span> <br />
      <NavLink to="/sign-up" end className="">
        Sign up
      </NavLink>
    </div>
  );
};

export default SignIn;
