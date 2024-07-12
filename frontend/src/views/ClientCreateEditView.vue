<template>
  <div>
    <div class="bill" v-if="!loading && client">
      <div class="row border-bottom pb-3 mb-3">
        <div class="col">
          <h1 v-if="isNewClient" class="h3">
            <i class="fa-solid fa-angle-down me-2" />Créer un client
          </h1>
          <h1 v-else class="h3"><i class="fa-solid fa-angle-down me-2" />Editer un client</h1>
        </div>
        <div v-if="!isNewClient" class="col text-end">
          <button @click="onDeleteClient(client)" class="btn btn-outline-danger">
            <i class="fa-solid fa-trash me-2" />
            Supprimer le client
          </button>
        </div>
      </div>

      <div class="alert alert-danger my-3" v-if="error">Un champ requière votre attention</div>

      <div class="row">
        <h2 class="p-2">Contact</h2>
        <div class="row">
          <div class="col-md-6">
            <div class="form-floating mb-3">
              <input
                type="text"
                name="firstName"
                id="firstName"
                v-model="client.firstName"
                class="form-control"
                placeholder="Stephen"
                :class="{ 'is-invalid': !client.firstName }"
              />
              <label for="firstName" class="form-label">Prénom :</label>
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-floating mb-3">
              <input
                type="text"
                name="lastName"
                id="lastName"
                class="form-control"
                placeholder="Strange"
                v-model="client.lastName"
                :class="{ 'is-invalid': !client.lastName }"
              />
              <label for="lastName" class="form-label">Nom :</label>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6">
            <div class="form-floating mb-3">
              <input
                type="text"
                name="job"
                id="job"
                class="form-control"
                placeholder="Sorcerer Supreme"
                v-model="client.job"
              />
              <label for="job" class="form-label">Poste :</label>
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-floating mb-3">
              <input
                type="text"
                name="phone"
                id="phone"
                class="form-control"
                placeholder="555-987-6550"
                v-model="client.phone"
              />
              <label for="phone" class="form-label">Téléphone :</label>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12">
            <div class="form-floating mb-3">
              <input
                type="email"
                name="mail"
                id="mail"
                class="form-control"
                placeholder="stephen.strange@sanctumsanctorum.com"
                v-model="client.mail"
              />
              <label for="mail" class="form-label">E-mail :</label>
            </div>
          </div>
          <div class="col-md-12">
            <div class="form-floating mb-3">
              <input
                type="text"
                name="companyName"
                id="companyName"
                class="form-control"
                placeholder="Sanctum Sanctorum"
                v-model="client.companyName"
              />
              <label for="companyName" class="form-label">Nom de l'entreprise :</label>
            </div>
          </div>
        </div>
        <h2 class="p-2">Coordonnées</h2>
        <div class="row">
          <div class="col-md-12">
            <div class="form-floating mb-3">
              <input
                type="text"
                name="address1"
                id="address1"
                class="form-control"
                placeholder="177A Bleecker Street"
                v-model="client.address1"
              />
              <label for="address1" class="form-label">Adresse 1 :</label>
            </div>
          </div>
          <div class="col-md-12">
            <div class="form-floating mb-3">
              <input
                type="text"
                name="address2"
                id="address2"
                class="form-control"
                placeholder=""
                v-model="client.address2"
              />
              <label for="address2" class="form-label">Adresse 2 :</label>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6">
            <div class="form-floating mb-3">
              <input
                type="text"
                name="zipcode"
                id="zipcode"
                class="form-control"
                placeholder="10012"
                v-model="client.zipcode"
              />
              <label for="zipcode" class="form-label">Code postal :</label>
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-floating mb-3">
              <input
                type="text"
                name="city"
                id="city"
                class="form-control"
                placeholder="New York"
                v-model="client.city"
              />
              <label for="city" class="form-label">Ville :</label>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6">
            <div class="form-floating mb-3">
              <input
                type="text"
                name="country"
                id="country"
                class="form-control"
                placeholder="USA"
                v-model="client.country"
              />
              <label for="country" class="form-label">Pays :</label>
            </div>
          </div>
        </div>
      </div>

      <p class="text-end">
        <button
          @click="onSave()"
          :disabled="formInvalid"
          class="btn btn-outline-primary btn-lg px-5"
        >
          <i class="fa-solid fa-save me-2" />Enregistrer
        </button>
      </p>

      <AppDebug :datas="client" />
    </div>
    <div v-else>loading...</div>
  </div>
</template>

<script>
import { clients } from '@/seeds/clients.js'
import { useClientStore } from '@/stores/client'
import { mapActions, mapState, mapWritableState } from 'pinia'
export default {
  components: {},
  props: {
    id: {
      type: String,
      default: 'new'
    }
  },
  data() {
    return {
      clients,
      error: false
    }
  },
  mounted() {
    this.setClient(this.id)
  },
  computed: {
    ...mapState(useClientStore, {
      loading: 'loading'
    }),
    ...mapWritableState(useClientStore, {
      client: 'item'
    }),
    isNewClient() {
      return this.id === 'new'
    },

    formInvalid() {
      return !this.client || !this.client.firstName || !this.client.lastName
    }
  },
  methods: {
    ...mapActions(useClientStore, {
      setClient: 'setItem',
      updateClient: 'updateItem',
      createClient: 'createItem',
      deleteClient: 'deleteItem'
    }),

    onDeleteClient() {
      this.deleteClient(this.id)
      this.$router.push({ name: 'clients' })
    },
    onSave() {
      if (this.formInvalid) {
        this.error = true
      } else {
        this.error = false
        if (this.isNewClient) {
          this.client.createdAt = (() => {
            const date = new Date(Date.now())
            const year = date.getFullYear()
            const month = String(date.getMonth() + 1).padStart(2, '0')
            const day = String(date.getDate()).padStart(2, '0')
            return `${year}-${month}-${day}`
          })()
          console.log('create', this.client)
          this.createClient(this.client)
        } else {
          console.log('update', this.client)
          this.updateClient(this.client)
        }
        this.$router.push({ name: 'clients' })
      }
    }
  },
  watch: {}
}
</script>
