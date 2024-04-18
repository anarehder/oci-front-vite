function estimateCPUreduce(maxCPU, meanCPU, OCPU) {
    let newOCPU = OCPU;
    
    if (maxCPU < 80 && meanCPU < 70) {
      if (50 < meanCPU && meanCPU < 60) {
        newOCPU = Math.ceil((4 / 5) * OCPU);
      } else if (40 < meanCPU && meanCPU < 50) {
        newOCPU = Math.ceil((2 / 3) * OCPU);
      } else if (30 < meanCPU && meanCPU < 40) {
        newOCPU = Math.ceil((1 / 2) * OCPU);
      } else if (20 < meanCPU && meanCPU < 30) {
        newOCPU = Math.ceil((2 / 5) * OCPU);
      } else if (0 < meanCPU && meanCPU < 20) {
        newOCPU = Math.ceil((1 / 3) * OCPU);
      }
    }
  
    return newOCPU;
}
  
function estimateCPUincrease(maxCPU, meanCPU, OCPU) {
    let newOCPU = OCPU;
  
    if (maxCPU >= 90 && meanCPU >= 90) {
      if (0 < OCPU && OCPU <= 3) {
        newOCPU = OCPU + 1;
      } else if (3 < OCPU && OCPU <= 8) {
        newOCPU = OCPU + 2;
      } else if (8 < OCPU && OCPU <= 16) {
        newOCPU = OCPU + 3;
      } else if (16 < OCPU && OCPU <= 24) {
        newOCPU = OCPU + 4;
      } else if (24 < OCPU && OCPU <= 48) {
        newOCPU = OCPU + 6;
      } else {
        newOCPU = OCPU + 12;
      }
    }
  
    return newOCPU;
}

function estimateMEMreduce(maxMEM, MEM) {
    let estimatedMEM = ((Number(maxMEM) * 1.1) / 100) * Number(MEM);
    estimatedMEM = Math.ceil(estimatedMEM);
    return estimatedMEM;
}
  
  function estimateMEMincrease(meanMEM, MEM) {
    let estimatedMEM = (Number(meanMEM) / 200) * Number(MEM) + Number(MEM);
    estimatedMEM = Math.ceil(estimatedMEM);
    return estimatedMEM;
}

const calculateValuesService = { estimateCPUreduce, estimateCPUincrease, estimateMEMreduce, estimateMEMincrease };

export default calculateValuesService;