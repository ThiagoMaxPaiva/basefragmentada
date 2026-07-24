import { useState } from "react";
import { AppLayout } from "@/components/layout/app-layout";
import { useFlashcards, useCreateFlashcard, useReviewFlashcard } from "@/hooks/use-flashcards";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, Plus, RefreshCw, Layers, ThumbsDown, ThumbsUp, Frown, Smile } from "lucide-react";
import { format, isBefore, isToday, startOfDay } from "date-fns";
import type { Flashcard } from "@shared/schema";

export default function FlashcardsPage() {
  const { data: cards, isLoading } = useFlashcards();
  const createFlashcard = useCreateFlashcard();
  const reviewFlashcard = useReviewFlashcard();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newCard, setNewCard] = useState({ front: "", back: "", category: "" });

  const [isReviewing, setIsReviewing] = useState(false);
  const [reviewIndex, setReviewIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  // Consider due if nextReview is before today or is today
  const dueCards = cards?.filter(card => {
    const nextReview = new Date(card.nextReview);
    return isBefore(nextReview, new Date()) || isToday(nextReview);
  }) ?? [];

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    createFlashcard.mutate(newCard, {
      onSuccess: () => {
        setIsDialogOpen(false);
        setNewCard({ front: "", back: "", category: "" });
      }
    });
  };

  const handleReview = (score: number) => {
    const currentCard = dueCards[reviewIndex];
    if (!currentCard) return;

    reviewFlashcard.mutate({ id: currentCard.id, score }, {
      onSuccess: () => {
        setIsFlipped(false);
        if (reviewIndex + 1 < dueCards.length) {
          setReviewIndex(prev => prev + 1);
        } else {
          setIsReviewing(false); // Session complete
          setReviewIndex(0);
        }
      }
    });
  };

  const activeCard = dueCards[reviewIndex];

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto pt-2 md:pt-8 space-y-8 pb-16">
        {/* Page Header */}
        <div className="p-8 rounded-2xl text-white shadow-2xl relative overflow-hidden border border-border" style={{ background: "var(--card-gradient)" }}>
          <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <p className="text-[11px] uppercase tracking-widest font-black mb-2 border-l-4 border-primary pl-3 italic opacity-70">
                Treinamento de Retenção — SM-2
              </p>
              <div className="flex items-center gap-3 mb-2">
                <Brain className="w-8 h-8 text-primary" />
                <h1 className="text-3xl md:text-4xl font-black italic tracking-tight">REVISÃO TÁTICA</h1>
              </div>
              <p className="opacity-60 font-semibold text-sm max-w-md">
                Sistema de Repetição Espaçada. Memorize siglas, protocolos e regras gramaticais de forma eficiente.
              </p>
            </div>
            
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-black uppercase tracking-widest shadow-xl">
                  <Plus className="w-4 h-4 mr-2" />
                  Criar Cartão
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md bg-card border-border">
                <DialogHeader>
                  <DialogTitle className="font-black italic text-xl flex items-center gap-2">
                    <Layers className="w-5 h-5 text-primary" />
                    NOVO CARTÃO DE REVISÃO
                  </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleCreate} className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-wider text-muted-foreground">Frente (Pergunta/Termo)</label>
                    <Input 
                      required 
                      value={newCard.front} 
                      onChange={e => setNewCard({...newCard, front: e.target.value})}
                      placeholder="Ex: Qual porta padrão do protocolo HTTPS?"
                      className="bg-background border-border font-semibold"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-wider text-muted-foreground">Verso (Resposta/Definição)</label>
                    <Textarea 
                      required 
                      value={newCard.back} 
                      onChange={e => setNewCard({...newCard, back: e.target.value})}
                      placeholder="Ex: Porta 443"
                      className="bg-background border-border font-semibold resize-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-wider text-muted-foreground">Categoria</label>
                    <Input 
                      required 
                      value={newCard.category} 
                      onChange={e => setNewCard({...newCard, category: e.target.value})}
                      placeholder="Ex: Redes de Computadores"
                      className="bg-background border-border font-semibold"
                    />
                  </div>
                  <Button type="submit" className="w-full font-black uppercase tracking-widest mt-2" disabled={createFlashcard.isPending}>
                    {createFlashcard.isPending ? "Cadastrando..." : "Cadastrar Cartão"}
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Content Area */}
        {!isReviewing ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-card border-border shadow-xl hover-elevate">
              <CardHeader>
                <CardTitle className="text-sm font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                  <RefreshCw className="w-4 h-4 text-primary" />
                  Prontidão Diária
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center py-6 text-center">
                <span className="text-6xl font-black text-foreground mb-2">{dueCards.length}</span>
                <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-6">Cartões pendentes hoje</span>
                
                <Button 
                  size="lg" 
                  disabled={dueCards.length === 0} 
                  onClick={() => setIsReviewing(true)}
                  className="w-full max-w-xs font-black uppercase tracking-widest"
                >
                  <Brain className="w-4 h-4 mr-2" />
                  Iniciar Sessão
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-card border-border shadow-xl">
              <CardHeader>
                <CardTitle className="text-sm font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                  <Layers className="w-4 h-4 text-accent" />
                  Seu Arsenal
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 rounded-lg bg-muted/20 border border-border">
                    <span className="text-xs font-black uppercase tracking-wider text-muted-foreground">Total de Cartões</span>
                    <span className="font-black text-foreground">{cards?.length ?? 0}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-lg bg-primary/10 border border-primary/20">
                    <span className="text-xs font-black uppercase tracking-wider text-primary">Para Revisar Agora</span>
                    <span className="font-black text-primary">{dueCards.length}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="max-w-2xl mx-auto flex flex-col items-center">
            <div className="w-full flex justify-between items-center mb-6 px-2">
              <span className="text-xs font-black uppercase tracking-widest text-muted-foreground">
                Cartão {reviewIndex + 1} de {dueCards.length}
              </span>
              <Button variant="ghost" size="sm" onClick={() => setIsReviewing(false)} className="text-xs font-black uppercase">
                Abortar Missão
              </Button>
            </div>

            {/* Flashcard 3D Container */}
            <div className="w-full h-80 perspective-1000">
              <motion.div 
                className="w-full h-full relative preserve-3d cursor-pointer"
                onClick={() => !isFlipped && setIsFlipped(true)}
                animate={{ rotateX: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
              >
                {/* Front Side */}
                <Card className="absolute w-full h-full backface-hidden bg-card border-2 border-primary/30 shadow-2xl shadow-primary/10 flex flex-col items-center justify-center p-8 text-center">
                  <span className="absolute top-4 left-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground bg-muted/50 px-2 py-1 rounded">
                    {activeCard?.category}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-black text-foreground">{activeCard?.front}</h3>
                  <div className="absolute bottom-6 text-xs font-black uppercase tracking-widest text-primary animate-pulse flex items-center gap-2">
                    <RefreshCw className="w-4 h-4" />
                    Clique para revelar
                  </div>
                </Card>

                {/* Back Side */}
                <Card className="absolute w-full h-full backface-hidden bg-muted/30 border-2 border-border flex flex-col items-center justify-center p-8 text-center overflow-y-auto" style={{ transform: "rotateX(180deg)" }}>
                  <span className="absolute top-4 left-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground bg-background border border-border px-2 py-1 rounded">
                    Resposta Tática
                  </span>
                  <p className="text-lg md:text-xl font-bold text-foreground leading-relaxed whitespace-pre-wrap">{activeCard?.back}</p>
                </Card>
              </motion.div>
            </div>

            {/* Review Controls */}
            <AnimatePresence>
              {isFlipped && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-8 w-full"
                >
                  <p className="text-center text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-4">
                    Como foi o seu desempenho?
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <Button variant="outline" className="h-16 border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground font-black uppercase flex flex-col items-center justify-center gap-1" onClick={() => handleReview(1)}>
                      <Frown className="w-5 h-5" />
                      <span className="text-[10px]">Errei</span>
                    </Button>
                    <Button variant="outline" className="h-16 border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-white font-black uppercase flex flex-col items-center justify-center gap-1" onClick={() => handleReview(3)}>
                      <ThumbsDown className="w-5 h-5" />
                      <span className="text-[10px]">Difícil</span>
                    </Button>
                    <Button variant="outline" className="h-16 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white font-black uppercase flex flex-col items-center justify-center gap-1" onClick={() => handleReview(4)}>
                      <ThumbsUp className="w-5 h-5" />
                      <span className="text-[10px]">Bom</span>
                    </Button>
                    <Button variant="outline" className="h-16 border-green-500 text-green-500 hover:bg-green-500 hover:text-white font-black uppercase flex flex-col items-center justify-center gap-1" onClick={() => handleReview(5)}>
                      <Smile className="w-5 h-5" />
                      <span className="text-[10px]">Fácil</span>
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
