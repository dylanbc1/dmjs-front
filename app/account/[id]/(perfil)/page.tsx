"use client";

import {
  Container,
  Typography,
  TextField,
  Card,
  CardContent,
  Grid,
  IconButton,
} from "@mui/material";
import { Button } from "@/components/ui/button";
import style from "../../../../components/navbar.module.css";
import { useEffect, useState } from "react";
import { User } from "@/interfaces/user";
import { Address } from "@/interfaces/address";
import { addressApi, userApi } from "@/APIS";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Trash, Edit, Plus, MoreVertical } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";
interface Props {
  params: { id: string };
}

const ProfilePage = ({ params }: Props) => {
  const [user, setUser] = useState<User>();
  const [addresses, setAddresses] = useState<Address[]>();

  const [updateName, setUpdateName] = useState<string>("");
  const [updateEmail, setUpdateEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [photo_url, setPhotoUrl] = useState<string>("");
  const [user_role, setUserRole] = useState<string>("");
  const Router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const res = await userApi.findOneUser(params.id);

      setUser(res);
      setAddresses(res.addresses);
      setUpdateName(res.name);
      setUpdateEmail(res.email);
      setPassword(res.password);
      setPhotoUrl(res.photo_url);
      setUserRole(res.role);
    };

    fetchData();
    //console.log(params.id)
  }, [params.id]);

  const onAddAddress = () => {
    Router.push(`/account/${params.id}/add_address`);
  };

  const onUpdateAddress = (id: string) => {
    Router.push(`/account/${params.id}/update_address/${id}`);
  };

  const onUpdateUser = async () => {
    await userApi.updateOneUser(
      params.id,
      updateName,
      updateEmail,
      photo_url,
      user_role
    );
    toast.success('Usuario actualizado.')
    window.location.reload();
  };

  return (
    <Container maxWidth="md" sx={{ mt: 2 }}>
      <h3 className="font-bold text-3xl">Perfil</h3>

      <h5 className="mt-3 font-semibold text-xl">Información personal</h5>

      <TextField
        disabled
        fullWidth
        value={updateName}
        className="border focus:border-[#0ff]"
        margin="normal"
        variant="outlined"
        onChange={(e) => setUpdateName(e.target.value)}
        sx={{
          "& .MuiOutlinedInput-root": {
            "&.Mui-focused fieldset": {
              borderColor: "#1c1c3c",
            },
          },
        }}
      />

      <TextField
      disabled
        fullWidth
        value={updateEmail}
        margin="normal"
        variant="outlined"
        onChange={(e) => setUpdateEmail(e.target.value)}
        sx={{
          "& .MuiOutlinedInput-root": {
            "&.Mui-focused fieldset": {
              borderColor: "#1c1c3c",
            },
          },
        }}
      />
      <div className="mt-10 flex items-center justify-between mb-3 w-full">
        <h5 className="font-semibold text-xl">Direcciones</h5>
        <Button
          className={`${style.primaryBtn} ml-auto`}
          onClick={onAddAddress}
        >
          Añadir
        </Button>
      </div>
      <Grid container spacing={2} mt={2}>
        {addresses?.map((address) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            key={address.id}
            className="border-t-[#1] scale-95 hover:scale-100 transition-transform duration-300 ease-in-out"
          >
            <Card className="relative pr-4 h-full border rounded-md shadow-lg">
              <CardContent>
                <Typography variant="h6" className="font-semibold">
                  {`${address.street} # ${address.avenue}-${address.house_number}`}
                </Typography>
                <Typography variant="body2" className="text-gray-600">
                  {address.city?.name}
                </Typography>
                <Typography variant="body2" className="text-gray-600">
                  {user?.name}
                </Typography>
                <DropdownMenu>
                  <DropdownMenuTrigger className="absolute top-0 right-0 mt-2 mr-2 focus:outline-none">
                    <MoreVertical className="size-4 text-gray-500 hover:text-gray-800 transition-colors duration-200" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-white shadow-md rounded-md border">
                    <DropdownMenuItem
                      onClick={() => onUpdateAddress(address.id)}
                      className="flex items-center px-4 py-2 hover:bg-gray-100 transition-colors duration-200"
                    >
                      <Edit className="size-4 mr-2 text-gray-500" />
                      Editar
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ProfilePage;
