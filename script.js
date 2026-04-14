const form = document.querySelector("form");
const lista = document.querySelector("ul");
const totalEl = document.querySelector(".total");

let gastos = [];
let total = 0;

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const descricao = form.querySelector("input[type='text']").value;
  const valor = parseFloat(form.querySelector("input[type='number']").value);
  const categoria = form.querySelector("select").value;

  if (!descricao || isNaN(valor)) return;

  // cria objeto
  const gasto = {
    descricao,
    valor,
    categoria
  };

  // salva no array
  gastos.push(gasto);

  // soma total
  total += valor;

  // cria item na tela
  const li = document.createElement("li");

  li.innerHTML = `
    <span>${descricao} (${categoria})</span>
    <span>R$ ${valor.toFixed(2)}</span>
    <button class="remover">X</button>
  `;

  // marca valor alto
  if (valor >= 100) {
    li.classList.add("alto-valor");
  }

 
  li.querySelector(".remover").addEventListener("click", () => {
    gastos = gastos.filter(item => item !== gasto);
    total -= valor;
    li.remove();
    atualizarTotal();
    console.log(gastos);
  });

  lista.appendChild(li);

  atualizarTotal();
  console.log(gastos);

  form.reset();
});

function atualizarTotal() {
  totalEl.textContent = `Total: R$ ${total.toFixed(2)}`;
}