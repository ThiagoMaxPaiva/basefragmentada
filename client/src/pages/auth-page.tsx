import { useState } from "react";
import { useLocation, Redirect } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, PlaneTakeoff, Mail, Lock, User as UserIcon } from "lucide-react";

import { loginSchema, registerSchema, type LoginRequest, type RegisterRequest } from "@shared/schema";
import { useLogin, useRegister, useUser } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const { data: user, isLoading } = useUser();
  const login = useLogin();
  const register = useRegister();

  const loginForm = useForm<LoginRequest>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const registerForm = useForm<RegisterRequest>({
    resolver: zodResolver(registerSchema),
    defaultValues: { email: "", password: "", name: "" },
  });

  if (isLoading) return <div className="h-screen flex items-center justify-center"><Spinner size="xl" /></div>;
  if (user) return <Redirect to="/dashboard" />;

  const onLoginSubmit = (data: LoginRequest) => login.mutate(data);
  const onRegisterSubmit = (data: RegisterRequest) => register.mutate(data);

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-background">
      {/* Visual Side */}
      <div className="hidden md:flex w-1/2 bg-primary relative overflow-hidden flex-col justify-center items-center text-primary-foreground p-12">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1544829728-e5cb9eedc20e?w=1920&q=80')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/80 to-transparent"></div>
        
        <div className="relative z-10 max-w-md space-y-6">
          <div className="p-4 bg-primary-foreground/10 inline-block rounded-2xl backdrop-blur-sm border border-primary-foreground/20 shadow-2xl">
            <PlaneTakeoff className="w-16 h-16 text-accent" />
          </div>
          <h1 className="text-5xl font-display font-bold leading-tight">AERO TÁTICO <br/><span className="text-accent">COMANDO</span></h1>
          <p className="text-lg text-primary-foreground/80 font-medium">
            Sistema avançado de preparação para conhecimentos especializados aeronáuticos e avaliação estratégica. Estabeleça suas credenciais para iniciar o treinamento.
          </p>
          <div className="pt-8 flex items-center gap-4">
            <div className="flex -space-x-4">
              {[1,2,3].map(i => (
                <div key={i} className="w-10 h-10 rounded-full bg-secondary border-2 border-primary flex items-center justify-center">
                  <Shield className="w-5 h-5 text-accent" />
                </div>
              ))}
            </div>
            <span className="text-sm font-semibold tracking-wider text-primary-foreground/70">JUNTE-SE AOS OPERADORES DE ELITE</span>
          </div>
        </div>
      </div>

      {/* Form Side */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-12 relative bg-grid-pattern">
        <Card className="w-full max-w-md border-border/50 shadow-2xl bg-card/90 backdrop-blur-xl">
          <CardHeader className="space-y-2 text-center pb-6">
            <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4 text-primary">
              <Shield className="w-6 h-6" />
            </div>
            <CardTitle className="text-2xl font-display font-bold text-foreground">
              {isLogin ? "AUTENTICAR CREDENCIAIS" : "INICIAR ALISTAMENTO"}
            </CardTitle>
            <CardDescription className="font-medium text-muted-foreground">
              {isLogin ? "Insira seus códigos de acesso para entrar no sistema" : "Forneça os detalhes pessoais para o novo registro"}
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <AnimatePresence mode="wait">
              {isLogin ? (
                <motion.div
                  key="login"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.2 }}
                >
                  <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="login-email">ID de Comunicação</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input 
                          id="login-email" 
                          type="email" 
                          placeholder="operador@aero.mil" 
                          className="pl-10 h-11"
                          {...loginForm.register("email")}
                        />
                      </div>
                      {loginForm.formState.errors.email && (
                        <p className="text-xs text-destructive font-medium">{loginForm.formState.errors.email.message}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="login-password">Código de Acesso</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input 
                          id="login-password" 
                          type="password" 
                          className="pl-10 h-11"
                          {...loginForm.register("password")}
                        />
                      </div>
                    </div>
                    <Button type="submit" className="w-full h-11 font-bold tracking-wider mt-6" disabled={login.isPending}>
                      {login.isPending ? <Spinner size="sm" className="mr-2" /> : null}
                      AUTORIZAR ACESSO
                    </Button>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  key="register"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="reg-name">Designação (Nome)</Label>
                      <div className="relative">
                        <UserIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input 
                          id="reg-name" 
                          placeholder="João Silva" 
                          className="pl-10 h-11"
                          {...registerForm.register("name")}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="reg-email">ID de Comunicação</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input 
                          id="reg-email" 
                          type="email" 
                          placeholder="operador@aero.mil" 
                          className="pl-10 h-11"
                          {...registerForm.register("email")}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="reg-password">Código de Acesso</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input 
                          id="reg-password" 
                          type="password" 
                          className="pl-10 h-11"
                          {...registerForm.register("password")}
                        />
                      </div>
                    </div>
                    <Button type="submit" variant="secondary" className="w-full h-11 font-bold tracking-wider mt-6" disabled={register.isPending}>
                      {register.isPending ? <Spinner size="sm" className="mr-2" /> : null}
                      ENVIAR ALISTAMENTO
                    </Button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
          <CardFooter className="flex justify-center border-t border-border/50 pt-6">
            <Button 
              variant="ghost" 
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? "Precisa de autorização? Solicite alistamento." : "Já possui autorização? Autentique-se aqui."}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
