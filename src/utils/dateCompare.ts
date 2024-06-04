export const isFuture = (mesReq: string, anoReq: string): boolean => {
  const meses: { [key: string]: number } = {
    'janeiro': 0,
    'fevereiro': 1,
    'março': 2,
    'abril': 3,
    'maio': 4,
    'junho': 5,
    'julho': 6,
    'agosto': 7,
    'setembro': 8,
    'outubro': 9,
    'novembro': 10,
    'dezembro': 11,
  };

  const mes = meses[mesReq.toLowerCase()];
  const ano = parseInt(anoReq, 10);

  if (mes === undefined) {
    throw new Error('Mês inválido');
  }

  const dataSelecionada = new Date(ano, mes, 1);
  const dataAtual = new Date();
  const dataAtualMesAno = new Date(dataAtual.getFullYear(), dataAtual.getMonth(), 1);

  if (dataSelecionada < dataAtualMesAno) {
    return false;
  }
  return true;
};