import { cookies } from 'next/headers';
import React from 'react';

const SignedIn = ({ children }: { children: React.ReactNode}) => {
  const cookieStore = cookies();
  const tokenObj = cookieStore.get("Authorization");

  if (!tokenObj) {
    return null;
  }
  return <>{children}</>;
};

export default SignedIn;