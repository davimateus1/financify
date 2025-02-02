import Image from "next/image";
import { Loader2 } from "lucide-react";
import { ClerkLoaded, ClerkLoading, SignUp } from "@clerk/nextjs";

const SignUpPage = () => {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 p-4 lg:p-0">
      <div className="h-full lg:flex flex-col items-center justify-center px-4">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center lg:hidden">
            <Image
              src="/logo.svg"
              alt="financify-logo"
              width={150}
              height={150}
            />
          </div>
          <h1 className="font-bold text-3xl text-[#2E2A47]">Bem vindo(a)!</h1>
          <p className="text-base text-[#7E8CA0]">
            Cadastre-se para começar a usar o Financify e gerenciar suas
            finanças!
          </p>
        </div>
        <div className="flex items-center justify-center mt-8">
          <ClerkLoaded>
            <SignUp
              path="/sign-up"
              appearance={{ elements: { header: { display: "none" } } }}
            />
          </ClerkLoaded>
          <ClerkLoading>
            <Loader2 className="animate-spin text-muted-foreground" />
          </ClerkLoading>
        </div>
      </div>
      <div className="h-full bg-blue-700 hidden lg:flex items-center justify-center">
        <Image src="/logo.svg" alt="financify-logo" width={250} height={250} />
      </div>
    </div>
  );
};

export default SignUpPage;
