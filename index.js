/**
 * SOLUÇÃO COM O PADRÃO FACTORY METHOD
 *
 * Ideia central: em vez do cliente decidir qual classe instanciar,
 * delegamos essa responsabilidade para subclasses de uma "fábrica" (Creator).
 * Cada subclasse sabe criar o seu próprio tipo de produto.
 *
 * O cliente passa a depender apenas de uma interface comum
 * (NotificationCreator), nunca das classes concretas diretamente.
 */

// ---------- Produtos ----------
// Interface comum que todos os produtos concretos devem seguir.
class Notification {
  send(message) {
    throw new Error("O método send() deve ser implementado pela subclasse.");
  }
}

class EmailNotification extends Notification {
  send(message) {
    console.log(`[E-mail] Enviando mensagem: "${message}"`);
  }
}

class SMSNotification extends Notification {
  send(message) {
    console.log(`[SMS] Enviando mensagem: "${message}"`);
  }
}

class PushNotification extends Notification {
  send(message) {
    console.log(`[Push] Enviando mensagem: "${message}"`);
  }
}

// ---------- Creator (fábrica) ----------
// Classe abstrata que declara o "factory method".
// Também pode conter lógica de negócio comum que usa o produto criado.
class NotificationCreator {
  // Factory Method: cada subclasse decide QUAL produto instanciar.
  createNotification() {
    throw new Error("O método createNotification() deve ser implementado pela subclasse.");
  }

  // Lógica de negócio comum, reaproveitada por todas as subclasses.
  notify(message) {
    const notification = this.createNotification();
    notification.send(message);
  }
}

class EmailNotificationCreator extends NotificationCreator {
  createNotification() {
    return new EmailNotification();
  }
}

class SMSNotificationCreator extends NotificationCreator {
  createNotification() {
    return new SMSNotification();
  }
}

class PushNotificationCreator extends NotificationCreator {
  createNotification() {
    return new PushNotification();
  }
}

// ---------- Código cliente ----------
// O cliente não conhece as classes concretas, apenas a abstração.
function enviarNotificacao(creator, mensagem) {
  creator.notify(mensagem);
}

// Uso
enviarNotificacao(new EmailNotificationCreator(), "Seu pedido foi confirmado!");
enviarNotificacao(new SMSNotificationCreator(), "Seu código de verificação é 1234.");
enviarNotificacao(new PushNotificationCreator(), "Você tem uma nova mensagem.");

/**
 * VANTAGENS DESSA ABORDAGEM:
 * 1. Para adicionar um novo tipo de notificação (ex: WhatsApp), basta criar
 *    uma nova classe de produto + uma nova classe creator. NENHUM código
 *    existente precisa ser alterado (Open/Closed Principle).
 * 2. O código cliente trabalha apenas com abstrações (NotificationCreator),
 *    reduzindo o acoplamento com classes concretas.
 * 3. A lógica de criação fica isolada e centralizada em cada creator,
 *    facilitando testes e manutenção.
 */

module.exports = {
  Notification,
  EmailNotification,
  SMSNotification,
  PushNotification,
  NotificationCreator,
  EmailNotificationCreator,
  SMSNotificationCreator,
  PushNotificationCreator,
};
