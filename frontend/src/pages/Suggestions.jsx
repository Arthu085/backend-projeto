// Página de sugestões de hábitos
import { useState } from 'react';
import MainLayout from '../Components/Layout/MainLayout';
import HabitSuggestion from '../API/Utils/HabitSuggestion';
import Card from '../Components/UI/Card';


const Suggestions = () => {
  // Mock do usuário (em um app real, viria de um contexto ou estado global)
  const [usuario] = useState({
    nome: 'Arthur',
    cidade: 'Criciúma',
    habitos: []
  });

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-6">Recomendações Personalizadas</h1>
       
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <HabitSuggestion usuario={usuario} />
         
          <Card>
            <h2 className="text-xl font-bold mb-4">Seus Hábitos Salvos</h2>
           
            {usuario.habitos && usuario.habitos.length > 0 ? (
              <ul className="space-y-2">
                {usuario.habitos.map((habito, index) => (
                  <li
                    key={index}
                    className="p-3 bg-gray-50 border border-gray-200 rounded-md"
                  >
                    {habito.descricao}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">
                Você ainda não tem hábitos salvos. Use o formulário ao lado para receber sugestões personalizadas!
              </p>
            )}
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default Suggestions;