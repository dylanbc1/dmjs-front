"use client";
import { addressApi } from "@/APIS";
import { Address } from "@/interfaces/address";
import { City } from "@/interfaces/city";
import { Department } from "@/interfaces/departmen";
import {
  Box,
  Button,
  Container,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import style from "../../../../../../components/navbar.module.css";
import toast from "react-hot-toast";

interface Props {
  params: { AdressId: string; id: string };
}

const UpdateAddressPage = ({ params }: Props) => {
  const Router = useRouter();
  const [address, setAddress] = useState<Address>();

  const [actualDepartment, setActualDeparment] = useState<Department>();
  const [actualCity, setActualCity] = useState<City>();

  const [deparments, setDeparments] = useState<Department[]>();
  const [cities, setCities] = useState<City[]>();

  const [deparment, setDeparment] = useState<string | undefined>("");
  const [city, setCity] = useState<string>("");
  const [user, setUser] = useState<string>("");
  const [calle, setCalle] = useState<string>("");
  const [avenida, setAvenida] = useState<string>("");
  const [house_number, SetHouse_Number] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      const res = await addressApi.findOneAddress(params.AdressId);
      setAddress(res);
      setActualCity(res.city);
      const response: Department[] = await addressApi.findDepartments();
      console.log(response);
      setDeparments(response);
      const resD = await addressApi.findOneCity(res.city.id);
      setActualDeparment(resD.department);
      setDeparment(resD.department?.name);
      setCity(res.city?.name);
      setUser(params.id);
      setCalle(res.street);
      setAvenida(res.avenue);
      SetHouse_Number(res.house_number);
      console.log(res);
    };

    fetchData();
  }, [params.AdressId, params.id]);

  async function changeDepartment(cities: City[]) {
    console.log(cities);
    setCities(cities);
  }

  async function onCreateAddress() {
    await addressApi.updateAddress(
      params.AdressId,
      calle,
      avenida,
      house_number,
      user,
      city
    );
    toast.success('Dirección actualizada.')
    Router.push(`/account/${params.id}`);
  }

  return (
    <Container maxWidth="md" sx={{ mt: 2 }}>
      <h3 className="font-bold text-3xl">Editar dirección</h3>
      <Grid
        container
        direction="column"
        className="mt-5"
        style={{ minHeight: "90vh" }} // Para centrar verticalmente
      >
        <Grid item>
          <Box
            p={2}
            boxShadow={3}
            borderRadius={8}
            style={{ width: "100%", maxWidth: "900px" }}
            className="mx-auto bg-white shadow-md rounded-lg"
          >
            <form noValidate autoComplete="off">
              <Box mb={2}>
                <Typography variant="body1" gutterBottom>
                  Departamento
                </Typography>

                <Select
                  value={deparment}
                  onChange={(e) => setDeparment(e.target.value)}
                  fullWidth
                >
                  <MenuItem
                    value={actualDepartment?.id}
                    key={actualDepartment?.id}
                  >
                    <em>(actual) {actualDepartment?.name}</em>
                  </MenuItem>
                  {deparments?.map((deparment) => (
                    <MenuItem
                      value={deparment.id}
                      key={deparment.id}
                      onClick={() => changeDepartment(deparment?.cities)}
                    >
                      {deparment.name}
                    </MenuItem>
                  ))}
                </Select>
              </Box>
              <Box mb={2}>
                <Typography variant="body1" gutterBottom>
                  Municipio
                </Typography>
                <Select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  fullWidth
                >
                  <MenuItem value={actualCity?.id} key={actualCity?.id}>
                    <em>(actual) {actualCity?.name}</em>
                  </MenuItem>
                  {cities?.map((deparment) => (
                    <MenuItem value={deparment.id} key={deparment.id}>
                      {deparment.name}
                    </MenuItem>
                  ))}
                </Select>
              </Box>
              <Box mb={2}>
                <Typography variant="body1" gutterBottom>
                  Calle
                </Typography>
                <TextField
                  label="Ingrese calle"
                  value={calle}
                  variant="outlined"
                  fullWidth
                  margin="dense"
                  onChange={(e) => setCalle(e.target.value)}
                />
              </Box>
              <Box mb={2}>
                <Typography variant="body1" gutterBottom>
                  Avenida
                </Typography>
                <TextField
                  label="Ingrese avenida"
                  value={avenida}
                  variant="outlined"
                  fullWidth
                  margin="dense"
                  onChange={(e) => setAvenida(e.target.value)}
                />
              </Box>
              <Box mb={2}>
                <Typography variant="body1" gutterBottom>
                  Numero de casa
                </Typography>
                <TextField
                  label="Ingrese # casa"
                  variant="outlined"
                  value={house_number}
                  fullWidth
                  margin="dense"
                  onChange={(e) => SetHouse_Number(e.target.value)}
                />
              </Box>
              <Box mt={2}>
                <Button
                  className={`${style.primaryBtn} ml-auto text-white px-6 mt-2 mr-2`}
                  sx={{ textTransform: "none" }}
                  onClick={onCreateAddress}
                >
                  Actualizar
                </Button>
                <Button
                  className={`${style.secondaryBtn} ml-auto text-white px-6 mt-2`}
                  sx={{ textTransform: "none" }}
                  onClick={() => Router.back()}
                >
                  Volver
                </Button>
              </Box>
            </form>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default UpdateAddressPage;
