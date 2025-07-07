import CreateChallengeDialog from "../create/dialog";

export default function ChallengeHeader() {
  return (
    <div className="flex items-center justify-between mb-8">
      <div>
        <h1 className="text-3xl font-bold">Gerenciar Desafios</h1>
        <p className="text-muted-foreground">
          Adicione, edite ou remova desafios.
        </p>
      </div>
      <CreateChallengeDialog />
    </div>
  );
}
