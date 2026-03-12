import { AppLayout } from "@/components/layout/app-layout";
import { useThemeContext } from "@/components/theme-provider";
import { THEMES } from "@/lib/theme";
import { motion } from "framer-motion";
import { Palette, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Settings() {
  const { themeId, setTheme } = useThemeContext();
  const { toast } = useToast();

  function handleSelect(id: typeof themeId) {
    setTheme(id);
    const theme = THEMES.find(t => t.id === id);
    toast({
      title: "Tema aplicado",
      description: `Tema "${theme?.name}" ativado com sucesso.`,
    });
  }

  return (
    <AppLayout>
      <div className="max-w-3xl mx-auto pt-2 md:pt-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="space-y-6"
        >
          {/* Page Header */}
          <div
            className="p-8 rounded-2xl text-white shadow-2xl relative overflow-hidden border border-border"
            style={{ background: "var(--card-gradient)" }}
          >
            <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />
            <div className="relative z-10">
              <p className="text-[11px] uppercase tracking-widest font-black mb-2 border-l-4 border-primary pl-3 italic opacity-70">
                Personalização — EAGS SIN
              </p>
              <div className="flex items-center gap-3 mb-2">
                <Palette className="w-7 h-7 text-primary" />
                <h1 className="text-3xl md:text-4xl font-black italic tracking-tight">TEMAS VISUAIS</h1>
              </div>
              <p className="opacity-60 font-semibold text-sm">
                Selecione o tema que melhor se adequa à sua missão.
              </p>
            </div>
          </div>

          {/* Theme Grid */}
          <div className="bg-card border border-border rounded-2xl shadow-xl overflow-hidden">
            <div className="h-1 w-full bg-gradient-to-r from-primary via-accent to-primary" />
            <div className="p-6">
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
                      onClick={() => handleSelect(theme.id)}
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
