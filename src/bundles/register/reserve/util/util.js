const getSituation = (situation) => {

  if (situation === 'r') {
    return 'reserva'
  }

  if (situation === 'd') {
    return 'documentation'
  }

  if (situation === 'a') {
    return 'analise'
  }

  if (situation === 'cd') {
    return 'cadastro'
  }

  if (situation === 'p') {
    return 'pendente'
  }

  if (situation === 'as') {
    return 'assinado'
  }

  if (situation === 'ap') {
    return 'ass c/ pendencia'
  }

  if (situation === 'af') {
    return 'atividades finais'
  }

  if (situation === 'c') {
    return 'cancelado'
  }

}

export {
  getSituation
}