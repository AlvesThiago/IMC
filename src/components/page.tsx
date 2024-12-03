import React, { useState } from 'react';
import '../App.css';

// Definindo o tipo para o estado
interface FormData {
  altura: string;
  peso: string;
}

function Page() {
  const [formData, setFormData] = useState<FormData>({ altura: '', peso: '' });
  const [imc, setImc] = useState<string | null>(null);
  const [classificacao, setClassificacao] = useState<string>('');

  // Função para lidar com a mudança nos inputs
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  // Função para calcular o IMC
  const calcularIMC = () => {
    const alturaNum = parseFloat(formData.altura);
    const pesoNum = parseFloat(formData.peso);

    if (isNaN(alturaNum) || isNaN(pesoNum) || alturaNum <= 0 || pesoNum <= 0) {
      alert('insira valores válidos para altura e peso.');
      return;
    }

    const imcCalculado = pesoNum / (alturaNum * alturaNum);
    setImc(imcCalculado.toFixed(2));

    let classificacaoIMC = '';
    if (imcCalculado < 18.5) {
      classificacaoIMC = 'Abaixo do peso';
    } else if (imcCalculado >= 18.5 && imcCalculado < 24.9) {
      classificacaoIMC = 'Peso normal';
    } else if (imcCalculado >= 25 && imcCalculado < 29.9) {
      classificacaoIMC = 'Sobrepeso';
    } else if (imcCalculado >= 30) {
      classificacaoIMC = 'Obesidade';
    }
    setClassificacao(classificacaoIMC);
  };

  return (
        <div className="App">
            <h1>Calculadora IMC</h1>
            <form
                onSubmit={(e) => {
                e.preventDefault();
                calcularIMC();
                }}
            >
                <div className="input-group">
                <label htmlFor="altura">Altura (m):</label>
                <input
                    type="number"
                    placeholder='Ex: 1.75'
                    id="altura"
                    step="0.01"
                    value={formData.altura}
                    onChange={handleInputChange}
                    required
                />
                </div>
                <div className="input-group">
                <label htmlFor="peso">Peso (kg):</label>
                <input
                    type="number"
                    placeholder='Ex: 65'
                    id="peso"
                    value={formData.peso}
                    onChange={handleInputChange}
                    required
                />
                </div>
                <button type="submit">Calcular IMC</button>
            </form>

            {imc && (
                <div className="resultado">
                <h2>Resultado</h2>
                <p><strong>IMC: </strong>{imc}</p>
                <p><strong>Classificação: </strong>{classificacao}</p>
                </div>
            )}
        </div>
  );
}

export default Page;
