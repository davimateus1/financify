import Image from "next/image";
import { Loader2 } from "lucide-react";
import { SignIn, ClerkLoaded, ClerkLoading } from "@clerk/nextjs";

const SignInPage = () => {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      <div className="h-full lg:flex flex-col items-center justify-center px-4">
        <div className="text-center space-y-4 pt-16">
          <h1 className="font-bold text-3xl text-[#2E2A47]">
            Bem vindo de volta!
          </h1>
          <p className="text-base text-[#7E8CA0]">
            Faça o login ou crie uma conta para começar a usar o Financify e
            gerenciar suas finanças!
          </p>
        </div>
        <div className="flex items-center justify-center mt-8">
          <ClerkLoaded>
            <SignIn
              path="/sign-in"
              appearance={{ elements: { header: { display: "none" } } }}
            />
          </ClerkLoaded>
          <ClerkLoading>
            <Loader2 className="animate-spin text-muted-foreground" />
          </ClerkLoading>
        </div>
      </div>
      <div className="h-full bg-blue-700 hidden lg:flex items-center justify-center">
        <Image src="/logo.svg" alt="financify-logo" width={200} height={250} />
      </div>
    </div>
  );
};

export default SignInPage;
