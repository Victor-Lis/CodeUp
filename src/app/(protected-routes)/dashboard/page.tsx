import { getServerSession } from "next-auth";

export default async function Dashboard() {
 const user = await getServerSession()
 return (
   <div>
    <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
    <p className="text-lg">Bem-vindo, {user?.user.email || "usuário"}!</p>
    <p className="text-md">Aqui você pode gerenciar suas configurações e acessar recursos exclusivos.</p>
    <p className="text-sm text-gray-500">Esta é uma área protegida, apenas usuários autenticados podem acessar.</p>
   </div>
 );
}