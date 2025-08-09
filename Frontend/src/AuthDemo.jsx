import { useState, useEffect } from "react";
import { signUp, signIn, getCurrentUser, signOut } from "./auth";

export default function AuthDemo(){ 
    const [email, setEmail] = useState("");
    const [pw, setPw] = useState("");
    const [name, setName] = useState("");
    const [user, setUser] = useState(null);

    useEffect( () => {
        getCurrentUser().then(setUser).catch(() => setUser(null));
    }, [] );

    return (
    <div style={{ maxWidth: 480, margin: "2rem auto", fontFamily: "system-ui" }}>
      <h2>{user ? `Hello, ${user.name}` : "Sign up / Log in"}</h2>

      {!user && (
        <>
          <input placeholder="Name" value={name} onChange={e=>setName(e.target.value)} />
          <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
          <input placeholder="Password" type="password" value={pw} onChange={e=>setPw(e.target.value)} />
          <div style={{ display:"flex", gap:8, marginTop:8 }}>
            <button onClick={async ()=>{
              await signUp({ email, password: pw, name });
              await signIn({ email, password: pw });
              setUser(await getCurrentUser());
            }}>Sign up</button>

            <button onClick={async ()=>{
              await signIn({ email, password: pw });
              setUser(await getCurrentUser());
            }}>Log in</button>
          </div>
        </>
      )}

      {user && (
        <button style={{ marginTop: 12 }} onClick={async ()=>{
          await signOut();
          setUser(null);
        }}>Log out</button>
      )}
    </div>
    )
}