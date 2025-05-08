import { useEffect, useState } from "react";
import axios from "axios";
import MainLayout from "../Components/Layout/MainLayout";
import Card from "../Components/UI/Card";
import Alert from "../Components/UI/Alert";

export default function History() {
  const [recomendacoes, setRecomendacoes] = useState([]);
  const [erro, setErro] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const buscarRecomendacoes = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          throw new Error("Usuário não autenticado.");
        }

        const response = await axios.get("http://localhost:8000/recommendation/fetch", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setRecomendacoes(response.data);
      } catch (err) {
        console.error("Erro ao buscar recomendações:", err);
        setErro("Não foi possível carregar o histórico.");
      } finally {
        setLoading(false);
      }
    };

    buscarRecomendacoes();
  }, []);

  return (
    <MainLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Histórico de Recomendações</h1>

        {loading && <p>Carregando...</p>}

        {erro && (
          <Alert type="error" className="mb-4">
            {erro}
          </Alert>
        )}

        {recomendacoes.length === 0 && !loading && !erro ? (
          <p>Você ainda não possui recomendações salvas.</p>
        ) : (
          <div className="space-y-4">
            {recomendacoes.map((rec) => (
              <Card key={rec.id}>
                <p className="text-gray-800">{rec.description}</p>
                <p className="text-sm text-gray-500 mt-2">
                  Usuário: {rec.userName} ({rec.userEmail})
                </p>
              </Card>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
}
