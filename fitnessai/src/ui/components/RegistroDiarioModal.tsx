import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Button,
  Text,
  RadioGroup,
  Stack,
  Radio,
  useToast,
  Icon,
} from "@chakra-ui/react";
import { FaDumbbell, FaHeartbeat, FaCarrot, FaTint, FaBed } from "react-icons/fa";
import { useState } from "react";

interface RegistroDiarioModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function RegistroDiarioModal({ isOpen, onClose }: RegistroDiarioModalProps) {
  const toast = useToast();

  const [rutina, setRutina] = useState("");
  const [intensidad, setIntensidad] = useState("");
  const [comioSaludable, setComioSaludable] = useState("");
  const [agua, setAgua] = useState("");
  const [sueno, setSueno] = useState("");

  const handleGuardar = () => {
    if (!rutina || !intensidad || !comioSaludable || !agua || !sueno) {
      toast({
        title: "Faltan datos por completar.",
        status: "warning",
        isClosable: true,
      });
      return;
    }

    console.log({ rutina, intensidad, comioSaludable, agua, sueno });

    toast({
      title: "Guardado con éxito",
      status: "success",
      isClosable: true,
    });

    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Registro diario</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack spacing={6}>
            {/* Entrenamiento */}
            <Stack>
              <Text fontWeight="semibold">
                <Icon as={FaDumbbell} mr={2} />
                ¿Hiciste tu rutina de hoy?
              </Text>
              <RadioGroup value={rutina} onChange={setRutina}>
                <Stack direction="row">
                  <Radio value="completa">Completa</Radio>
                  <Radio value="incompleta">Incompleta</Radio>
                  <Radio value="no">No la hice</Radio>
                </Stack>
              </RadioGroup>
            </Stack>

            <Stack>
              <Text fontWeight="semibold">
                <Icon as={FaHeartbeat} mr={2} />
                ¿Cómo estuvo el entreno?
              </Text>
              <RadioGroup value={intensidad} onChange={setIntensidad}>
                <Stack direction="row">
                  <Radio value="suave">Suave</Radio>
                  <Radio value="normal">Normal</Radio>
                  <Radio value="intenso">Intenso</Radio>
                </Stack>
              </RadioGroup>
            </Stack>

            {/* Alimentación */}
            <Stack>
              <Text fontWeight="semibold">
                <Icon as={FaCarrot} mr={2} />
                ¿Comiste saludable hoy?
              </Text>
              <RadioGroup value={comioSaludable} onChange={setComioSaludable}>
                <Stack direction="row">
                  <Radio value="si">Sí</Radio>
                  <Radio value="masomenos">Más o menos</Radio>
                  <Radio value="no">No</Radio>
                </Stack>
              </RadioGroup>
            </Stack>

            {/* Agua */}
            <Stack>
              <Text fontWeight="semibold">
                <Icon as={FaTint} mr={2} />
                ¿Tomaste suficiente agua?
              </Text>
              <RadioGroup value={agua} onChange={setAgua}>
                <Stack direction="row">
                  <Radio value="si">Sí</Radio>
                  <Radio value="poco">Un poco</Radio>
                  <Radio value="nada">Casi nada</Radio>
                </Stack>
              </RadioGroup>
            </Stack>

            {/* Sueño */}
            <Stack>
              <Text fontWeight="semibold">
                <Icon as={FaBed} mr={2} />
                ¿Dormiste bien anoche?
              </Text>
              <RadioGroup value={sueno} onChange={setSueno}>
                <Stack direction="row">
                  <Radio value="si">Sí</Radio>
                  <Radio value="masomenos">Más o menos</Radio>
                  <Radio value="mal">Mal</Radio>
                </Stack>
              </RadioGroup>
            </Stack>
          </Stack>
        </ModalBody>

        <ModalFooter>
          <Button onClick={handleGuardar} colorScheme="blue">
            Guardar registro
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
