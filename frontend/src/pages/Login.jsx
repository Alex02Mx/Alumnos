import { useNavigate } from "react-router-dom"; //

import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Login() {

  const navigate = useNavigate(); //

  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async e => {
    e.preventDefault();
    await login({ email, password });

    navigate("/dashboard"); //
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <input
          placeholder="email"
          type="email" 
          value={email} 
          onChange={e=>setEmail(e.target.value)} 
      />

      <input
          placeholder="password" 
          type="password" 
          value={password} 
          onChange={e=>setPassword(e.target.value)} 
      />

      <button>Login</button>
    </form>
  );
}