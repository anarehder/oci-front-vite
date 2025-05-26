export function getIdentityEventsDescriptions(event) {
  const date = new Date(event.createdAt).toLocaleString('pt-BR');

  switch (event.eventName) {
    case 'DeleteUser':
      if (event.message.includes('succeeded')) {
        return `O usuário "${event.adminResourceName || '[sem nome]'}" foi deletado em ${date}, a ação foi realizada por: ${event.principalName}`;
      }
      else{
        return `${event.eventName}, em ${date}, por ${event.principalName}`;
      }
    case 'CreateUser':
      if (event.message.includes('succeeded')) {
        return `O usuário "${event.adminResourceName || '[sem nome]'}" foi criado em ${date}, a ação foi realizada por: ${event.principalName}`;
      } else{
        return `${event.eventName}, em ${date}, por ${event.principalName}`;
      }
    case 'UpdateUser':
      if (event.message.includes('succeeded')) {
        return `O usuário "${event.adminResourceName || '[sem nome]'}" foi atualizado em ${date}, a ação foi realizada por: ${event.principalName}`;
      } else{
        return `${event.eventName}, em ${date}, por ${event.principalName}`;
      }
    case 'CreatePolicy':
      return `A policy "${event.policyName || '[sem nome]'}" com os seguintes atributos ${event.statements} foi criada em ${date}, a ação foi realizada por: ${event.principalName}`;
    case 'DeletePolicy':
      return `O usuário "${event.principalName}" excluiu a policy ${event.source} em ${date}`;
    case 'CreateGroup':
      return `O grupo "${event.source}" foi criado em ${date}, a ação foi realizada por: ${event.principalName}`;
    case 'DeleteGroup':
      return `O grupo "${event.source}" foi deletado em ${date}, a ação foi realizada por: ${event.principalName}`;
    default:
      return `${event.eventName ? event.eventName : event.action}, em ${date}, por ${event.principalName}`;
  }
}

export const IdentityEventsNames = ['DeleteUser', 'CreateUser', 'UpdateUser', 'CreatePolicy', 'DeletePolicy', 'CreateGroup', 'DeleteGroup'];