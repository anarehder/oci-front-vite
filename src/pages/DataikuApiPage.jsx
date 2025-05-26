import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { GoArrowRight } from "react-icons/go";
import logo from "../assets/logo.svg";
import HeaderComponent from "../components/fixedComponents/HeaderComponent";

export default function DataikuApiPage() {
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [detections, setDetections] = useState(null);

  const canvasRef = useRef(null);
  const imgRef = useRef(null);

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

  return (
    <PageContainer>
      <h1> dataiku </h1> 

      <FormContainer onSubmit={handleSubmit}>
        <SearchBarForm>
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </SearchBarForm>

        <button type="submit" disabled={loading}>
          <p>{loading ? "Enviando..." : "Detectar"}</p>
          <GoArrowRight size={24} />
        </button>

        {imageUrl && (
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
            />
            <canvas ref={canvasRef} />
          </ImageWrapper>
        )}

        {detections && (
          <ResultBox>
            <h4>Resultado (raw JSON):</h4>
            <pre>{JSON.stringify(detections, null, 2)}</pre>
          </ResultBox>
        )}
      </FormContainer>
    </PageContainer>
  );
}

// Styled Components
const PageContainer = styled.div`
  width: 100%;
  height: 100vh;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 25px;
  display: flex;
`;

const Header = styled.div`
  margin-top: 3%;
  height: 180px;
  width: 70%;
  border-bottom: 2px solid #e6e6e6;
  padding: 10px 25px;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  text-align: center;

  h1 {
    font-size: 50px;
    font-weight: 400;
  }
  img {
    width: 100px;
  }
  @media (max-width: 500px) {
    flex-wrap: wrap;
    justify-content: center;
    img {
      width: 0;
    }
  }
`;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 25px;
  margin: 3% 15%;
  input {
    width: 100%;
  }
  button {
    padding: 10px 15px;
    justify-content: space-between;
    width: 270px;
    display: flex;
    align-items: center;
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
  canvas {
    border: 1px solid #ccc;
    max-width: 100%;
    height: auto;
  }
`;

const ResultBox = styled.div`
  width: 100%;
  max-height: 300px;
  overflow-y: auto;
  background-color: #f8f8f8;
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #ddd;
`;