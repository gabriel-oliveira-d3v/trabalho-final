/**
 * SOLUÇÃO SEM O PADRÃO FACTORY METHOD
 *
 * Contexto: um sistema de notificações que pode enviar mensagens
 * por e-mail, SMS ou push notification.
 *
 * Problema: a lógica de "qual classe instanciar" fica espalhada
 * pelo código cliente, geralmente em condicionais (if/else ou switch).
 * Cada vez que um novo tipo de notificação é criado, é necessário
 * alterar o código cliente, violando o Princípio Aberto/Fechado
 * (Open/Closed Principle).
 */

class EmailNotification {
  send(message) {
    console.log(`[E-mail] Enviando mensagem: "${message}"`);
  }
}

class SMSNotification {
  send(message) {
    console.log(`[SMS] Enviando mensagem: "${message}"`);
  }
}

class PushNotification {
  send(message) {
    console.log(`[Push] Enviando mensagem: "${message}"`);
  }
}

// Código cliente: precisa conhecer TODAS as classes concretas
// e decidir, na unha, qual instanciar.
function notificar(tipo, mensagem) {
  let notification;

  if (tipo === "email") {
    notification = new EmailNotification();
  } else if (tipo === "sms") {
    notification = new SMSNotification();
  } else if (tipo === "push") {
    notification = new PushNotification();
  } else {
    throw new Error(`Tipo de notificação desconhecido: ${tipo}`);
  }

  notification.send(mensagem);
}

// Uso
notificar("email", "Seu pedido foi confirmado!");
notificar("sms", "Seu código de verificação é 1234.");
notificar("push", "Você tem uma nova mensagem.");

/**
 * PROBLEMAS DESSA ABORDAGEM:
 * 1. Toda vez que surge um novo tipo de notificação (ex: WhatsApp),
 *    é preciso editar a função `notificar`, mexendo em código que já
 *    funcionava (alto acoplamento, baixa manutenibilidade).
 * 2. A lógica de criação de objetos fica misturada com a lógica de uso,
 *    dificultando testes e reaproveitamento.
 * 3. Se essa mesma decisão (if/else) precisar ser repetida em outro lugar
 *    do sistema, o código é duplicado.
 */

module.exports = { EmailNotification, SMSNotification, PushNotification, notificar };
