import React from "react";
import AuthLayout from "../../../../Components/Layout/AuthLayout";
import RegisterForm from "../Components/RegisterForm";
import useStateRegister from "../Hooks/useStateRegister";

export default function Register() {
  const {
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    errors,
    isLoading,
    formError,
    handleRegister
  } = useStateRegister();

  return (
    <AuthLayout 
      title="Create an account" 
      subtitle="Get started with your free account today"
    >
      <RegisterForm
        name={name}
        setName={setName}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        confirmPassword={confirmPassword}
        setConfirmPassword={setConfirmPassword}
        errors={errors}
        isLoading={isLoading}
        formError={formError}
        handleRegister={handleRegister}
      />

      {/* Show password strength meter when user starts typing a password */}
      {password && <PasswordStrengthMeter password={password} />}
    </AuthLayout>
  );
}