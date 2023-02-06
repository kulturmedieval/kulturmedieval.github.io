import "react-big-calendar/lib/css/react-big-calendar.css";
import { Box, Button, Dialog, DialogTitle, TextField, Stack } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { Calendar, momentLocalizer } from "react-big-calendar";
import { useState } from "react";
import moment from "moment";

export default function Eventos() {
  const [events, SetEvents] = useState([]);
  const [title, setTitle] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [desc, setDesc] = useState("");
  const [openSlot, setOpenSlot] = useState(false);
  const [openEvent, setOpenEvent] = useState(false);
  const [clickedEvent, setClickedEvent] = useState({});

  const localizer = momentLocalizer(moment);

  function handleClose() {
    setOpenEvent(false);
    setOpenSlot(false);
  }

  function handleSlotSelected(slotInfo) {
    setTitle("");
    setDesc("");
    setStart(slotInfo.start);
    setEnd(slotInfo.end);
    setOpenSlot(true);
  }

  function handleEventSelected(event) {
    setOpenEvent(true);
    setClickedEvent(event);
    setStart(event.start);
    setEnd(event.end);
    setTitle(event.title);
    setDesc(event.desc);
  }

  function handleStartTime(date) {
    setStart(date);
  }

  function handleEndTime(date) {
    setEnd(date);
  }

  function nuevoEvento() {
    let nuevoEvento = { title: title, start: start, end: end, desc: desc };
    let newEvents = events.slice();
    newEvents.push(nuevoEvento);
    SetEvents(newEvents);
    handleClose()
  }

  function updateEvent() {
    const index = events.findIndex((event) => event === clickedEvent);
    const updatedEvent = events.slice();
    updatedEvent[index].title = title;
    updatedEvent[index].desc = desc;
    updatedEvent[index].start = start;
    updatedEvent[index].end = end;

    SetEvents(updatedEvent);
    handleClose();
  }

  function deleteEvent() {
    let updatedEvents = events.filter((event) => event["start"] !== start);

    SetEvents(updatedEvents);
    handleClose()
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignContent: "center",
        justifyContent: "center",
      }}
    >
      <Box sx={{ backgroundColor: "white" }}>
        <Calendar
          selectable
          defaultDate={new Date()}
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          onSelectSlot={(slotInfo) => handleSlotSelected(slotInfo)}
          onSelectEvent={(event) => handleEventSelected(event)}
          style={{ height: "87vh", width: "94vw" }}
        />
      </Box>
      <Dialog
        // modal={false}
        open={openEvent}
        onClose={handleClose}
      >
        <DialogTitle>
          Edita el Evento del día {moment(start).format("DD MMMM YYYY")}
        </DialogTitle>
        <Stack spacing={2} ml={2} mr={2}>
        <TextField 
        label="Titulo"
        defaultValue={title} 
        onChange={(e) => setTitle(e.target.value)} />
        <TextField
          label="Descripción"
          defaultValue={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <DateTimePicker
            label="Hora Inicio"
            minutesStep={5}
            value={start}
            onChange={handleStartTime}
            renderInput={(params) => <TextField {...params} />}
          />
          <DateTimePicker
            label="Hora Término"
            minutesStep={5}
            value={end}
            onChange={handleEndTime}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
        </Stack>
        <Button onClick={handleClose}>Cancelar</Button>
        <Button onClick={deleteEvent}>Eliminar</Button>
        <Button onClick={updateEvent}>Editar</Button>
      </Dialog>

      <Dialog
        // modal={false}
        open={openSlot}
        onClose={handleClose}
      >
        <DialogTitle>
          Crea un evento para el día {moment(start).format("DD MMMM YYYY")}{" "}
        </DialogTitle>
        <Stack spacing={2} ml={2} mr={2}>
        <TextField
         label="Titulo" 
         onChange={(e) => setTitle(e.target.value)} />
        <TextField
          label="Descripción"
          onChange={(e) => setDesc(e.target.value)}
        />
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <DateTimePicker
            label="Hora Inicio"
            minutesStep={5}
            value={start}
            onChange={handleStartTime}
            renderInput={(params) => <TextField {...params} />}
          />
          <DateTimePicker
            label="Hora Término"
            minutesStep={5}
            value={end}
            onChange={handleEndTime}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
        </Stack>
        <Button onClick={handleClose}>Cancelar</Button>
        <Button onClick={nuevoEvento}>Crear</Button>
      </Dialog>
    </Box>
  );
}
