const examples = {
  reliable: {
    query: "What planet is known as the Red Planet?",
    greedy: "Mars",
    anchors: ["Mars", "The planet Mars", "It is Mars"],
    probes: ["Mars", "The answer is Mars", "Mars, our red neighbor", "That would be Mars", "Planet Mars", "Jupiter"],
    weights: [
      [.98, .94, .91, .96, .97, .04],
      [.95, .97, .89, .93, .98, .03],
      [.97, .95, .90, .96, .95, .05]
    ]
  },
  uncertain: {
    query: "Who first reached the summit of K2?",
    greedy: "Reinhold Messner",
    anchors: ["Reinhold Messner", "Messner", "It was Messner"],
    probes: ["Achille Compagnoni", "Lino Lacedelli", "An Italian expedition", "Compagnoni and Lacedelli", "Reinhold Messner", "I’m not certain"],
    weights: [
      [.08, .06, .12, .09, .94, .05],
      [.05, .04, .08, .07, .97, .04],
      [.07, .05, .11, .08, .91, .04]
    ]
  }
};

const demo = document.querySelector('.demo-card');
const tabs = [...document.querySelectorAll('.example-tab')];
const steps = [...document.querySelectorAll('.step')];
const parts = [...document.querySelectorAll('.reveal-part')];
let currentExample = 'reliable';
let currentStep = 0;
let timer;

function uncertainty(weights) {
  const flat = weights.flat();
  return 1 - flat.reduce((sum, value) => sum + value * value, 0) / flat.length;
}

function renderResponses(container, responses, weights) {
  container.innerHTML = responses.map((response, index) => {
    const average = weights ? weights.reduce((sum, row) => sum + row[index], 0) / weights.length : 1;
    const drift = average < .35 ? ' drift' : '';
    return `<div class="response${drift}" style="--i:${index}"><i>${String(index + 1).padStart(2, '0')}</i><span>${response}</span></div>`;
  }).join('');
}

function renderGraph(weights) {
  const svg = document.querySelector('#demo-graph');
  const anchorY = [65, 145, 225];
  const probeY = [30, 76, 122, 168, 214, 260];
  const lines = weights.flatMap((row, i) => row.map((weight, j) =>
    `<path class="graph-link" fill="none" stroke="#4f8068" stroke-width="3" stroke-linecap="round" stroke-dasharray="0 9" style="--weight:${weight};--i:${i * 6 + j};opacity:${.12 + weight * .7}" d="M115 ${anchorY[i]} C280 ${anchorY[i]}, 400 ${probeY[j]}, 565 ${probeY[j]}" />`
  )).join('');
  const anchors = anchorY.map((y, i) => `<circle class="graph-node anchor" cx="100" cy="${y}" r="17"/><text class="graph-node-label" x="100" y="${y}">A${i + 1}</text>`).join('');
  const probes = probeY.map((y, i) => `<circle class="graph-node probe" cx="580" cy="${y}" r="15"/><text class="graph-node-label" x="580" y="${y}">P${i + 1}</text>`).join('');
  svg.innerHTML = `<text class="graph-side-label" x="70" y="12">ANCHORS</text><text class="graph-side-label" x="552" y="12">PROBES</text>${lines}${anchors}${probes}`;
}

function renderExample(name) {
  const data = examples[name];
  currentExample = name;
  demo.dataset.state = name;
  document.querySelector('#demo-query').textContent = data.query;
  document.querySelector('#demo-greedy').textContent = data.greedy;
  renderResponses(document.querySelector('#anchors-list'), data.anchors);
  renderResponses(document.querySelector('#probes-list'), data.probes, data.weights);
  renderGraph(data.weights);
  const score = uncertainty(data.weights);
  const displayScore = score.toFixed(2);
  const dial = document.querySelector('#score-dial');
  dial.style.setProperty('--score', `${Math.round(score * 100)}%`);
  document.querySelector('#score-value').textContent = displayScore;
  document.querySelector('#score-verdict').innerHTML = name === 'reliable'
    ? '<b>LOW</b> The model is certain.'
    : '<b>HIGH</b> The model is uncertain.';
  tabs.forEach(tab => {
    const active = tab.dataset.example === name;
    tab.classList.toggle('active', active);
    tab.setAttribute('aria-pressed', active);
  });
}

function showStep(index, manual = false) {
  window.clearTimeout(timer);
  currentStep = index;
  demo.classList.toggle('paused', manual);
  steps.forEach((step, i) => {
    step.classList.toggle('active', i === index);
    step.classList.toggle('complete', i < index);
  });
  parts.forEach((part, i) => {
    part.classList.toggle('visible', i <= index);
    part.classList.toggle('current', i === index);
  });
  if (!manual) {
    timer = window.setTimeout(() => {
      if (currentStep < steps.length - 1) showStep(currentStep + 1);
      else timer = window.setTimeout(() => showStep(0), 4200);
    }, 2350);
  }
}

function restart(name = currentExample) {
  window.clearTimeout(timer);
  renderExample(name);
  parts.forEach(part => part.classList.remove('visible', 'current'));
  void demo.offsetWidth;
  showStep(0);
}

tabs.forEach(tab => tab.addEventListener('click', () => restart(tab.dataset.example)));
steps.forEach((step, index) => step.addEventListener('click', () => showStep(index, true)));
document.querySelector('.replay').addEventListener('click', () => restart());

document.querySelector('#copy-citation').addEventListener('click', async event => {
  const button = event.currentTarget;
  try {
    await navigator.clipboard.writeText(document.querySelector('#citation-code').textContent);
    button.textContent = 'Copied ✓';
    window.setTimeout(() => button.innerHTML = 'Copy <span aria-hidden="true">⧉</span>', 1800);
  } catch {
    button.textContent = 'Select text to copy';
  }
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('in-view');
    observer.unobserve(entry.target);
  });
}, { threshold: .18 });

document.querySelectorAll('.result-bars, .figure-card').forEach(el => observer.observe(el));
restart();
