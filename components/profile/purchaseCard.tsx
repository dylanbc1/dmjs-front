import React from 'react';
import { Card, CardContent, Grid, Typography, Avatar } from '@mui/material';
import { ShoppingCart } from 'lucide-react';
interface Info {
    title:string,
    quantity: number,
    price: number,
    address: string,
    status:string
}

const translateStatus = (status: string) => {
  if (status == 'RECEIVED') {
    return 'Recibido';
  }

  if (status == 'PENDING') {
    return 'Pendiente';
  }

  if (status == 'CANCELLED') {
    return 'Cancelado';
  }

  if (status == 'SENDED') {
    return 'Enviado';
  }
}

const PurchaseCard = ({ title, quantity, price, address, status }: Info) => {
  return (
    <Card className='w-full lg:w-72 relative h-full border rounded-md shadow-lg scale-95 hover:scale-100 transition-transform duration-300 ease-in-out'>
      <CardContent>
        <Grid container spacing={2} alignItems={"center"}>
          <Grid item>
            <Avatar style={{ backgroundColor: '#1c1c3c' }}>
              <ShoppingCart/>
            </Avatar>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={1}>
              <Grid item xs alignItems={"center"} justifyContent={"space-beetwen"}>
                <Typography variant="h6" className='font-semibold'>{title}</Typography>
                <Typography variant="body2" color="textSecondary">
                  Cantidad: {quantity}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Precio: $ {price.toLocaleString()}
                </Typography>
                <Typography variant="body2" color="textSecondary">Dirección: {address}</Typography>
              </Grid>
            </Grid>
            <Grid item>
              {translateStatus(status) == 'Recibido' ? 
                <Typography variant="body2" style={{ color: '#0ea800', fontWeight: 'bold' }}>
                {translateStatus(status)}
                </Typography> :
                <></>
              } 

              {translateStatus(status) == 'Cancelado' ? 
                <Typography variant="body2" style={{ color: '#a10000', fontWeight: 'bold' }}>
                {translateStatus(status)}
                </Typography> :
                <></>
              }      

              {translateStatus(status) == 'Pendiente' || translateStatus(status) == 'Enviado' ? 
                <Typography variant="body2" style={{ color: '#ee8700', fontWeight: 'bold' }}>
                {translateStatus(status)}
                </Typography> :
                <></>
              }     
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default PurchaseCard;
