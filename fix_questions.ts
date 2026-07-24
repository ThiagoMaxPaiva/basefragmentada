import { db } from './server/db.ts';
import { questions } from './shared/schema.ts';
import { inArray, eq } from 'drizzle-orm';

const textoPuloDoGato = `Leia o texto abaixo para responder à questão:

**O PULO DO GATO**
"Muitos jornalistas iniciantes acreditam que a emoção de uma reportagem é construída pelo acúmulo de adjetivos. No entanto, a verdade é que quanto mais despida uma frase, mais cortante o seu efeito. No terceiro parágrafo, por exemplo, narramos um episódio brutal e fictício de violência de forma totalmente seca e objetiva, sem um único adjetivo, apenas para demonstrar que a narração crua dos fatos por si só é capaz de emocionar profundamente o leitor, ou seja, mostrar que não é necessário usar adjetivos para emocionar. O texto jornalístico não precisa e não deve ser puramente racional e frio, mas também não pode ser um festival de adjetivação. O texto deve saber dosar emoção e razão, e é nesse equilíbrio entre razão e emoção que está o chamado pulo do gato: o uso consciente e racional da linguagem para provocar a emoção de forma implícita, como um jogo entre o escritor e o leitor."

---

`;

async function fix() {
  const qs = await db.select().from(questions).where(inArray(questions.id, [1,2,3,4]));
  for (const q of qs) {
    let newText = q.questionText;
    if (!newText.includes("O PULO DO GATO")) {
      newText = textoPuloDoGato + newText;
      await db.update(questions).set({ questionText: newText }).where(eq(questions.id, q.id));
      console.log('Updated question', q.id);
    }
  }
}

fix().then(()=>process.exit(0)).catch(console.error);
