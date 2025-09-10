import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { GoArrowRight } from "react-icons/go";
import { FiAlertTriangle } from "react-icons/fi";
import Chart from "react-apexcharts";

export default function DataikuApiPage() {
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [detections, setDetections] = useState(null);

  const canvasRef = useRef(null);
  const imgRef = useRef(null);
  console.log(detections);
  // Mapa categoria -> cor
  const categoryColors = {
    LavaLoucas5L: "rgba(72, 247, 72, 0.6)",
    Outros: "rgba(255, 0, 0, 0.6)",
  };

  // Atualiza a URL da imagem quando o arquivo muda
  useEffect(() => {
    if (!imageFile) {
      setImageUrl(null);
      return;
    }
    const url = URL.createObjectURL(imageFile);
    setImageUrl(url);

    // Limpar url antiga quando trocar de imagem
    return () => URL.revokeObjectURL(url);
  }, [imageFile]);

  // Desenha a imagem e as bounding boxes no canvas quando imagem ou detecções mudam
  useEffect(() => {
    if (!imageUrl || !detections || !canvasRef.current || !imgRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const img = imgRef.current;

    // Ajusta o tamanho do canvas para a imagem
    canvas.width = img.width;
    canvas.height = img.height;

    // Desenha a imagem no canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    // Desenha as bounding boxes
    detections.forEach(({ category, bbox }) => {
      const [x, y, width, height] = bbox;
      ctx.strokeStyle = categoryColors[category] || "rgba(0,255,0,0.6)";
      ctx.lineWidth = 3;
      ctx.fillStyle = ctx.strokeStyle;
      ctx.font = "18px Arial";

      ctx.beginPath();
      ctx.rect(x, y, width, height);
      ctx.stroke();

      // Fundo semi-transparente para o texto
      const text = category;
      const textWidth = ctx.measureText(text).width;
      const textHeight = 20;
      ctx.fillRect(x, y - textHeight, textWidth + 6, textHeight);

      // Texto branco
      ctx.fillStyle = "#fff";
      ctx.fillText(text, x + 3, y - 5);
    });
  }, [imageUrl, detections, categoryColors]);

  function handleImageChange(e) {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setImageFile(file);
      setDetections(null); // limpa resultado anterior
    } else {
      alert("Selecione uma imagem válida.");
    }
  }

  function clearImage(){
    setImageFile(null);
    setDetections(null);
    setImageUrl(null);
    if (imgRef.current) {
      imgRef.current.value = null; // Limpa o input manualmente
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!imageFile) {
      alert("Envie uma imagem.");
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("image", imageFile);

      const response = await axios.post(
        "http://100.101.1.42:4001/dataiku",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setDetections(response.data);
    } catch (error) {
      alert("Erro ao enviar imagem para predição.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }
  console.log(imageFile);

  const categorias = ["Candura", "Outros"];
  const valores = [detections?.filter(item => item.category === "LavaLoucas5L").length, detections?.filter(item => item.category === "Outros").length];

  const chartOptions = {
    plotOptions: {
      pie: {
        expandOnClick: true,
        customScale: 0.85,
        donut: {
          size: '35%'
        },
        offsetY: -15
      },
      
    },
    labels: categorias,
    dataLabels: {
      enabled: true,
      textAnchor: 'middle',
      offsetX: 20,
      style: {
        fontSize: '25px', // <<-- aumenta aqui o tamanho da % no gráfico
        fontWeight: 'bold',
      },
      dropShadow: {
        enabled: false,
        top: 1,
        left: 1,
        blur: 1,
        color: '#000',
        opacity: 0.45
      },
    },
    legend: {
      show: true, // Exibe a legenda
      position: "bottom", // Coloca a legenda embaixo
      fontSize: '20px',
      horizontalAlign:"left", // Centraliza os itens da legenda
      floating: true, // Não permite que a legenda flutue
      height: 80,
      offsetY: 5,
      markers: {
        size: 1,
        shape: 'line',
        strokeWidth: 1
      },
    },
    tooltip: {
      style: {
        fontSize: '16px',
      },
      fixed: {
        enabled: true,
        position: 'topLeft',
        offsetX: 0,
        offsetY: 50,
      },
    },
    colors: ["#47BF36", "#EC0908"],
  };

  return (
    <PageContainer>
      <h1> Deteção de Objetos - Dataiku </h1> 

      <FormContainer onSubmit={handleSubmit}>
        <SearchBarForm>
          <input type="file" accept="image/*" onChange={handleImageChange} ref={imgRef} />
        </SearchBarForm>
        {imageFile && <p>Selected file: {imageFile.name}</p>}
        <div>
          <button type="submit" disabled={loading}>
            <p>{loading ? "Enviando..." : "Detectar"}</p>
            <GoArrowRight size={24} />
          </button>

          <button onClick={clearImage} disabled={!imageFile}>
            <p>Limpar imagem</p>
            <GoArrowRight size={24} />
          </button>

        </div>
        {imgRef && imageUrl && (
          <div>
            
              {detections ? 
              <ImageWrapper>
                <img
                ref={imgRef}
                src={imageUrl}
                alt="upload preview"
                style={{ display: "none" }}
                onLoad={() => {
                  // Força o useEffect que desenha no canvas disparar ao carregar imagem
                  setDetections((d) => d);
                }}
              /> <canvas ref={canvasRef} />
              </ImageWrapper>
              :
              <ImageWrapper>
              <img
                ref={imgRef}
                src={imageUrl}
                alt="upload preview"
                onLoad={() => {
                  // Força o useEffect que desenha no canvas disparar ao carregar imagem
                  setDetections((d) => d);
                }}
              />
              </ImageWrapper>
              }
            {detections &&
              <GraficosContainer>
                {detections?.filter(item => item.category === "LavaLoucas5L").length === 0 &&
                  <h2><FiAlertTriangle size={35} /> ATENÇÃO: QUEBRA DE GÔNDOLA</h2>
                }
                <div>

                  <NumerosContainer>
                    <h2>Minha Marca:</h2>
                    <Numeros>{detections?.filter(item => item.category === "LavaLoucas5L").length}</Numeros>
                  </NumerosContainer>
                  <NumerosContainer>
                    <h2>Outra Marca:</h2> <Numeros>{detections?.filter(item => item.category === "Outros").length}
                    </Numeros>
                  </NumerosContainer>
                </div>
                <GraphBlock>
                  <Chart options={chartOptions} series={valores} type="donut" height='500px' />
                </GraphBlock>
              </GraficosContainer>
            }
          </div>
        )}   
        {imageFile && detections && (   
          <ResultBox>
            <h2>Resultado (raw JSON):</h2>
            <div>{JSON.stringify(detections)}</div>
          </ResultBox>
        )}
      </FormContainer>
    </PageContainer>
  );
}

const GraphBlock = styled.div`
  flex-direction: column;
  justify-content: flex-start;
  margin: 10px auto;
  border-radius: 16px;
  background-color: #f9f9f9;
  box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.1);
  .apexcharts-tooltip {
            border-radius: 5px;
            display: flex;
            flex-wrap: wrap;
            width: 200px;
            padding: 10px 10px;
            background-color: #f9f9f9;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
            word-wrap: break-word;
            white-space: normal;
        }
`;

// Styled Components
const PageContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 25px;
  display: flex;
  h1{
    margin-top: 30px;
  }
`;

const FormContainer = styled.form`
  display: flex;
  width: 90%;
  flex-direction: column;
  align-items: flex-start;
  gap: 25px;
  margin: 3% 15%;
  input {
    width: 100%;
  }
  img{
    width: 650px;
    height: 650px;
  }
  button {
    padding: 10px 15px;
    justify-content: space-between;
    width: 200px;
    display: flex;
    align-items: center;
  }
    canvas {
    border: 3px solid #ccc;
    width: 650px;
    height: auto;
    min-height: 650px;
  }
`;

const SearchBarForm = styled.div`
  justify-content: flex-start;
  background-color: #f0f5f9;
  color: #021121;
  border: 0.5px solid #e6e6e6;
  border-radius: 16px;
  display: flex;
  align-items: center;
  padding: 10px;
  width: 725px;
  gap: 15px;
`;

const ImageWrapper = styled.div`
  position: relative;
`;

const ResultBox = styled.div`
  width: 80%;
  max-height: 300px;
  overflow-y: auto;
  flex-direction: column;
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #ddd;
  line-height: 30px;
  h2{
    margin-bottom: 15px;
  }
`;

const GraficosContainer = styled.div`
  flex-direction: column;
  gap: 25px;
  height: 650px;
  justify-content: flex-start;
  h2{
    font-size: 25px;
    line-height: 35px;
    display: flex;
    gap: 10px;
    align-items: center;
  }
`
const NumerosContainer = styled.div`
  width: 50%;
  height: 80px;
  font-size: 25px;
  justify-content: center;
  gap: 15px;
`

const Numeros = styled.div`
  border: 5px solid black;
  border-radius: 50px;
  width: 70px;
  height: 70px;
  font-size: 25px;
  font-weight: 600;
  align-items: center;
  justify-content: center;
`