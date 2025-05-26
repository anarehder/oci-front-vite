export function getComputeEventsDescriptions(event) {
  const date = new Date(event.createdAt).toLocaleString('pt-BR');

  switch (event.eventName) {
    // Compute Events
    case 'LaunchInstance':
      return `A instância "${event.displayName || '[sem nome]'}" foi criada no compartimento "${event.compartmentName}" em ${date}. Estado atual: ${event.lifecycleState || '[desconhecido]'}. Recursos: ${event.shape} com ${event.ocpus} OCPUs e ${event.memoryInGbs} GB de RAM. Ação realizada por: ${event.principalName}`;
    case 'TerminateInstance':
      const bootPreservado = event.preserveBootVolume === 0 ? 'foi mantido' : 'não foi mantido';
      return `A instância "${event.displayName || '[sem nome]'}" foi excluída em ${date}, a ação foi realizada por: ${event.principalName}, o boot volume ${bootPreservado}`;

    default:
      // Instance Actions (start, stop, reset, etc.)
      switch (event.instanceActionType) {
        case 'start':
          return `A instância "${event.displayName || '[sem nome]'}" foi ligada em ${date}, a ação foi realizada por: ${event.principalName}`;
        case 'stop':
        case 'softstop':
          return `A instância "${event.displayName || '[sem nome]'}" foi desligada em ${date}, a ação foi realizada por: ${event.principalName}`;
        case 'reset':
        case 'softreset':
          return `A instância "${event.displayName || '[sem nome]'}" foi reiniciada em ${date}, a ação foi realizada por: ${event.principalName}`;
        default:
          return `${event.eventName ? event.eventName : event.action}, em ${date}, por ${event.principalName}`;
      }
  }

  return 'Evento não reconhecido';
}

export const ComputeEventsNames = ['LaunchInstance', 'TerminateInstance', 'InstanceAction'];