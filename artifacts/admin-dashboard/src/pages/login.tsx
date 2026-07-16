import { useState } from "react";
import { useLocation } from "wouter";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Lock } from "lucide-react";

export default function Login() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [, setLocation] = useLocation();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "eveningsun001") {
      sessionStorage.setItem("es_admin_auth", "true");
      setLocation("/dashboard");
    } else {
      setError(true);
    }
  };

  return (
    <div className="min-h-[100dvh] w-full flex bg-background">
      <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-4">
              <img 
                src={new URL('@assets/file_00000000997471f4a6e796bb7e2cb183_1784205788721.png', import.meta.url).href} 
                alt="Evening Sun Logo" 
                className="w-16 h-16 object-contain"
              />
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-foreground">Cockpit Login</h2>
                <p className="text-sm text-muted-foreground">Evening Sun Operations Hub</p>
              </div>
            </div>

            <form onSubmit={handleLogin} className="space-y-6 mt-4">
              <div className="space-y-2">
                <Label htmlFor="password">Access Code</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input 
                    id="password" 
                    type="password" 
                    placeholder="Enter operations password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setError(false);
                    }}
                    className={`pl-10 h-11 ${error ? "border-destructive focus-visible:ring-destructive" : ""}`}
                    data-testid="input-password"
                  />
                </div>
                {error && <p className="text-sm text-destructive font-medium">Invalid access code. Please try again.</p>}
              </div>

              <Button type="submit" className="w-full h-11 font-semibold text-base" data-testid="button-login">
                Unlock Dashboard
              </Button>
            </form>
          </div>
        </div>
      </div>
      <div className="hidden lg:block relative w-0 flex-1 bg-primary/5 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-primary/5 to-background mix-blend-multiply" />
        <div className="absolute inset-0 flex items-center justify-center p-24">
           <img 
              src={new URL('@assets/file_00000000997471f4a6e796bb7e2cb183_1784205788721.png', import.meta.url).href} 
              alt="Evening Sun Logo Large" 
              className="max-w-full max-h-full object-contain opacity-20 drop-shadow-2xl scale-125"
            />
        </div>
      </div>
    </div>
  );
}
