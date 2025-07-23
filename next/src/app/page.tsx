import Image from "next/image";
import Link from "next/link"; 
import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr"; // Opcional: Para um ícone bonito no botão

export default function Home() {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] items-center min-h-screen bg-background p-8 text-white font-[family-name:var(--font-geist-sans)]">
      <main className="row-start-2 flex flex-col items-center justify-center gap-10 text-center">
        <Image
          src="/codeup-clean.png"
          alt="CodeUp logo"
          width={280}
          height={38}
          priority
          className="animate-fade-in"
        />

        <div className="flex flex-col gap-4 items-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl animate-fade-in-down">
            Sua jornada no mundo dev melhorará aqui.
          </h1>
          <p className="max-w-2xl text-lg text-gray-300 animate-fade-in-up">
            Acesse a plataforma para resolver problemas de programação e
            melhorar suas habilidades.
          </p>
        </div>

        <Link
          href="/login"
          className="group flex items-center justify-center gap-2 rounded-lg bg-primary px-8 py-3 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-gray-900 animate-fade-in"
        >
          Acessar Plataforma
          <ArrowRightIcon className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </main>

      <footer className="row-start-3 text-center text-sm text-gray-500">
        <p>
          &copy; {new Date().getFullYear()} CodeUp. Todos os direitos
          reservados.
        </p>
      </footer>
    </div>
  );
}