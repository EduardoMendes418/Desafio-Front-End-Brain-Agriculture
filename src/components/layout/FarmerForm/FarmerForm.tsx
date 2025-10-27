import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  resetForm,
} from "../../../store/slices/farmersSlice";
import { createFarmer, updateFarmer } from "../../../store/slices/thunks/farmersThunks";
import type { Farmer } from "../../../types/farmer";
import type { RootState } from "../../../store";
import { Button } from "../../ui/Button/Button";
import {
  FormContainer,
  FormTitle,
  CompactFormGrid,
  FormGroup,
  Label,
  RequiredStar,
  Input,
  Select,
  FarmSection,
  FarmHeader,
  SectionTitle,
  AreaGrid,
  AreaGroup,
  AreaLabel,
  AreaValue,
  CropsSection,
  CropsHeader,
  CropsTitle,
  CropItem,
  FormActions,
  ErrorMessage,
  EmptyState,
  AddFarmButton,
} from "./styles/FarmerForm.styles";

const BrazilianStates = [
  "AC",
  "AL",
  "AP",
  "AM",
  "BA",
  "CE",
  "DF",
  "ES",
  "GO",
  "MA",
  "MT",
  "MS",
  "MG",
  "PA",
  "PB",
  "PR",
  "PE",
  "PI",
  "RJ",
  "RN",
  "RS",
  "RO",
  "RR",
  "SC",
  "SP",
  "SE",
  "TO",
];

const CropTypes = [
  "Soja",
  "Milho",
  "Café",
  "Cana",
  "Algodão",
  "Trigo",
  "Arroz",
  "Feijão",
];

interface FarmerFormProps {
  mode: "create" | "edit";
}

