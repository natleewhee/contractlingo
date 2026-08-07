import { LoginForm } from "./LoginForm";

export default function LoginPage() {
  return (
    <div className="flex flex-1 justify-center px-4 py-6">
      <main className="flex w-full max-w-xs flex-1 flex-col items-center justify-center text-center">
        <h1 className="text-lg font-extrabold">ContractLingo</h1>
        <p className="mt-1 text-sm text-ink-soft">Enter the passphrase to continue</p>
        <div className="mt-4 w-full">
          <LoginForm />
        </div>
      </main>
    </div>
  );
}
