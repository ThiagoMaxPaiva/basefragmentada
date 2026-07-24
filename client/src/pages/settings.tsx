import { AppLayout } from "@/components/layout/app-layout";
import { useThemeContext } from "@/components/theme-provider";
import { THEMES } from "@/lib/theme";
import { motion } from "framer-motion";
import { Palette, Check, UserIcon, Shield, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useUser, useUpdateProfile } from "@/hooks/use-auth";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Settings() {
  const { themeId, setTheme } = useThemeContext();
  const { toast } = useToast();
  const { data: user } = useUser();
  const updateProfile = useUpdateProfile();

  const [name, setName] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    if (user?.name) {
      setName(user.name);
    }
  }, [user]);

  function handleSelectTheme(id: typeof themeId) {
    setTheme(id);
    const theme = THEMES.find(t => t.id === id);
    toast({
      title: "Tema aplicado",
      description: `Tema "${theme?.name}" ativado com sucesso.`,
    });
  }

  function handleUpdateProfile(e: React.FormEvent) {
    e.preventDefault();
    if (newPassword && newPassword !== confirmPassword) {
      toast({
        title: "Senhas não conferem",
        description: "A nova senha e a confirmação devem ser iguais.",
        variant: "destructive"
      });
      return;
    }
    
    updateProfile.mutate({
      name: name !== user?.name ? name : undefined,
      currentPassword: currentPassword || undefined,
      newPassword: newPassword || undefined
    }, {
      onSuccess: () => {
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      }
    });
  }

  return (
    <AppLayout>
      <div className="max-w-3xl mx-auto pt-2 md:pt-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="space-y-6 pb-12"
        >
          {/* Page Header */}
          <div
            className="p-8 rounded-2xl text-white shadow-2xl relative overflow-hidden border border-border"
            style={{ background: "var(--card-gradient)" }}
          >
            <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />
            <div className="relative z-10">
              <p className="text-[11px] uppercase tracking-widest font-black mb-2 border-l-4 border-primary pl-3 italic opacity-70">
                Ajustes do Sistema
              </p>
              <div className="flex items-center gap-3 mb-2">
                <Palette className="w-7 h-7 text-primary" />
                <h1 className="text-3xl md:text-4xl font-black italic tracking-tight">CONFIGURAÇÕES</h1>
              </div>
              <p className="opacity-60 font-semibold text-sm">
                Personalize seu perfil e tema visual.
              </p>
            </div>
          </div>

          {/* Profile Form */}
          <div className="bg-card border border-border rounded-2xl shadow-xl overflow-hidden">
            <div className="h-1 w-full bg-primary" />
            <div className="p-6">
              <div className="flex items-center gap-2 mb-6">
                <UserIcon className="w-5 h-5 text-primary" />
                <h2 className="text-lg font-black uppercase tracking-tight text-foreground">DADOS PESSOAIS</h2>
              </div>
              
              <form onSubmit={handleUpdateProfile} className="space-y-4 max-w-xl">
                <div className="space-y-2">
                  <Label>Nome de Exibição</Label>
                  <Input 
                    value={name} 
                    onChange={e => setName(e.target.value)} 
                    placeholder="Seu nome"
                  />
                </div>
                
                <div className="p-4 border border-border rounded-lg bg-background/50 space-y-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="w-4 h-4 text-muted-foreground" />
                    <h3 className="text-sm font-bold uppercase text-muted-foreground">Alterar Senha</h3>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Senha Atual</Label>
                    <Input 
                      type="password" 
                      value={currentPassword} 
                      onChange={e => setCurrentPassword(e.target.value)} 
                      placeholder="Necessária apenas para alterar a senha"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Nova Senha</Label>
                      <Input 
                        type="password" 
                        value={newPassword} 
                        onChange={e => setNewPassword(e.target.value)} 
                        placeholder="Mínimo 6 caracteres"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Confirmar Nova Senha</Label>
                      <Input 
                        type="password" 
                        value={confirmPassword} 
                        onChange={e => setConfirmPassword(e.target.value)} 
                        placeholder="Repita a nova senha"
                      />
                    </div>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  disabled={updateProfile.isPending || (!newPassword && name === user?.name)}
                  className="w-full md:w-auto"
                >
                  {updateProfile.isPending ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                  SALVAR ALTERAÇÕES
                </Button>
              </form>
            </div>
          </div>

          {/* Theme Grid */}
          <div className="bg-card border border-border rounded-2xl shadow-xl overflow-hidden">
            <div className="h-1 w-full bg-gradient-to-r from-primary via-accent to-primary" />
            <div className="p-6">
              <div className="flex items-center gap-2 mb-6">
                <Palette className="w-5 h-5 text-primary" />
                <h2 className="text-lg font-black uppercase tracking-tight text-foreground">TEMA VISUAL</h2>
              </div>
              <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-5">
                Tema Ativo: <span className="text-foreground">{THEMES.find(t => t.id === themeId)?.name}</span>
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {THEMES.map((theme) => {
                  const isActive = theme.id === themeId;
                  return (
                    <motion.button
                      key={theme.id}
                      whileHover={{ scale: 1.015 }}
                      whileTap={{ scale: 0.985 }}
                      onClick={() => handleSelectTheme(theme.id)}
                      data-testid={`button-theme-${theme.id}`}
                      className={`relative text-left rounded-xl border-2 overflow-hidden transition-all duration-200 focus:outline-none ${
                        isActive
                          ? "border-primary shadow-lg shadow-primary/20"
                          : "border-border hover:border-muted-foreground/40"
                      }`}
                    >
                      {/* Gradient Preview Bar */}
                      <div
                        className="h-16 w-full"
                        style={{ background: theme.preview }}
                      />

                      {/* Info */}
                      <div className="p-4 bg-card flex items-start justify-between gap-3">
                        <div>
                          <div className="font-black text-sm uppercase tracking-wider text-foreground">
                            {theme.name}
                          </div>
                          <div className="text-[11px] text-muted-foreground font-semibold mt-0.5 leading-relaxed">
                            {theme.description}
                          </div>
                        </div>
                        {isActive && (
                          <div className="shrink-0 w-6 h-6 rounded-full bg-primary flex items-center justify-center shadow-md">
                            <Check className="w-3.5 h-3.5 text-primary-foreground" />
                          </div>
                        )}
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AppLayout>
  );
}
