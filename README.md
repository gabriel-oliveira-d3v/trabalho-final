# Factory Method

## Categoria
Padrão **Criacional** (GoF).

## Intenção
O Factory Method define uma interface para criação de um objeto, mas deixa
que as **subclasses decidam qual classe instanciar**. Em vez de o código
cliente chamar `new ClasseConcreta()` diretamente, ele chama um método de
criação (o "factory method"), que é implementado de forma diferente por
cada subclasse.

Em outras palavras: o padrão delega a responsabilidade de instanciar
objetos para subclasses especializadas, desacoplando o código que **usa**
o objeto do código que **cria** o objeto.

## Estrutura

- **Product** — interface/classe abstrata comum a todos os objetos criados
  (no exemplo: `Notification`).
- **ConcreteProduct** — implementações concretas do Product
  (`EmailNotification`, `SMSNotification`, `PushNotification`).
- **Creator** — classe abstrata que declara o factory method e pode conter
  lógica de negócio que usa o produto (`NotificationCreator`).
- **ConcreteCreator** — subclasse que sobrescreve o factory method para
  retornar uma instância de um ConcreteProduct específico
  (`EmailNotificationCreator`, `SMSNotificationCreator`,
  `PushNotificationCreator`).

## Exemplo utilizado neste repositório

Um sistema de envio de notificações (e-mail, SMS, push).

- `sem-padrao/index.js` — o código cliente decide, via `if/else`, qual
  classe concreta instanciar. Para adicionar um novo tipo de notificação,
  é preciso alterar essa função.
- `com-padrao/index.js` — cada tipo de notificação tem seu próprio
  `Creator`. O código cliente conhece apenas a abstração
  `NotificationCreator`. Para adicionar um novo tipo, basta criar uma
  nova classe — nenhum código existente precisa ser modificado.

### Como executar
```bash
node sem-padrao/index.js
node com-padrao/index.js
```

## Pontos fortes
- **Aderência ao Open/Closed Principle**: novos produtos podem ser
  adicionados criando novas classes, sem alterar código existente.
- **Baixo acoplamento**: o código cliente depende apenas de abstrações
  (Creator/Product), não de classes concretas.
- **Centraliza a lógica de criação**, facilitando manutenção e testes
  (é possível testar cada Creator isoladamente, ou criar mocks/stubs).
- Facilita a aplicação do **Princípio da Responsabilidade Única**, já que
  a criação do objeto é separada da lógica que o utiliza.

## Pontos fracos
- **Aumenta o número de classes** no sistema: para cada novo produto é
  necessário criar também um novo creator, o que pode tornar a hierarquia
  de classes mais complexa.
- Pode ser um **exagero (over-engineering)** em sistemas pequenos ou que
  não preveem crescimento no número de variações de objetos.
- A abstração adicional pode dificultar a leitura do código para quem não
  conhece o padrão, exigindo "pular" entre várias classes para entender o
  fluxo de criação.

## Quando usar
- Quando uma classe não pode antecipar o tipo de objeto que precisa criar.
- Quando o sistema deve ser facilmente extensível com novos tipos de
  produtos, sem modificar código já existente.
- Quando se quer delegar a lógica de criação para subclasses
  especializadas, mantendo a lógica de negócio comum na superclasse.

## Conclusão
O Factory Method resolve um problema bastante comum: evitar que o código
cliente fique "amarrado" a classes concretas através de condicionais de
criação. Comparado a simplesmente instanciar objetos diretamente, o
padrão aumenta a flexibilidade e a capacidade de extensão do sistema, ao
custo de mais classes e um nível extra de abstração. Em projetos onde se
espera que novos tipos de produtos surjam com frequência (como o exemplo
de canais de notificação), o ganho em manutenibilidade compensa
claramente esse custo.

## Referências
- GAMMA, Erich et al. *Design Patterns: Elements of Reusable
  Object-Oriented Software*. Addison-Wesley, 1994.
