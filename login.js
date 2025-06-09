// === login.js ===
const credenciais = {
  admin: { senha: 'admin123', papel: 'ADMIN' },
  engenharia: { senha: 'eng123', papel: 'GESTOR', area: 'ENGENHARIA' },
  // …adicione outras áreas conforme necessário…
};

document.getElementById('loginForm').addEventListener('submit', e => {
  e.preventDefault();
  const userKey = document.getElementById('usuario').value.trim().toLowerCase().replace(/\s+/g,'_');
  const pass = document.getElementById('senha').value;
  const erro = document.getElementById('erro');

  const user = credenciais[userKey];
  if (user && user.senha === pass) {
    sessionStorage.setItem('papel', user.papel);
    if (user.papel === 'GESTOR') sessionStorage.setItem('area', user.area);
    window.location.href = user.papel === 'ADMIN'
      ? "../ADMIN/Inicial/inicial.html"
      : "../GESTORES/Inicial/ginicial.html";
  } else {
    erro.textContent = 'Usuário ou senha inválidos.';
  }
});