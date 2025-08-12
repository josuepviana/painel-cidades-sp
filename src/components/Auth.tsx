"use client";
import { supabase } from "@/lib/supabaseClient";
import { useState } from "react";
import { useRouter } from 'next/navigation';


export default function Auth() {
    const router = useRouter();
    const [email, setEmail] = useState("");
  
    const handleLogin = async () => {
        /*const { error } = await supabase.auth.signInWithOtp({ email });
        if (error) {
            console.error("Erro ao enviar magic link:", error.message);
        } else {
            alert("Verifique seu e-mail para o link de login.");
        }*/
        router.push('/dashboard');

    };
  
    return (
      <div>
        <input
          type="email"
          placeholder="Qualquer coisa vale"
          //placeholder="Digite seu e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border px-2 py-1 mr-2"
        />
        <button
          onClick={handleLogin}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Entrar
        </button>
      </div>
    );
  }