# Padrões de Projeto — Iterator (GoF)

**Disciplina:** Engenharia de Software II
**Padrão estudado:** Iterator (categoria: Comportamental)
**Linguagem:** JavaScript (Node.js)

---

## 1. O que é o padrão Iterator

O **Iterator** é um padrão de projeto **comportamental** do catálogo GoF (Gang of Four). Seu objetivo é fornecer uma forma de **acessar sequencialmente os elementos de uma coleção (agregado) sem expor sua representação interna** (array, lista encadeada, árvore, hash, etc.).

Ele resolve o problema de como percorrer diferentes estruturas de dados de maneira **uniforme**, sem que o código cliente precise conhecer detalhes de implementação de cada coleção.

### Estrutura (papéis do padrão)

| Papel | Responsabilidade | No nosso exemplo |
|---|---|---|
| `Iterator` | Define operações para percorrer elementos (`next()`) | Objeto retornado por `[Symbol.iterator]()` |
| `ConcreteIterator` | Implementa o percurso e mantém a posição atual | Objeto interno criado dentro de `[Symbol.iterator]()` em `Playlist` e `Historico` |
| `Aggregate` / `Iterable` | Define o método para criar um iterator | Protocolo `[Symbol.iterator]` do JavaScript |
| `ConcreteAggregate` | Implementa a coleção e cria o iterator concreto correspondente | `Playlist`, `Historico` |

No JavaScript, esse padrão já está embutido na linguagem através do **protocolo iterável** (`Symbol.iterator`), que é exatamente o que torna o `for...of` possível — assim como o `for-each` do Java ou o `for` do Python.

---

## 2. Exemplo utilizado

Para deixar o padrão didático, foram criadas **duas coleções de músicas com estruturas internas diferentes**:

- `Playlist`: armazena as músicas em um **array**.
- `Historico`: armazena as músicas em uma **lista encadeada manual** (classe `No`).

A ideia é mostrar que, **sem o padrão**, o cliente precisa escrever uma lógica de percurso diferente para cada estrutura — e **com o padrão**, a mesma lógica (`for...of`) funciona para as duas, não importando como elas são implementadas por dentro.

```
iterator-pattern-js/
├── sem-padrao/     # solução sem o padrão Iterator
│   ├── musica.js
│   ├── playlist.js   (array)
│   ├── historico.js  (lista encadeada)
│   └── main.js
└── com-padrao/     # solução com o padrão Iterator
    ├── musica.js
    ├── playlist.js   (array, agora implementa [Symbol.iterator])
    ├── historico.js  (lista encadeada, agora implementa [Symbol.iterator])
    └── main.js
```

### Como executar

