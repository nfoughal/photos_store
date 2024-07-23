'use client'

import { useRouter } from "next/navigation";
import { supabase } from "../utils/supabaseClient"
import { useState } from "react";

const Authform = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isSigningIn, setIsSigningIn] = useState(false);
    const [isSigningUp, setIsSigningUp] = useState(false);
    const [isNewUser, setIsNewUser] = useState(false);
    const router = useRouter();

    async function handleSignIn(e) {

        e.preventDefault();
        setIsSigningIn(true);
        const{error, data} = await supabase.auth.signInWithPassword({email, password});
        console.log({data, error});

        if (!error)
            router.push("/photos");
        else
            setIsSigningIn(false);
    };

    async function handleSignUp(e) {
        e.preventDefault();
        console.log("okokokokok")
        const{error, data} = await supabase.auth.signUp({email, password});
        if (!error)
            setIsSigningUp(true);
        console.log({data, error});
    };
     let signMessage = "Sign In";

    if(isSigningIn)
        signMessage = "Signing in";
    else if (isNewUser)
        signMessage = "Sign Up"
    console.log("newwwwww", isNewUser)
    const signUpMessage = <p className="text-center text-white">Email sent! Check your email to confirm sign up.</p>
    return (
        <form onSubmit={isNewUser ? handleSignUp : handleSignIn} className="space-y-8">
            <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email"
            className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
            <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
            className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 w-full">
                {signMessage}
            </button>
            <p className="text-center text-white">
                {isNewUser ? (
                    <>
                        Already have an account? {' '}
                        <button
                        type="button "
                        onClick={() => setIsNewUser(false) }
                        className="text-indigo-400 hover:text-indigo-600"
                        >
                            Sign in
                        </button>
                    </>

                ):(
                    <>
                        Don't have an account? {' '}
                        <button
                        type="button "
                        onClick={() => setIsNewUser(true) }
                        className="text-indigo-400 hover:text-indigo-600"
                        >
                            Sign up
                        </button>
                    </>
                )}
            </p>
            {        console.log(isSigningUp)
            }
        {isSigningUp && signUpMessage}
        </form>
    )
    
}

export default Authform;