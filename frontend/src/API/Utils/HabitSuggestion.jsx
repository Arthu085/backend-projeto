// Componente de sugestão de hábitos (usando API Google)
import { useState } from 'react';
import { getSugestaoHabito } from '../../API/google'; // Importando da nova API do Google
import Button from '../../Components/UI/Button';
import Card from '../../Components/UI/Card';
import Input from '../../Components/UI/Input';
import Alert from '../../Components/UI/Alert';

const HabitSuggestion = ({ usuario = {} }) => {
  const [loading, setLoading] = useState(false);
  const [sugestao, setSugestao] = useState('');
  const [erro, setErro] = useState('');
  
  // Estados para formulário
  const [cidade, setCidade] = useState(usuario.cidade || '');
  const [estadoEmocional, setEstadoEmocional] = useState('');
  const [clima, setClima] = useState('');

  const handleGetSugestao = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErro('');
    
    try {
      // Validação básica
      if (!cidade || !estadoEmocional || !clima) {
        throw new Error('Por favor, preencha todos os campos');
      }
      
      const resposta = await getSugestaoHabito(
        usuario.nome || 'Usuário',
        cidade,
        estadoEmocional,
        clima
      );
      
      setSugestao(resposta);
    } catch (error) {
      console.error('Erro:', error);
      setErro(error.message || 'Não foi possível obter uma sugestão. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <h2 className="text-xl font-bold mb-4">Sugestão de Hábito Personalizada (Google AI)</h2>
      
      <form onSubmit={handleGetSugestao}>
        <div className="space-y-3 mb-4">
          <Input
            type="text"
            label="Sua cidade"
            value={cidade}
            onChange={(e) => setCidade(e.target.value)}
            placeholder="Ex: Criciúma"
            required
          />
          
          <Input
            type="text"
            label="Como você está se sentindo?"
            value={estadoEmocional}
            onChange={(e) => setEstadoEmocional(e.target.value)}
            placeholder="Ex: ansioso, feliz, cansado"
            required
          />
          
          <Input
            type="text"
            label="Como está o clima?"
            value={clima}
            onChange={(e) => setClima(e.target.value)}
            placeholder="Ex: chuvoso, ensolarado, nublado"
            required
          />
        </div>
        
        <Button 
          type="submit" 
          disabled={loading}
          className="w-full"
        >
          {loading ? 'Gerando sugestão...' : 'Obter Sugestão de Hábito'}
        </Button>
      </form>
      
      {erro && (
        <Alert type="error" className="mt-4">
          {erro}
        </Alert>
      )}
      
      {sugestao && !erro && (
        <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-md">
          <h3 className="font-medium text-green-800 mb-2">Sua sugestão personalizada:</h3>
          <p className="text-gray-800">{sugestao}</p>
          
          <div className="mt-3 flex justify-end">
            <Button 
              type="button" 
              variant="outline"
              onClick={() => {
                // Aqui você pode adicionar funcionalidade para salvar o hábito
                // Exemplo: salvarHabito(sugestao);
                alert('Funcionalidade de salvar hábito será implementada!');
              }}
            >
              Salvar como hábito
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
};

export default HabitSuggestion;