Pré-requisito: ter o [Node.js](https://nodejs.org) instalado.

```bash
# Sem padrão
cd sem-padrao
node main.js

# Com padrão
cd com-padrao
node main.js
```

---

## 3. Solução SEM o padrão Iterator

Na pasta `sem-padrao/`, as coleções precisam **expor sua estrutura interna** para que o cliente consiga percorrê-las:

- `Playlist` expõe o array (`getMusicas()`).
- `Historico` expõe o nó inicial da lista encadeada (`getInicio()`).

O cliente (`main.js`) precisa, então, conhecer e escrever uma lógica de percurso **diferente para cada estrutura**:

```js
// Playlist (array) -> percorre com índice
for (let i = 0; i < playlist.getTotal(); i++) {
    console.log(musicas[i].toString());
}

// Historico (lista encadeada) -> percorre com ponteiro de nó
let atual = historico.getInicio();
while (atual !== null) {
    console.log(atual.musica.toString());
    atual = atual.proximo;
}
```

### Problemas dessa abordagem
- **Quebra de encapsulamento**: a coleção expõe detalhes internos (array, nós) que deveriam ser privados.
- **Acoplamento alto**: o cliente depende diretamente da estrutura de dados usada internamente.
- **Falta de uniformidade**: cada coleção exige uma lógica de percurso própria.
- **Baixa manutenibilidade**: se a implementação interna da coleção mudar (ex: array vira `Map`), todo o código cliente que a percorre precisa ser reescrito.

---

## 4. Solução COM o padrão Iterator

Na pasta `com-padrao/`, `Playlist` e `Historico` passam a implementar o método `[Symbol.iterator]()`, retornando cada uma seu próprio iterador concreto, que conhece os detalhes internos **escondidos do cliente**.

```js
[Symbol.iterator]() {
    let posicaoAtual = 0;
    const musicas = this.musicas;

    return {
        next() {
            if (posicaoAtual < musicas.length) {
                return { value: musicas[posicaoAtual++], done: false };
            }
            return { value: undefined, done: true };
        }
    };
}
```

Com isso, o cliente passa a percorrer **qualquer uma das duas coleções exatamente da mesma forma**, sem saber (nem precisar saber) se por trás existe um array ou uma lista encadeada:

```js
for (const musica of playlist) {
    console.log(musica.toString());
}

for (const musica of historico) {
    console.log(musica.toString());
}
```

Internamente, o `for...of` do JavaScript é apenas açúcar sintático para:

```js
const it = playlist[Symbol.iterator]();
let resultado = it.next();
while (!resultado.done) {
    console.log(resultado.value.toString());
    resultado = it.next();
}
```

---

## 5. Pontos fortes do padrão

- **Encapsulamento preservado**: a estrutura interna da coleção nunca é exposta ao cliente.
- **Interface uniforme**: qualquer objeto que implemente `[Symbol.iterator]` pode ser percorrido da mesma forma (`for...of`, spread `...`, desestruturação), independente da implementação.
- **Múltiplos percursos simultâneos**: como cada chamada a `[Symbol.iterator]()` cria um novo objeto iterador, é possível ter vários percursos independentes acontecendo ao mesmo tempo sobre a mesma coleção.
- **Facilidade de manutenção**: trocar a estrutura interna da coleção (array → `Map`, lista → árvore, etc.) não impacta o código cliente, pois o contrato (`next()` retornando `{ value, done }`) permanece o mesmo.
- **Suporte nativo na linguagem**: em JavaScript, o padrão já está embutido (protocolo iterável), o que facilita sua adoção e integração com `for...of`, spread operator, `Array.from()`, geradores (`function*`), etc.

## 6. Pontos fracos do padrão

- **Aumento do número de "componentes"**: cada coleção concreta precisa implementar seu próprio `[Symbol.iterator]`, aumentando um pouco a complexidade estrutural do código.
- **Overhead em coleções muito simples**: para estruturas pequenas e que nunca mudam de implementação, o padrão pode ser um exagero de engenharia (over-engineering) — muitas vezes só usar um array puro já resolve.
- **Iteradores podem ficar desatualizados**: se a coleção for modificada durante a iteração, o comportamento do iterador pode ficar inconsistente, já que o JavaScript não lança erro automaticamente como o Java faz com `ConcurrentModificationException`.
- **Acesso limitado**: por padrão, o protocolo de iteração oferece apenas percurso sequencial (próximo elemento), exigindo lógica adicional caso seja necessário percorrer em outras ordens (reverso, por índice, etc.).

---

## 7. Conclusões do grupo

O padrão Iterator se mostrou muito eficaz para resolver um problema comum em sistemas orientados a objetos: a necessidade de percorrer coleções diferentes sem acoplar o código cliente aos detalhes de implementação de cada uma delas.

No exemplo desenvolvido, ficou evidente o ganho de **flexibilidade e manutenibilidade**: a versão sem o padrão obrigava o cliente a conhecer se a coleção era um array ou uma lista encadeada, e a escrever lógicas de percurso totalmente diferentes para cada caso. Já na versão com o padrão, o mesmo trecho de código (`for...of`) funcionou para ambas as coleções, mesmo elas tendo implementações internas completamente distintas.

Em JavaScript, esse padrão fica especialmente evidente porque já é parte do núcleo da linguagem: arrays, strings, `Map`, `Set` e até estruturas assíncronas (`for await...of`) seguem o mesmo protocolo iterável. Isso reforça como o Iterator é um padrão tão fundamental que acaba se tornando "invisível" no dia a dia — usamos `for...of` o tempo todo sem perceber que estamos usando exatamente o padrão Iterator do GoF.

Por outro lado, o padrão adiciona uma camada extra de abstração, o que só se justifica quando há real necessidade de desacoplamento — em estruturas pequenas ou coleções que nunca mudam de implementação, essa camada extra pode não compensar.

---

## 8. Referência

- GAMMA, Erich; HELM, Richard; JOHNSON, Ralph; VLISSIDES, John. **Design Patterns: Elements of Reusable Object-Oriented Software**. Addison-Wesley, 1994. (GoF)
- MDN Web Docs. **Iteration protocols**. Disponível em: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols
