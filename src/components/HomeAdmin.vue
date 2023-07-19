<template>
  <slot name="navigationAdmin"></slot>
  <v-container class="container">
    <v-row>
      <v-col cols="12">
        <h2>Lista de reservaciones</h2>
      </v-col>
    </v-row>

    <v-data-table
      v-model:items-per-page="itemsPerPage"
      :headers="headers"
      :items="reservations"
      class="elevation-1"
    >
      <template v-slot:item.actions="{ item }">
        <v-icon size="small" class="me-2" @click="editReservation(item.raw)">
          mdi-pencil
        </v-icon>
      </template>
    </v-data-table>

    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-text-field v-model="editedItem.nombres" label="Nombres"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field v-model="editedItem.apellidos" label="Apellidos"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field v-model="editedItem.tipodocumento" label="Tipo de documento"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field v-model="editedItem.identificacion" label="Identificación"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field v-model="editedItem.email" label="Email"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field v-model="editedItem.fechareserva" label="Fecha de reserva"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-select v-model="editedItem.tiporeserva" :items="tiposReserva" label="Tipo de reserva"></v-select>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field v-model="editedItem.cantidadpersonas" label="Cantidad de personas"></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" variant="text" @click="updateReservation">Actualizar Información</v-btn>
          <v-btn color="blue darken-1" variant="text" @click="confirmReservation">Confirmar Reserva</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      itemsPerPage: 5,
      headers: [
        {
          title: 'Nombres',
          align: 'start',
          key: 'nombres',
        },
        {
          title: 'Apellidos',
          align: 'end',
          key: 'apellidos',
        },
        {
          title: 'Tipo de documento',
          align: 'end',
          key: 'tipodocumento',
        },
        {
          title: 'Identificación',
          align: 'end',
          key: 'identificacion',
        },
        {
          title: 'Email',
          align: 'end',
          key: 'email',
        },
        {
          title: 'Fecha de reserva',
          align: 'end',
          key: 'fechareserva',
        },
        {
          title: 'Tipo de reserva',
          align: 'end',
          key: 'tiporeserva',
        },
        {
          title: 'Cantidad de personas',
          align: 'end',
          key: 'cantidadpersonas',
        },
        {
          title: 'Estado',
          align: 'end',
          key: 'estado',
        },
        {
          title: 'Acciones',
          align: 'end',
          key: 'actions',
        },
      ],
      reservations: [],
      dialog: false,
      editedIndex: -1,
      editedItem: {
        id: null,
        nombres: '',
        apellidos: '',
        tipodocumento: '',
        identificacion: '',
        email: '',
        fechareserva: '',
        tiporeserva: '',
        cantidadpersonas: '',
        estado: '',
      },
      tiposReserva: ['Cena', 'Almuerzo', 'Onces', 'Cumpleaños', 'Ocasión Especial'],
    };
  },
  methods: {
    editReservation(item) {
      this.editedIndex = this.reservations.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    updateReservation() {
      if (this.editedIndex > -1) {
        const updatedReservation = {
          id: this.reservations[this.editedIndex].id,
          nombres: this.editedItem.nombres,
          apellidos: this.editedItem.apellidos,
          tipodocumento: this.editedItem.tipodocumento,
          identificacion: this.editedItem.identificacion,
          email: this.editedItem.email,
          fechareserva: this.editedItem.fechareserva,
          tiporeserva: this.editedItem.tiporeserva,
          cantidadpersonas: this.editedItem.cantidadpersonas,
          descripcion: this.editedItem.descripcion,
          estado: this.editedItem.estado,
        };

        axios.put(`http://localhost:3000/api/reservaciones/${updatedReservation.id}`, updatedReservation)
          .then(response => {
            console.log('Reserva actualizada:', response.data.reservacion);
            alert('Reserva actualizada');
          })
          .catch(error => {
            console.error('Error al actualizar la reserva:', error);
          });
      }
    },

    confirmReservation() {
      if (this.editedIndex > -1) {
        this.editedItem.estado = 'Aceptada';

        const updatedReservation = {
          id: this.reservations[this.editedIndex].id,
          nombres: this.editedItem.nombres,
          apellidos: this.editedItem.apellidos,
          tipodocumento: this.editedItem.tipodocumento,
          identificacion: this.editedItem.identificacion,
          email: this.editedItem.email,
          fechareserva: this.editedItem.fechareserva,
          tiporeserva: this.editedItem.tiporeserva,
          cantidadpersonas: this.editedItem.cantidadpersonas,
          descripcion: this.editedItem.descripcion,
          estado: 'Aceptada',
        };

        axios.put(`http://localhost:3000/api/reservaciones/${updatedReservation.id}`, updatedReservation)
          .then(response => {
            console.log('Reserva actualizada:', response.data.reservacion);
            alert('Reserva confirmada');
            window.location.reload();
          })
          .catch(error => {
            console.error('Error al actualizar la reserva:', error);
          });
      }
      this.close();
    },
    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedIndex = -1;
        this.editedItem = {
          id: null,
          nombres: '',
          apellidos: '',
          tipodocumento: '',
          identificacion: '',
          email: '',
          fechareserva: '',
          tiporeserva: '',
          cantidadpersonas: '',
          estado: '',
        };
      });
    },


    // Método para obtener las reservaciones desde el backend
    getReservaciones() {
      axios.get('http://localhost:3000/api/reservaciones')
        .then(response => {
          this.reservations = response.data.reservaciones;
        })
        .catch(error => {
          console.error('Error al obtener las reservaciones:', error);
        });
    },
  },
  created() {
    this.getReservaciones();
  },
};
</script>

<style>
.container {
  margin-top: 20px;
}
</style>