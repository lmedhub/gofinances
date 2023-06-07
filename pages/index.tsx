import { useEffect } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  Grid,
  TextField,
} from "@mui/material";
import CardComponent from "@/components/card";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

import { DataGrid, ptBR } from "@mui/x-data-grid";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { GridValueGetterParams } from "@mui/x-data-grid";

interface Row {
  id: number;
  title: string;
  price: string;
  category: string;
  data: string;
}

interface FormProps {
  setRows: React.Dispatch<React.SetStateAction<Row[]>>;
  open: boolean;
  handleClose: () => void;
  rows: Row[];
}

const columns = [
  {
    field: "title",
    headerName: "Título",
    flex: 1,
  },
  {
    field: "price",
    headerName: "Preço",
    flex: 1,
    valueGetter: (params: GridValueGetterParams) => `R$ ${params.value}`,
  },
  {
    field: "category",
    headerName: "Categoria",
    flex: 1,
  },
  {
    field: "data",
    headerName: "Data",
    flex: 1,
  },
];

const schema = yup.object().shape({
  title: yup.string().required("Título é obrigatório"),
  price: yup
    .number()
    .required(() => "Preço é obrigatório")
    .typeError(() => "Insira um número válido"),
  category: yup.string().required("Categoria é obrigatória"),
  data: yup.string().required("Data é obrigatória"),
});

function Form({ setRows, open, handleClose, rows }: FormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Row>({
    resolver: yupResolver(schema),
  });

  function onSubmit(data: Row) {
    const newRow = { ...data, id: Date.now() };
    setRows((prevRows) => [...prevRows, newRow]);
    localStorage.setItem("rows", JSON.stringify([...rows, newRow]));
    reset();
    handleClose();
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Insira dados na tabela</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            p: "1rem",
          }}
        >
          <TextField
            label="Título"
            {...register("title")}
            error={!!errors.title}
            helperText={errors.title?.message}
          />
          <TextField
            label="Preço"
            {...register("price")}
            error={!!errors.price}
            helperText={errors.price?.message}
          />
          <TextField
            label="Categoria"
            {...register("category")}
            error={!!errors.category}
            helperText={errors.category?.message}
          />
          <TextField
            label="Data"
            {...register("data")}
            error={!!errors.data}
            helperText={errors.data?.message}
          />
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </Box>
      </form>
    </Dialog>
  );
}

export default function Home() {
  const [rows, setRows] = useState<Row[]>([]);
  const [open, setOpen] = useState(false);

  function handleOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  useEffect(() => {
    const storedRows = localStorage.getItem("rows");
    if (storedRows) {
      setRows(JSON.parse(storedRows));
    }
  }, []);

  return (
    <Box sx={{ marginTop: { lg: "-150px" }, paddingX: { lg: "50px" } }}>
      <Grid container columnSpacing={10} rowSpacing={2}>
        <Grid item xs={12} lg={4}>
          <CardComponent
            title="Entradas"
            icon={<ArrowCircleUpIcon />}
            text="R$ 2.000,00"
            iconColor="green"
          />
        </Grid>
        <Grid item xs={12} lg={4}>
          <CardComponent
            title="Saídas"
            icon={<ArrowCircleDownIcon />}
            text="R$ 60,00"
            iconColor="red"
          />
        </Grid>
        <Grid item xs={12} lg={4}>
          <CardComponent
            title="Total"
            icon={<AttachMoneyIcon />}
            text="R$ 1.940,00"
            backgroundColor="darkorange"
            textColor="white"
          />
        </Grid>
      </Grid>
      <Box sx={{ textAlign: "center", py: 2 }}>
        <Button color="secondary" onClick={handleOpen} variant="contained">
          Novo item
        </Button>
      </Box>
      <Form
        setRows={setRows}
        open={open}
        handleClose={handleClose}
        rows={rows}
      />
      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          disableRowSelectionOnClick
          localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
        />
      </Box>
    </Box>
  );
}
