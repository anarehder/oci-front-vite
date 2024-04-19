import calculateValuesService from "./calculateValuesSerivce";

function estimateReshapeCPUValues(reshape, OCPU, maxCPU, meanCPU) {
    let newOCPU;
    
    if (reshape.includes("-CPU")) {
      newOCPU = calculateValuesService.estimateCPUreduce(maxCPU, meanCPU, OCPU);
    } else if (reshape.includes("+CPU")) {
      newOCPU = calculateValuesService.estimateCPUincrease(maxCPU, meanCPU, OCPU);
    } else {
      return {newOCPU: Number(OCPU)};
    }
    return { newOCPU };
}

function estimateReshapeMEMValues(reshape, MEM, maxMEM, meanMEM) {
    let newMEM;
    
    if (reshape.includes("-MEM")) {
      newMEM = calculateValuesService.estimateMEMreduce(maxMEM, MEM);
    } else if (reshape.includes("+MEM")) {
      newMEM = calculateValuesService.estimateMEMincrease(meanMEM, MEM);
    } else {
      return { newMEM: Number(MEM) };
    }
    return { newMEM };
}
const reshapeService = { estimateReshapeCPUValues, estimateReshapeMEMValues };

export default reshapeService;