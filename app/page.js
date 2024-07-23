import Authform from "./components/AuthForm";

export default function Home() {
  return (
    <main className="flex items-center justify-center bg-gray-900 h-screen">
      <div className="bg-gray-700 rounded-lg shadow-lg p-7  max-w-lg">
        <h2 className="text-white text-2xl text-center mb-4 font-bold">Welcome to photo store</h2>
        <p className="text-lg mb-6 text-center">Sign in to upload and save your favorite photos.</p>
        <Authform/>
      </div>
    </main>
  );
}
