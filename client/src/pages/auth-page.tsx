import { useState } from "react";
import { Redirect } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, PlaneTakeoff, Mail, Lock, User as UserIcon } from "lucide-react";

import { loginSchema, registerSchema, type LoginRequest, type RegisterRequest } from "@shared/schema";
import { useLogin, useRegister, useUser } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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

  if (isLoading) return (
    <div className="h-screen flex items-center justify-center bg-background">
      <Spinner size="xl" />
    </div>
  );
  if (user) return <Redirect to="/dashboard" />;

  const onLoginSubmit = (data: LoginRequest) => login.mutate(data);
  const onRegisterSubmit = (data: RegisterRequest) => register.mutate(data);

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-background">

      {/* Left Panel */}
      <div className="hidden md:flex w-1/2 card-gradient relative overflow-hidden flex-col justify-center items-center text-white p-12">
        <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#020d1a] to-transparent" />

        <div className="relative z-10 max-w-md space-y-6">
          <div className="p-4 bg-white/5 inline-block rounded-2xl backdrop-blur-sm border border-white/10 shadow-2xl">
            <PlaneTakeoff className="w-14 h-14 text-blue-400" />
          </div>
          <div>
            <p className="text-blue-400 text-[10px] uppercase tracking-widest font-black border-l-4 border-blue-500 pl-3 mb-3 italic">
              Força Aérea Brasileira
            </p>
            <h1 className="text-5xl font-black italic tracking-tight leading-none mb-2">
              EAGS <span className="text-blue-400">SIN</span>
            </h1>
            <h2 className="text-2xl font-black italic tracking-tight text-white/70">MISSÃO APROVAÇÃO</h2>
          </div>
          <p className="text-white/60 font-semibold text-sm leading-relaxed">
            Sistema avançado de preparação para os conhecimentos especializados aeronáuticos. Estabeleça suas credenciais para iniciar o treinamento.
          </p>
          <div className="pt-4 flex items-center gap-4">
            <div className="flex -space-x-3">
              {[1, 2, 3].map(i => (
                <div key={i} className="w-9 h-9 rounded-full bg-blue-900 border-2 border-blue-500/30 flex items-center justify-center">
                  <Shield className="w-4 h-4 text-blue-400" />
                </div>
              ))}
            </div>
            <span className="text-[10px] font-black tracking-widest text-white/50 uppercase">JUNTE-SE AOS OPERADORES DE ELITE</span>
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-12 bg-background relative">
        <div className="absolute inset-0 bg-grid-pattern opacity-50 pointer-events-none" />

        <div className="relative z-10 w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="mx-auto w-14 h-14 bg-blue-600/20 rounded-2xl flex items-center justify-center mb-4 border border-blue-500/30 shadow-xl shadow-blue-900/30">
              <Shield className="w-7 h-7 text-blue-400" />
            </div>
            <h2 className="text-2xl font-black italic tracking-tight text-foreground uppercase">
              {isLogin ? "AUTENTICAR CREDENCIAIS" : "INICIAR ALISTAMENTO"}
            </h2>
            <p className="text-muted-foreground text-sm font-semibold mt-1">
              {isLogin ? "Insira seus códigos de acesso para entrar" : "Forneça os detalhes para o novo registro"}
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-card border border-border rounded-2xl shadow-2xl overflow-hidden">
            <div className="h-1 w-full bg-gradient-to-r from-blue-600 via-blue-400 to-blue-600" />
            <div className="p-8">
              <AnimatePresence mode="wait">
                {isLogin ? (
                  <motion.form
                    key="login"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.2 }}
                    onSubmit={loginForm.handleSubmit(onLoginSubmit)}
                    className="space-y-5"
                  >
                    <div className="space-y-2">
                      <Label className="text-[10px] uppercase font-black tracking-widest text-muted-foreground">ID de Comunicação</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          type="email"
                          placeholder="operador@aero.mil"
                          className="pl-10 h-11 bg-background border-border font-medium"
                          {...loginForm.register("email")}
                        />
                      </div>
                      {loginForm.formState.errors.email && (
                        <p className="text-xs text-destructive font-bold">{loginForm.formState.errors.email.message}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[10px] uppercase font-black tracking-widest text-muted-foreground">Código de Acesso</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          type="password"
                          className="pl-10 h-11 bg-background border-border font-medium"
                          {...loginForm.register("password")}
                        />
                      </div>
                    </div>
                    <Button type="submit" className="w-full h-12 font-black tracking-widest mt-2 bg-blue-600 hover:bg-blue-500 text-white border-0 text-xs uppercase shadow-lg shadow-blue-900/50" disabled={login.isPending}>
                      {login.isPending ? <Spinner size="sm" className="mr-2" /> : null}
                      AUTORIZAR ACESSO
                    </Button>
                  </motion.form>
                ) : (
                  <motion.form
                    key="register"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                    onSubmit={registerForm.handleSubmit(onRegisterSubmit)}
                    className="space-y-5"
                  >
                    <div className="space-y-2">
                      <Label className="text-[10px] uppercase font-black tracking-widest text-muted-foreground">Designação (Nome)</Label>
                      <div className="relative">
                        <UserIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="João Silva"
                          className="pl-10 h-11 bg-background border-border font-medium"
                          {...registerForm.register("name")}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[10px] uppercase font-black tracking-widest text-muted-foreground">ID de Comunicação</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          type="email"
                          placeholder="operador@aero.mil"
                          className="pl-10 h-11 bg-background border-border font-medium"
                          {...registerForm.register("email")}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[10px] uppercase font-black tracking-widest text-muted-foreground">Código de Acesso</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          type="password"
                          className="pl-10 h-11 bg-background border-border font-medium"
                          {...registerForm.register("password")}
                        />
                      </div>
                    </div>
                    <Button type="submit" className="w-full h-12 font-black tracking-widest mt-2 bg-blue-600 hover:bg-blue-500 text-white border-0 text-xs uppercase shadow-lg shadow-blue-900/50" disabled={register.isPending}>
                      {register.isPending ? <Spinner size="sm" className="mr-2" /> : null}
                      ENVIAR ALISTAMENTO
                    </Button>
                  </motion.form>
                )}
              </AnimatePresence>

              <div className="mt-6 pt-6 border-t border-border text-center">
                <button
                  className="text-xs font-bold text-muted-foreground hover:text-blue-400 transition-colors uppercase tracking-widest"
                  onClick={() => setIsLogin(!isLogin)}
                >
                  {isLogin ? "Precisa de autorização? → Solicite alistamento." : "Já possui autorização? → Autentique-se aqui."}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
