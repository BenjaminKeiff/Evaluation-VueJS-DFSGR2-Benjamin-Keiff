<template>
  <div class="clients">
    <div class="row border-bottom pb-3 mb-3">
      <div class="col">
        <h1 class="h3"><i class="fa-solid fa-angle-down me-2" />Liste de nos chers clients</h1>
      </div>
      <div class="col text-end">
        <button @click="$router.push({ name: 'create-client' })" class="btn btn-outline-primary">
          <i class="fa-solid fa-plus-circle me-2" />
          Ajouter un client
        </button>
      </div>
    </div>
    <ClientList v-if="!loading && clients">
      <ClientTableRow
        v-for="client in clients"
        :key="client.id"
        :client="client"
        @edit="$router.push({ name: 'edit-client', params: { id: $event.id } })"
        @delete="deleteClient($event.id)"
      />
    </ClientList>

    <div v-else>
      <div class="loader"></div>
    </div>

    <AppDebug :datas="clients" />
  </div>
</template>

<script>
import ClientList from '@/components/tables/ClientTableList.vue'
import ClientTableRow from '@/components/tables/ClientTableRow.vue';
import { useClientStore } from '@/stores/client'
import { mapActions, mapState } from 'pinia'
export default {
  components: {
    ClientList,
    ClientTableRow
  },
  computed: {
    ...mapState(useClientStore, {
      clients: 'items',
      loading: 'loading'
    })
  },
  async mounted() {
    await this.getClients()
  },
  methods: {
    ...mapActions(useClientStore, {
      deleteClient: 'deleteItem',
      getClients: 'getItems'
    })
  }
}
</script>
