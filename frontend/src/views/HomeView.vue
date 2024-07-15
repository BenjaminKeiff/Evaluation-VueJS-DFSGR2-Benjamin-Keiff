<template>
  <div class="home">
    <div class="col mb-3">
      <h1 class="h3"><i class="fa-solid fa-angle-down me-2" />Accueil</h1>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-30">
          <div v-if="!loading && bills" class="p-3 border">
            <h2>{{ bills.length }} Factures en 2024</h2>
          </div>
        </div>
        <div class="col-70 bg-light">
          <div class="p-3  bg-light">
            <div class="btn-group d-flex">
              <button
                @click="$router.push({ name: 'create-bill' })"
                class="btn btn-outline-primary"
              >
                <i class="fa-solid fa-plus-circle me-2" />
                Ajouter une facture
              </button>
              <button
                @click="$router.push({ name: 'create-client' })"
                class="btn btn-outline-primary"
              >
                <i class="fa-solid fa-plus-circle me-2" />
                Ajouter un client
              </button>
            </div>
          </div>
          <div v-if="!loading && bills" class="mt-3">
            <h3 class="mb-2">Factures en cours</h3>
            <TableList v-if="bills">
              <BillTableRow
                v-for="bill in limitedBills"
                :key="bill.id"
                :bill="bill"
                @edit="$router.push({ name: 'edit-bill', params: { id: $event.id } })"
              />
            </TableList>
          </div>
          <div class="mt-3">
            <h3>Clients</h3>
            <ClientList v-if="!loading && clients">
              <ClientTableRow
                v-for="client in limitedClients"
                :key="client.id"
                :client="client"
                @edit="$router.push({ name: 'edit-client', params: { id: $event.id } })"
              />
            </ClientList>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TableList from '@/components/tables/BillTableList.vue'
import BillTableRow from '@/components/tables/BillTableRow.vue'
import ClientList from '@/components/tables/ClientTableList.vue'
import ClientTableRow from '@/components/tables/ClientTableRow.vue'
import { useBillStore } from '@/stores/bill'
import { useClientStore } from '@/stores/client'
import { mapActions, mapState } from 'pinia'

export default {
  components: {
    TableList,
    BillTableRow,
    ClientList,
    ClientTableRow
  },
  computed: {
    ...mapState(useBillStore, {
      bills: 'items',
      loadingBills: 'loading'
    }),
    ...mapState(useClientStore, {
      clients: 'items',
      loadingClients: 'loading'
    }),
    limitedBills() {
      return this.bills.slice(0, 3)
    },
    limitedClients() {
      return this.clients.slice(0, 3)
    }
  },
  async mounted() {
    await this.getBills()
    await this.getClients()
  },
  methods: {
    ...mapActions(useBillStore, {
      deleteBill: 'deleteItem',
      getBills: 'getItems'
    }),
    ...mapActions(useClientStore, {
      deleteClient: 'deleteItem',
      getClients: 'getItems'
    })
  }
}
</script>

<style>
.col-30 {
  flex: 0 0 30%;
  max-width: 30%;
}
.col-70 {
  flex: 0 0 70%;
  max-width: 70%;
}
</style>