export const FarmerForm: React.FC<FarmerFormProps> = ({ mode }) => {
  const dispatch = useDispatch();
  const { selectedFarmer, loading } = useSelector(
    (state: RootState) => state.farmers
  );

  const [formData, setFormData] = useState<
    Omit<Farmer, "id" | "createdAt" | "updatedAt">
  >({
    document: "",
    name: "",
    farms: [
      {
        id: Date.now().toString(),
        name: "",
        city: "",
        state: "",
        totalArea: 0,
        agriculturalArea: 0,
        vegetationArea: 0,
        crops: [],
        farmerId: "",
      },
    ],
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (mode === "edit" && selectedFarmer) {
      setFormData({
        document: selectedFarmer.document,
        name: selectedFarmer.name,
        farms: selectedFarmer.farms.map((farm) => ({
          ...farm,
          farmerId: selectedFarmer.id,
        })),
      });
    }
  }, [mode, selectedFarmer]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.document.trim()) {
      newErrors.document = "CPF/CNPJ é obrigatório";
    }

    if (!formData.name.trim()) {
      newErrors.name = "Nome é obrigatório";
    }

    formData.farms.forEach((farm, farmIndex) => {
      if (!farm.name.trim()) {
        newErrors[`farm-${farmIndex}-name`] = "Nome da fazenda é obrigatório";
      }

      if (farm.agriculturalArea + farm.vegetationArea > farm.totalArea) {
        newErrors[`farm-${farmIndex}-areas`] =
          "Soma das áreas não pode ultrapassar área total";
      }

      farm.crops.forEach((crop, cropIndex) => {
        if (!crop.name.trim()) {
          newErrors[`farm-${farmIndex}-crop-${cropIndex}-name`] =
            "Nome da cultura é obrigatório";
        }
        if (crop.plantedArea <= 0) {
          newErrors[`farm-${farmIndex}-crop-${cropIndex}-area`] =
            "Área plantada deve ser maior que zero";
        }
      });
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const submitData = {
        ...formData,
        farms: formData.farms.map((farm) => ({
          ...farm,
          crops: farm.crops.map((crop) => ({
            ...crop,
            farmId: farm.id,
          })),
        })),
      };

      if (mode === "create") {
        await dispatch(createFarmer(submitData) as any).unwrap();
      } else if (mode === "edit" && selectedFarmer) {
        await dispatch(
          updateFarmer({
            id: selectedFarmer.id,
            farmerData: submitData,
          }) as any
        ).unwrap();
      }
    } catch (error) {
      console.error("Erro ao salvar produtor:", error);
    }
  };

  const handleCancel = () => {
    dispatch(resetForm());
  };

  const updateFarm = (farmIndex: number, field: string, value: any) => {
    const updatedFarms = [...formData.farms];
    updatedFarms[farmIndex] = {
      ...updatedFarms[farmIndex],
      [field]: value,
    };
    setFormData({ ...formData, farms: updatedFarms });
  };

  const addFarm = () => {
    setFormData({
      ...formData,
      farms: [
        ...formData.farms,
        {
          id: Date.now().toString(),
          name: "",
          city: "",
          state: "",
          totalArea: 0,
          agriculturalArea: 0,
          vegetationArea: 0,
          crops: [],
          farmerId: "",
        },
      ],
    });
  };

  const removeFarm = (farmIndex: number) => {
    if (formData.farms.length > 1) {
      const updatedFarms = formData.farms.filter(
        (_, index) => index !== farmIndex
      );
      setFormData({ ...formData, farms: updatedFarms });
    }
  };

  const addCrop = (farmIndex: number) => {
    const updatedFarms = [...formData.farms];
    const farmId = updatedFarms[farmIndex].id;

    updatedFarms[farmIndex].crops.push({
      id: Date.now().toString(),
      name: "",
      harvest: new Date().getFullYear().toString(),
      plantedArea: 0,
      farmId: farmId,
    });

    setFormData({ ...formData, farms: updatedFarms });
  };

  const updateCrop = (
    farmIndex: number,
    cropIndex: number,
    field: string,
    value: any
  ) => {
    const updatedFarms = [...formData.farms];
    updatedFarms[farmIndex].crops[cropIndex] = {
      ...updatedFarms[farmIndex].crops[cropIndex],
      [field]: value,
    };
    setFormData({ ...formData, farms: updatedFarms });
  };

  const removeCrop = (farmIndex: number, cropIndex: number) => {
    const updatedFarms = [...formData.farms];
    updatedFarms[farmIndex].crops = updatedFarms[farmIndex].crops.filter(
      (_, index) => index !== cropIndex
    );
    setFormData({ ...formData, farms: updatedFarms });
  };

  const calculateAvailableArea = (farmIndex: number) => {
    const farm = formData.farms[farmIndex];
    return farm.totalArea - farm.agriculturalArea - farm.vegetationArea;
  };

  return (
    <FormContainer>
      <FormTitle>
        {mode === "create"
          ? "👨‍🌾 Cadastrar Novo Produtor"
          : "✏️ Editar Produtor"}
      </FormTitle>

      <form onSubmit={handleSubmit}>
        <CompactFormGrid>
          <FormGroup>
            <Label htmlFor="document">
              📄 CPF/CNPJ <RequiredStar>*</RequiredStar>
            </Label>
            <Input
              id="document"
              type="text"
              value={formData.document}
              onChange={(e) =>
                setFormData({ ...formData, document: e.target.value })
              }
              placeholder="000.000.000-00 ou 00.000.000/0000-00"
            />
            {errors.document && <ErrorMessage>{errors.document}</ErrorMessage>}
          </FormGroup>

          <FormGroup>
            <Label htmlFor="name">
              👤 Nome do Produtor <RequiredStar>*</RequiredStar>
            </Label>
            <Input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="Nome completo ou razão social"
            />
            {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}
          </FormGroup>
        </CompactFormGrid>

        {formData.farms.map((farm, farmIndex) => (
          <FarmSection key={farm.id}>
            <FarmHeader>
              <SectionTitle>🏞️ Fazenda {farmIndex + 1}</SectionTitle>
              {formData.farms.length > 1 && (
                <Button
                  type="button"
                  variant="danger"
                  size="small"
                  onClick={() => removeFarm(farmIndex)}
                >
                  🗑️ Remover
                </Button>
              )}
            </FarmHeader>

            <CompactFormGrid>
              <FormGroup>
                <Label>
                  Nome da Fazenda <RequiredStar>*</RequiredStar>
                </Label>
                <Input
                  value={farm.name}
                  onChange={(e) =>
                    updateFarm(farmIndex, "name", e.target.value)
                  }
                  placeholder="Nome da propriedade"
                />
                {errors[`farm-${farmIndex}-name`] && (
                  <ErrorMessage>
                    {errors[`farm-${farmIndex}-name`]}
                  </ErrorMessage>
                )}
              </FormGroup>

              <FormGroup>
                <Label>🏙️ Cidade</Label>
                <Input
                  value={farm.city}
                  onChange={(e) =>
                    updateFarm(farmIndex, "city", e.target.value)
                  }
                  placeholder="Cidade"
                />
              </FormGroup>

              <FormGroup>
                <Label>🗺️ Estado</Label>
                <Select
                  value={farm.state}
                  onChange={(e) =>
                    updateFarm(farmIndex, "state", e.target.value)
                  }
                >
                  <option value="">Selecione um estado</option>
                  {BrazilianStates.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </Select>
              </FormGroup>
            </CompactFormGrid>

            <AreaGrid>
              <AreaGroup>
                <AreaLabel>Área Total</AreaLabel>
                <AreaValue variant="total">{farm.totalArea || 0} ha</AreaValue>
                <Input
                  type="number"
                  value={farm.totalArea || ""}
                  onChange={(e) =>
                    updateFarm(
                      farmIndex,
                      "totalArea",
                      Number(e.target.value) || 0
                    )
                  }
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                />
              </AreaGroup>

              <AreaGroup>
                <AreaLabel>Área Agricultável</AreaLabel>
                <AreaValue variant="agricultural">
                  {farm.agriculturalArea || 0} ha
                </AreaValue>
                <Input
                  type="number"
                  value={farm.agriculturalArea || ""}
                  onChange={(e) =>
                    updateFarm(
                      farmIndex,
                      "agriculturalArea",
                      Number(e.target.value) || 0
                    )
                  }
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                />
              </AreaGroup>

              <AreaGroup>
                <AreaLabel>Área de Vegetação</AreaLabel>
                <AreaValue variant="vegetation">
                  {farm.vegetationArea || 0} ha
                </AreaValue>
                <Input
                  type="number"
                  value={farm.vegetationArea || ""}
                  onChange={(e) =>
                    updateFarm(
                      farmIndex,
                      "vegetationArea",
                      Number(e.target.value) || 0
                    )
                  }
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                />
              </AreaGroup>

              <AreaGroup>
                <AreaLabel>Área Disponível</AreaLabel>
                <AreaValue variant="total">
                  {calculateAvailableArea(farmIndex).toFixed(2)} ha
                </AreaValue>
                <div
                  style={{
                    color:
                      calculateAvailableArea(farmIndex) < 0
                        ? "#dc3545"
                        : "#28a745",
                    fontSize: "11px",
                    fontWeight: "500",
                  }}
                >
                  {calculateAvailableArea(farmIndex) < 0
                    ? "Área excedida"
                    : "Área disponível"}
                </div>
              </AreaGroup>
            </AreaGrid>

            {errors[`farm-${farmIndex}-areas`] && (
              <ErrorMessage>{errors[`farm-${farmIndex}-areas`]}</ErrorMessage>
            )}

            <CropsSection>
              <CropsHeader>
                <CropsTitle>🌱 Culturas Plantadas</CropsTitle>
                <Button
                  type="button"
                  size="small"
                  onClick={() => addCrop(farmIndex)}
                >
                  Adicionar
                </Button>
              </CropsHeader>

              {farm.crops.map((crop, cropIndex) => (
                <CropItem key={crop.id}>
                  <FormGroup>
                    <Label>
                      Cultura <RequiredStar>*</RequiredStar>
                    </Label>
                    <Select
                      value={crop.name}
                      onChange={(e) =>
                        updateCrop(farmIndex, cropIndex, "name", e.target.value)
                      }
                    >
                      <option value="">Selecione uma cultura</option>
                      {CropTypes.map((cropType) => (
                        <option key={cropType} value={cropType}>
                          {cropType}
                        </option>
                      ))}
                    </Select>
                    {errors[`farm-${farmIndex}-crop-${cropIndex}-name`] && (
                      <ErrorMessage>
                        {errors[`farm-${farmIndex}-crop-${cropIndex}-name`]}
                      </ErrorMessage>
                    )}
                  </FormGroup>

                  <FormGroup>
                    <Label>
                      Safra <RequiredStar>*</RequiredStar>
                    </Label>
                    <Input
                      type="text"
                      value={crop.harvest}
                      onChange={(e) =>
                        updateCrop(
                          farmIndex,
                          cropIndex,
                          "harvest",
                          e.target.value
                        )
                      }
                      placeholder="Ex: 2024/2025"
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label>
                      Área (ha) <RequiredStar>*</RequiredStar>
                    </Label>
                    <Input
                      type="number"
                      value={crop.plantedArea || ""}
                      onChange={(e) =>
                        updateCrop(
                          farmIndex,
                          cropIndex,
                          "plantedArea",
                          Number(e.target.value) || 0
                        )
                      }
                      min="0"
                      step="0.01"
                      placeholder="0.00"
                    />
                    {errors[`farm-${farmIndex}-crop-${cropIndex}-area`] && (
                      <ErrorMessage>
                        {errors[`farm-${farmIndex}-crop-${cropIndex}-area`]}
                      </ErrorMessage>
                    )}
                  </FormGroup>

                  <Button
                    type="button"
                    variant="danger"
                    size="small"
                    onClick={() => removeCrop(farmIndex, cropIndex)}
                  >
                    ✕
                  </Button>
                </CropItem>
              ))}

              {farm.crops.length === 0 && (
                <EmptyState>🌾 Nenhuma cultura adicionada</EmptyState>
              )}
            </CropsSection>
          </FarmSection>
        ))}

        <AddFarmButton type="button" variant="outline" onClick={addFarm}>
          ➕ Adicionar Outra Fazenda
        </AddFarmButton>

        <FormActions>
          <Button
            type="button"
            variant="secondary"
            onClick={handleCancel}
            disabled={loading}
          >
            ↩️ Cancelar
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? (
              <>⏳ Salvando...</>
            ) : mode === "create" ? (
              <>✅ Cadastrar</>
            ) : (
              <>💾 Atualizar</>
            )}
          </Button>
        </FormActions>
      </form>
    </FormContainer>
  );
};
