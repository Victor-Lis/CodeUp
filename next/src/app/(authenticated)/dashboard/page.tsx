"use client";

import { useSession } from "next-auth/react";
import { useGetChallenges } from "@/hooks/use-challenge/get-all";

import { CircleNotchIcon } from "@phosphor-icons/react"
import ChallengeCard from "@/modules/dashboard/challenge/card";

export default function ChallengesPage() {
  const { data: session } = useSession();
  const { data: challenges, isLoading } = useGetChallenges({
    enabled: !!session?.user,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <CircleNotchIcon className="h-8 w-8 animate-spin text-primary" />
        <p className="ml-4 text-lg">Carregando desafios...</p>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Painel de Desafios</h1>
        <p className="text-muted-foreground">
          Bem-vindo, {session?.user.name}! Aqui estão os desafios disponíveis.
        </p>
      </div>

      <div className="space-y-6">
        {challenges && challenges.length > 0 ? (
          challenges.map((challenge: ChallengeType) => (
            <ChallengeCard key={challenge.id} challenge={challenge} />
          ))
        ) : (
          <div className="text-center py-12 px-6 border-2 border-dashed rounded-lg">
             <h3 className="text-lg font-semibold">Nenhum desafio encontrado</h3>
             <p className="text-muted-foreground mt-1">Não há desafios disponíveis no momento. Volte mais tarde!</p>
          </div>
        )}
      </div>
    </div>
  );
}