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
      item-value="reservations"
      class="elevation-1">

      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="editReservation(item)">mdi-pencil</v-icon>
      </template>

      </v-data-table>
    </v-container>

  </template>
  
  <script>
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
              key: 'tipoDocumento',
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
              key: 'fechaReserva',
            },
            {
              title: 'Tipo de reserva',
              align: 'end',
              key: 'tipoReserva',
            },
            {
              title: 'Cantidad de personas',
              align: 'end',
              key: 'cantidadPersonas',
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
            }
          ],
          reservations: [
            {
              nombres: 'John',
              apellidos: 'Doe',
              tipoDocumento: 'Cédula de ciudadanía',
              identificacion: '123456789',
              email: 'Johndoe@mail.com',
              fechaReserva: '2021-05-05',
              tipoReserva: 'Reserva de mesa',
              cantidadPersonas: '5',
              estado: 'Pendiente',
            },
            {
              nombres: 'Jane',
              apellidos: 'Doe',
              tipoDocumento: 'Cédula de ciudadanía',
              identificacion: '123456789',
              email: 'Jane@mail.com',
              fechaReserva: '2021-05-05',
              tipoReserva: 'Reserva de mesa',
              cantidadPersonas: '2',
              estado: 'Pendiente',
            },
          ],
      }
    },
    methods: {
    editReservation(item) {
      // Lógica para editar la reserva
      console.log('Editar reserva:', item);
    }
  }
        
  };
  </script>
  
<style>
.container {
    margin-top: 20px;
  }
</style>